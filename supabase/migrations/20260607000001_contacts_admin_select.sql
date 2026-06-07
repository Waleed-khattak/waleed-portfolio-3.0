-- Allow service_role (admin) to SELECT submitted contacts
-- This enables you to read/review contact submissions from the dashboard

GRANT SELECT ON public.contacts TO service_role;

-- Admin select policy: only service_role can read all rows
CREATE POLICY "Service role can read all contacts"
  ON public.contacts
  FOR SELECT
  TO service_role
  USING (true);

-- Optional: allow authenticated (admin user) to read contacts
-- Uncomment if you have an admin user with authenticated role:
-- GRANT SELECT ON public.contacts TO authenticated;
-- CREATE POLICY "Authenticated users can read contacts"
--   ON public.contacts
--   FOR SELECT
--   TO authenticated
--   USING (true);
