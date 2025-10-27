-- Mission RSVPs Table
-- Add this to your existing Supabase database (the same one as your wedding site)

CREATE TABLE IF NOT EXISTS mission_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  operative_name TEXT NOT NULL UNIQUE,
  operative_password TEXT NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups by operative name
CREATE INDEX IF NOT EXISTS idx_mission_rsvps_operative_name
ON mission_rsvps(operative_name);

-- Add Row Level Security (RLS) policies if needed
-- Note: These are optional. If your wedding site doesn't use RLS, you can skip this.

-- Enable RLS on the table
ALTER TABLE mission_rsvps ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read RSVPs (for login authentication)
CREATE POLICY "Allow public read access"
ON mission_rsvps FOR SELECT
USING (true);

-- Policy: Allow anyone to insert RSVPs (for adding new operatives)
CREATE POLICY "Allow public insert access"
ON mission_rsvps FOR INSERT
WITH CHECK (true);

-- Policy: Allow anyone to update accepted_at timestamp (for mission acceptance)
CREATE POLICY "Allow public update access"
ON mission_rsvps FOR UPDATE
USING (true);

-- Example: Add operatives with passwords
-- INSERT INTO mission_rsvps (operative_name, operative_password) VALUES
--   ('Beñ', 'waxed_guys_go_deeper'),
--   ('Bill Squilliam', 'houthinni_pc_small_group'),
--   ('Yackson', 'whip_route'),
--   ('Big Fudge', 'game_master'),
--   ('AI_SLOP', 'azuli');

-- Optional: Query to view all RSVPs
-- SELECT operative_name, accepted_at
-- FROM mission_rsvps
-- ORDER BY accepted_at DESC;

-- Optional: Query to check if a specific operative has accepted
-- SELECT * FROM mission_rsvps
-- WHERE operative_name = 'Beñ';
