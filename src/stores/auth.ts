import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import type { Profile, UserRole } from '@/types/database';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAuth: () => void;
  
  // Computed helpers
  getUserRole: () => UserRole | null;
  isVendor: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      }),
      
      setProfile: (profile) => set({ profile }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      clearAuth: () => set({ 
        user: null, 
        profile: null, 
        isAuthenticated: false,
        isLoading: false 
      }),
      
      getUserRole: () => {
        const { profile } = get();
        return profile?.role || null;
      },
      
      isVendor: () => {
        const { profile } = get();
        return profile?.role === 'vendor' || profile?.role === 'admin';
      },
      
      isAdmin: () => {
        const { profile } = get();
        return profile?.role === 'admin';
      },
    }),
    {
      name: 'shopthings-auth',
      partialize: (state) => ({
        // Persist minimal safe fields to avoid guest flashes after navigation
        isAuthenticated: state.isAuthenticated,
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              app_metadata: state.user.app_metadata,
              user_metadata: state.user.user_metadata,
              aud: state.user.aud,
              created_at: state.user.created_at,
              role: state.user.role,
              confirmed_at: state.user.confirmed_at,
              last_sign_in_at: state.user.last_sign_in_at,
              phone: state.user.phone,
              identities: state.user.identities,
              updated_at: state.user.updated_at,
            }
          : null,
        profile: state.profile
          ? {
              id: state.profile.id,
              full_name: state.profile.full_name,
              avatar_url: state.profile.avatar_url,
              role: state.profile.role,
              phone: state.profile.phone,
              created_at: state.profile.created_at,
            }
          : null,
      }),
    }
  )
);
