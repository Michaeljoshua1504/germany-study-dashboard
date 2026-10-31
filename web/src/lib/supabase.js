import { createClient } from '@supabase/supabase-js';

// Same Supabase project as the existing dashboard — same tables, same RLS,
// same users. The anon key is safe to ship client-side; row access is
// governed entirely by RLS policies on each table.
const SUPABASE_URL = 'https://epndekpwxngjozytlcmy.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbmRla3B3eG5nam96eXRsY215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzgxNTIsImV4cCI6MjA5ODMxNDE1Mn0.WtNsEgvw6ezTJN4ACVYB6Mcv57hABo0FGMC2nRamLiA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
