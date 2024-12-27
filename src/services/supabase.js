/** @format */

import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://jroqiytbtljjznebyltj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyb3FpeXRidGxqanpuZWJ5bHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MjMyNTIsImV4cCI6MjAzMjI5OTI1Mn0.vs0JN05HKEV6ZE_M_UVs5372bqQVMza1uhAoayBKvx0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
