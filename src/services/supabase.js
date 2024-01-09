import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://spukeonlyqtisnkqhveh.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdWtlb25seXF0aXNua3FodmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3NjE1NDMsImV4cCI6MjAyMDMzNzU0M30.eg7bkc4ZIg4edPKhYcF-SPC7KT4XEWWvBlTVl7x8qgU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
