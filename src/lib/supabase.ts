import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DashboardStat {
  id: string;
  metric_name: string;
  current_value: number;
  total_value: number;
  updated_at: string;
}

export interface TrafficSource {
  id: string;
  source_name: string;
  percentage: number;
  color: string;
  updated_at: string;
}
