-- ============================================
-- Email Triggers Setup
-- ============================================
-- This migration sets up database triggers for automatic email sending

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile record
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = NOW();
  
  -- Notify application to send welcome email
  PERFORM pg_notify('user_signup', json_build_object(
    'user_id', NEW.id,
    'email', NEW.email,
    'full_name', COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'event', 'user_signup'
  )::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_signup();

-- Function to handle order creation
CREATE OR REPLACE FUNCTION handle_new_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify application to send order confirmation email
  PERFORM pg_notify('order_created', json_build_object(
    'order_id', NEW.id,
    'user_id', NEW.user_id,
    'order_number', NEW.order_number,
    'total', NEW.total,
    'event', 'order_created'
  )::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new orders
DROP TRIGGER IF EXISTS on_order_created ON orders;
CREATE TRIGGER on_order_created
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION handle_new_order();

-- Function to handle vendor status changes
CREATE OR REPLACE FUNCTION handle_vendor_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM pg_notify('vendor_status_changed', json_build_object(
      'vendor_id', NEW.id,
      'user_id', NEW.user_id,
      'old_status', OLD.status,
      'new_status', NEW.status,
      'store_name', NEW.store_name,
      'event', 'vendor_status_changed'
    )::text);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for vendor status changes
DROP TRIGGER IF EXISTS on_vendor_status_changed ON vendors;
CREATE TRIGGER on_vendor_status_changed
  AFTER UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION handle_vendor_status_change();

-- Function to handle product status changes
CREATE OR REPLACE FUNCTION handle_product_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM pg_notify('product_status_changed', json_build_object(
      'product_id', NEW.id,
      'vendor_id', NEW.vendor_id,
      'old_status', OLD.status,
      'new_status', NEW.status,
      'product_name', NEW.name,
      'event', 'product_status_changed'
    )::text);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for product status changes
DROP TRIGGER IF EXISTS on_product_status_changed ON products;
CREATE TRIGGER on_product_status_changed
  AFTER UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION handle_product_status_change();

-- Verification - Email triggers setup complete
-- The following triggers have been created:
-- - User signup → Welcome email notification
-- - Order created → Confirmation email notification  
-- - Vendor status → Approval/rejection email notification
-- - Product status → Moderation email notification
--
-- Your app will receive notifications via pg_notify when these events occur.

SELECT 'Email triggers setup completed successfully!' as status;