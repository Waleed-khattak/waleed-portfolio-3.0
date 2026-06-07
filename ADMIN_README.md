# Admin Guide - Waleed Portfolio

## Viewing Contact Form Submissions

All contact messages are stored in Supabase in the `public.contacts` table.

### Via Supabase Dashboard (recommended)

1. Log in to https://supabase.com/dashboard
2. Open your project → **Table Editor** → `contacts`
3. All columns visible: `id`, `name`, `email`, `message`, `created_at`

### Via Supabase SQL Editor

```sql
-- View all submissions, newest first
SELECT id, name, email, message, created_at
FROM public.contacts
ORDER BY created_at DESC;

-- Search by email
SELECT * FROM public.contacts
WHERE email ILIKE '%example.com%';

-- Count total submissions
SELECT COUNT(*) FROM public.contacts;
```

### Via Supabase API (with service_role key)

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // NOT the anon key
);

const { data, error } = await supabase
  .from('contacts')
  .select('*')
  .order('created_at', { ascending: false });
```

## Environment Variables

Create a `.env.local` file:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```
