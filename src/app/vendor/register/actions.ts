'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type VendorRegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  storeName: string;
  storeDescription: string;
  businessCategory: string;
  country: string;
  city: string;
  address: string;
  website?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  businessRegistration?: string;
  idType?: string;
  idNumber?: string;
};

export async function registerVendor(data: VendorRegistrationData) {
  const supabase = await createClient();

  // 1. Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: 'Failed to create user account' };
  }

  const userId = authData.user.id;

  try {
    // 2. Update Profile to 'vendor' role
    // We wait a brief moment to ensure trigger defined in 003_functions_triggers.sql has run
    // But since server actions are async, race conditions might happen.
    // However, usually triggers are synchronous within the transaction.
    // We'll update the role directly.
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        role: 'vendor',
        phone: data.phone, // Update phone in profile as well
        full_name: `${data.firstName} ${data.lastName}`
      })
      .eq('id', userId);

    if (profileError) {
      // If profile doesn't exist yet (trigger lag?), we might need to handle retry or manual insert
      // But for standard Supabase setup, trigger is immediate.
      console.error('Profile update invalid:', profileError);
      return { error: 'Failed to set vendor privileges' };
    }

    // 3. Create Vendor Record
    const { error: vendorError } = await supabase
      .from('vendors')
      .insert({
        user_id: userId,
        store_name: data.storeName,
        store_description: data.storeDescription,
        status: 'pending', // Admins must approve
        is_verified: false,
        social_links: {
          website: data.website,
          instagram: data.instagram,
          whatsapp: data.whatsapp,
          tiktok: data.tiktok,
        }
      });

    if (vendorError) {
      console.error('Vendor creation failed:', vendorError);
      return { error: 'Failed to create store record' };
    }

    // 4. Create Address Record (Business Address)
    await supabase.from('addresses').insert({
      user_id: userId,
      label: 'Business',
      full_name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      address_line_1: data.address,
      city: data.city,
      country: data.country,
      state: 'N/A', // Assuming not collected in simplified form
      postal_code: '00000',
      is_default: true
    });

    return { success: true };

  } catch (err: any) {
    console.error('Registration error:', err);
    return { error: err.message || 'An unexpected error occurred' };
  }
}
