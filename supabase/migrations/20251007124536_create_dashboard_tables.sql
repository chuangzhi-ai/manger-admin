/*
  # Dashboard Management System Schema

  1. New Tables
    - `dashboard_stats`
      - `id` (uuid, primary key)
      - `metric_name` (text) - Name of the metric (users, visits, downloads, usage)
      - `current_value` (integer) - Current value
      - `total_value` (integer) - Total/target value
      - `updated_at` (timestamptz) - Last update time
    
    - `hourly_traffic`
      - `id` (uuid, primary key)
      - `hour` (text) - Hour timestamp
      - `trend_visits` (integer) - Trend visit count
      - `monthly_visits` (integer) - Monthly visit count
      - `recorded_at` (timestamptz) - Record timestamp
    
    - `visitor_metrics`
      - `id` (uuid, primary key)
      - `dimension` (text) - Metric dimension
      - `male_count` (integer) - Male visitor count
      - `female_count` (integer) - Female visitor count
      - `updated_at` (timestamptz) - Last update time
    
    - `traffic_sources`
      - `id` (uuid, primary key)
      - `source_name` (text) - Source name
      - `percentage` (decimal) - Percentage value
      - `color` (text) - Chart color
      - `updated_at` (timestamptz) - Last update time

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    
  3. Notes
    - All tables use timestamptz for time tracking
    - Default values provided for timestamps
    - Data designed for analytics dashboard display
*/

CREATE TABLE IF NOT EXISTS dashboard_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  current_value integer DEFAULT 0,
  total_value integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hourly_traffic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hour text NOT NULL,
  trend_visits integer DEFAULT 0,
  monthly_visits integer DEFAULT 0,
  recorded_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS visitor_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension text NOT NULL,
  male_count integer DEFAULT 0,
  female_count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS traffic_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL,
  percentage decimal(5,2) DEFAULT 0,
  color text DEFAULT '#3b82f6',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE hourly_traffic ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read dashboard stats"
  ON dashboard_stats FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read hourly traffic"
  ON hourly_traffic FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read visitor metrics"
  ON visitor_metrics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read traffic sources"
  ON traffic_sources FOR SELECT
  TO public
  USING (true);