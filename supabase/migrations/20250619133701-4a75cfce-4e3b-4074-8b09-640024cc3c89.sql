
-- Create donations table to track donation payments
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- pending, completed, failed
  donor_name TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (optional for donations, but good practice)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert donations (for guest donations)
CREATE POLICY "allow_donation_insert" ON public.donations
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading donations (for admin purposes later)
CREATE POLICY "allow_donation_read" ON public.donations
  FOR SELECT
  USING (true);
