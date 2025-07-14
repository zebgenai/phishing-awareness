import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yfouobhovfocrziiepuj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmb3VvYmhvdmZvY3J6aWllcHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzk2NjUsImV4cCI6MjA2NzkxNTY2NX0.SwXCPCXl43InmIUhqAMZkEYdL6IkH6dg7i4OWnWoHRY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});