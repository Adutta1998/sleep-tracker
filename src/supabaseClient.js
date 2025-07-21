import { createClient } from "@supabase/supabase-js";

// TODO: Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://mlhvpwimflktdflhuzbd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saHZwd2ltZmxrdGRmbGh1emJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNTE2ODIsImV4cCI6MjA2ODYyNzY4Mn0.V71rPNf-cv0Ui4XYXSj2xpzDznSJDK-FlzFc-e019FU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
