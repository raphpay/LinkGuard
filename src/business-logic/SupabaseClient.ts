import { createClient } from "@supabase/supabase-js";

import.meta.env.VITE_EXAMPLE;

// Remplace par ton URL et ta clé publique
const supabaseUrl = "https://icglzxvsopqgjcumjpjt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2x6eHZzb3BxZ2pjdW1qcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNjI1MDgsImV4cCI6MjA2MTkzODUwOH0.eDNF9IEN7Nwl3aUC3XSjK0UojenqjvLfX5uZM_JNhl4";

export const supabase = createClient(supabaseUrl, supabaseKey);
