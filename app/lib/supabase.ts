import { createClient } from "@supabase/supabase-js";

/** Valid placeholders so createClient never throws when env is missing (local preview / misconfigured deploy). */
const PLACEHOLDER_URL = "https://missing-env.supabase.co";
const PLACEHOLDER_KEY = "missing-environment";

const urlFromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const keyFromEnv =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(urlFromEnv && keyFromEnv);

const supabaseUrl = urlFromEnv || PLACEHOLDER_URL;
const supabaseKey = keyFromEnv || PLACEHOLDER_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
