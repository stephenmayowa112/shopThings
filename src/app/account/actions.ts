'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getUserProfile() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code === 'PGRST116') {
    // Profile doesn't exist, create it from auth data
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        phone: user.phone || null,
        role: 'buyer',
        is_active: true,
        two_factor_enabled: false,
        preferred_currency: 'NGN' // Default to NGN
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating missing profile:', createError);
      return null;
    }
    
    profile = newProfile;
  } else if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return profile;
}

export async function updateUserProfile(data: { firstName: string; lastName: string; phone: string }) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const fullName = `${data.firstName} ${data.lastName}`.trim();

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      phone: data.phone,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/account/profile');
  return { success: true };
}
