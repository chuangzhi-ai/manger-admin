/*
  # Additional Pages Schema

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text) - Task title
      - `description` (text) - Task description
      - `status` (text) - Task status: pending, in_progress, completed
      - `priority` (text) - Priority: low, medium, high
      - `due_date` (timestamptz) - Due date
      - `created_at` (timestamptz) - Creation time
    
    - `news_articles`
      - `id` (uuid, primary key)
      - `title` (text) - Article title
      - `summary` (text) - Brief summary
      - `content` (text) - Full content
      - `category` (text) - Article category
      - `author` (text) - Author name
      - `views` (integer) - View count
      - `published_at` (timestamptz) - Publish date
      - `created_at` (timestamptz) - Creation time
    
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text) - Project name
      - `description` (text) - Project description
      - `status` (text) - Status: active, completed, on_hold
      - `progress` (integer) - Progress percentage 0-100
      - `team_size` (integer) - Number of team members
      - `budget` (decimal) - Project budget
      - `start_date` (timestamptz) - Start date
      - `end_date` (timestamptz) - End date
      - `created_at` (timestamptz) - Creation time
    
    - `overview_metrics`
      - `id` (uuid, primary key)
      - `metric_type` (text) - Type of metric
      - `value` (decimal) - Metric value
      - `change_percentage` (decimal) - Change percentage
      - `updated_at` (timestamptz) - Last update time

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    
  3. Notes
    - All tables use timestamptz for time tracking
    - Default values provided where appropriate
    - Sample data will be inserted separately
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  status text DEFAULT 'pending',
  priority text DEFAULT 'medium',
  due_date timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text DEFAULT '',
  content text DEFAULT '',
  category text DEFAULT 'general',
  author text DEFAULT 'Admin',
  views integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  status text DEFAULT 'active',
  progress integer DEFAULT 0,
  team_size integer DEFAULT 1,
  budget decimal(12,2) DEFAULT 0,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS overview_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type text NOT NULL,
  value decimal(12,2) DEFAULT 0,
  change_percentage decimal(5,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE overview_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tasks"
  ON tasks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read news articles"
  ON news_articles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read overview metrics"
  ON overview_metrics FOR SELECT
  TO public
  USING (true);