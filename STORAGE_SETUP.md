# Supabase Storage Setup Guide

## Create Storage Buckets

You need to create 4 storage buckets in your Supabase project for image uploads.

### Step 1: Go to Storage

1. Open your Supabase Dashboard
2. Click on **Storage** in the left sidebar
3. Click **New Bucket**

### Step 2: Create Buckets

Create these 4 buckets with the following settings:

#### 1. Products Bucket
- **Name:** `products`
- **Public:** ✅ Yes (checked)
- **File size limit:** 5MB
- **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`

#### 2. Vendors Bucket
- **Name:** `vendors`
- **Public:** ✅ Yes (checked)
- **File size limit:** 5MB
- **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`

#### 3. Categories Bucket
- **Name:** `categories`
- **Public:** ✅ Yes (checked)
- **File size limit:** 5MB
- **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`

#### 4. Avatars Bucket
- **Name:** `avatars`
- **Public:** ✅ Yes (checked)
- **File size limit:** 2MB
- **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`

### Step 3: Set Storage Policies

For each bucket, you need to set up Row Level Security (RLS) policies.

Go to **Storage** > Click on a bucket > **Policies** tab

#### Products Bucket Policies

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Allow public to view
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');

-- Allow vendors to delete their own images
CREATE POLICY "Vendors can delete their product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products' AND auth.uid() IN (
  SELECT user_id FROM vendors WHERE id IN (
    SELECT vendor_id FROM products WHERE images @> jsonb_build_array(name)
  )
));
```

#### Vendors Bucket Policies

```sql
-- Allow vendors to upload their logos/banners
CREATE POLICY "Vendors can upload their images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'vendors' AND
  auth.uid() IN (SELECT user_id FROM vendors)
);

-- Allow public to view
CREATE POLICY "Public can view vendor images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'vendors');

-- Allow vendors to update their images
CREATE POLICY "Vendors can update their images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'vendors' AND
  auth.uid() IN (SELECT user_id FROM vendors)
);

-- Allow vendors to delete their images
CREATE POLICY "Vendors can delete their images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'vendors' AND
  auth.uid() IN (SELECT user_id FROM vendors)
);
```

#### Categories Bucket Policies

```sql
-- Only admins can upload category images
CREATE POLICY "Admins can upload category images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'categories' AND
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Allow public to view
CREATE POLICY "Public can view category images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'categories');

-- Only admins can delete
CREATE POLICY "Admins can delete category images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'categories' AND
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
```

#### Avatars Bucket Policies

```sql
-- Users can upload their own avatars
CREATE POLICY "Users can upload their avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public to view
CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Users can update their own avatars
CREATE POLICY "Users can update their avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own avatars
CREATE POLICY "Users can delete their avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Step 4: Verify Setup

Run this query in SQL Editor to verify buckets are created:

```sql
SELECT id, name, public 
FROM storage.buckets 
ORDER BY name;
```

You should see all 4 buckets listed.

### Step 5: Test Upload

1. Go to your app
2. Login as a vendor
3. Try uploading a product image
4. Check Supabase Storage to see if the image appears

## Usage in Code

The image upload component is already integrated. Use it like this:

```tsx
import { ImageUpload } from '@/components/ui';
import { STORAGE_BUCKETS } from '@/lib/storage';

// Single image upload
<ImageUpload
  bucket={STORAGE_BUCKETS.PRODUCTS}
  path="my-vendor-id"
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
/>

// Multiple images upload
<ImageUpload
  bucket={STORAGE_BUCKETS.PRODUCTS}
  path="my-vendor-id"
  multiple
  maxFiles={5}
  value={imageUrls}
  onChange={(urls) => setImageUrls(urls)}
/>
```

## Troubleshooting

### Images not uploading
- Check if buckets are created
- Verify RLS policies are set
- Check browser console for errors
- Verify Supabase credentials in `.env.local`

### Images not displaying
- Make sure buckets are set to **Public**
- Check if the image URL is correct
- Verify CORS settings in Supabase

### Permission denied errors
- Review RLS policies
- Make sure user is authenticated
- Check if user has the correct role

## Next Steps

After setting up storage:
1. ✅ Buckets created
2. ✅ Policies configured
3. ✅ Test uploads working
4. 🔄 Integrate into vendor product creation
5. 🔄 Integrate into vendor profile settings
6. 🔄 Add image optimization
7. 🔄 Add image cropping tool (optional)

---

**Setup Complete!** Your image upload system is ready to use.
