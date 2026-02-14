import { createClient } from '@supabase/supabase-js';

// These environment variables are assumed to be pre-configured.
// If you are setting this up for the first time, you must create 
// 'bookings' and 'orders' tables in your Supabase project.
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);