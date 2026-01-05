-- ============================================
-- FIX SCRIPT: Run this to fix partial migrations
-- ============================================
-- This script safely handles existing objects and fixes missing pieces

-- ============================================
-- 1. ENSURE EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. ENSURE ENUMS EXIST (safe - won't error if exists)
-- ============================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vendor_status AS ENUM ('pending', 'approved', 'suspended', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('draft', 'active', 'inactive', 'out_of_stock');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('sale', 'refund', 'withdrawal', 'adjustment');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 3. ENSURE PROFILES TABLE EXISTS WITH CORRECT STRUCTURE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    two_factor_enabled BOOLEAN DEFAULT false,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 4. ENSURE HANDLE_NEW_USER FUNCTION EXISTS
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.email, NEW.id::text || '@placeholder.local'),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
        NEW.raw_user_meta_data->>'avatar_url',
        'customer'::user_role
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url);
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't block user creation
        RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permission to the function
ALTER FUNCTION handle_new_user() OWNER TO postgres;

-- ============================================
-- 5. ENSURE TRIGGER EXISTS ON AUTH.USERS
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 5b. ALLOW SERVICE ROLE TO INSERT INTO PROFILES
-- ============================================
GRANT INSERT ON profiles TO service_role;
GRANT INSERT ON profiles TO authenticated;
GRANT ALL ON profiles TO postgres;

-- ============================================
-- 6. ENSURE RLS IS ENABLED ON PROFILES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. RECREATE PROFILE POLICIES (drop first to avoid conflicts)
-- ============================================
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

CREATE POLICY "Users can read own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable"
    ON profiles FOR SELECT
    USING (true);

-- ============================================
-- 8. GRANT PERMISSIONS
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON profiles TO anon;
GRANT SELECT, UPDATE ON profiles TO authenticated;

-- ============================================
-- 9. VERIFY: Check if trigger works
-- ============================================
-- You can test by creating a user in Supabase Auth dashboard
-- A profile should be automatically created

SELECT 'Migration fix complete!' as status;
