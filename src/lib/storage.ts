/**
 * Storage utilities for handling file uploads to Supabase Storage
 */

import { createClient } from '@/lib/supabase/client';

export const STORAGE_BUCKETS = {
  PRODUCTS: 'products',
  VENDORS: 'vendors',
  CATEGORIES: 'categories',
  AVATARS: 'avatars',
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

// Image validation constants
export const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_DIMENSIONS: {
    width: 2000,
    height: 2000,
  },
  MIN_DIMENSIONS: {
    width: 300,
    height: 300,
  },
};

/**
 * Validate image file before upload
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!IMAGE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${IMAGE_CONSTRAINTS.ALLOWED_TYPES.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > IMAGE_CONSTRAINTS.MAX_SIZE) {
    return {
      valid: false,
      error: `File size too large. Maximum size: ${IMAGE_CONSTRAINTS.MAX_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Validate image dimensions
 */
export async function validateImageDimensions(file: File): Promise<{ valid: boolean; error?: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      if (img.width > IMAGE_CONSTRAINTS.MAX_DIMENSIONS.width || 
          img.height > IMAGE_CONSTRAINTS.MAX_DIMENSIONS.height) {
        resolve({
          valid: false,
          error: `Image dimensions too large. Maximum: ${IMAGE_CONSTRAINTS.MAX_DIMENSIONS.width}x${IMAGE_CONSTRAINTS.MAX_DIMENSIONS.height}px`,
        });
        return;
      }

      if (img.width < IMAGE_CONSTRAINTS.MIN_DIMENSIONS.width || 
          img.height < IMAGE_CONSTRAINTS.MIN_DIMENSIONS.height) {
        resolve({
          valid: false,
          error: `Image dimensions too small. Minimum: ${IMAGE_CONSTRAINTS.MIN_DIMENSIONS.width}x${IMAGE_CONSTRAINTS.MIN_DIMENSIONS.height}px`,
        });
        return;
      }

      resolve({ valid: true });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ valid: false, error: 'Failed to load image' });
    };

    img.src = url;
  });
}

/**
 * Generate unique filename
 */
export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(
  file: File,
  bucket: StorageBucket,
  path?: string
): Promise<{ url: string; path: string } | { error: string }> {
  try {
    const supabase = createClient();

    // Validate file
    const validation = validateImage(file);
    if (!validation.valid) {
      return { error: validation.error! };
    }

    // Validate dimensions
    const dimensionValidation = await validateImageDimensions(file);
    if (!dimensionValidation.valid) {
      return { error: dimensionValidation.error! };
    }

    // Generate filename
    const fileName = generateFileName(file.name);
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'Failed to upload image' };
  }
}

/**
 * Upload multiple images
 */
export async function uploadMultipleImages(
  files: File[],
  bucket: StorageBucket,
  path?: string
): Promise<{ urls: string[]; paths: string[]; errors: string[] }> {
  const results = await Promise.all(
    files.map(file => uploadImage(file, bucket, path))
  );

  const urls: string[] = [];
  const paths: string[] = [];
  const errors: string[] = [];

  results.forEach((result, index) => {
    if ('error' in result) {
      errors.push(`File ${index + 1}: ${result.error}`);
    } else {
      urls.push(result.url);
      paths.push(result.path);
    }
  });

  return { urls, paths, errors };
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImage(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: 'Failed to delete image' };
  }
}

/**
 * Delete multiple images
 */
export async function deleteMultipleImages(
  bucket: StorageBucket,
  paths: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .remove(paths);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: 'Failed to delete images' };
  }
}

/**
 * Get image URL from storage path
 */
export function getImageUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Compress image before upload (client-side)
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 1200,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
}
