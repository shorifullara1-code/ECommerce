import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined. Supabase functionality will not work.');
  // Show an alert to the user in development
  if (typeof window !== 'undefined') {
    setTimeout(() => {
       alert("Live Chat Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Please add them in the platform Settings / Secrets to enable real-time messaging.");
    }, 2000);
  }
}

// Fallback to a dummy URL if missing so we don't crash the entire app on load
export const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co', 
  supabaseAnonKey || 'dummy-key'
);
