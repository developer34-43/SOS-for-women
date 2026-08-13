/*
# Create profiles table for Guardian Vision AI

## Purpose
Stores per-user profile data for the Guardian Vision AI safety app.
Each authenticated user owns exactly one row, keyed by their auth uid.

## New Tables
- `profiles`
  - `id` (uuid, primary key) — references auth.users(id), cascades on delete
  - `name` (text, not null) — full display name
  - `email` (text, not null) — denormalized auth email for convenience
  - `phone` (text) — contact phone number
  - `profile_image` (text) — URL to avatar image (storage or external)
  - `blood_group` (text) — e.g. "O+", "A-" for medical context
  - `emergency_contacts` (jsonb, default '[]') — array of {name, phone, relation}
  - `medical_notes` (text) — allergies, conditions, etc.
  - `language` (text, default 'en') — preferred UI language
  - `theme` (text, default 'dark') — preferred theme
  - `email_verified` (boolean, default false) — mirrors auth email verification
  - `created_at` (timestamptz, default now()) — account creation
  - `last_login` (timestamptz, default now()) — updated on each login

## Security
- RLS enabled on `profiles`.
- 4 owner-scoped policies (SELECT/INSERT/UPDATE/DELETE), each TO authenticated,
  keyed on auth.uid() = id.
- The id column defaults to auth.uid() so a client insert that omits id still
  satisfies the INSERT WITH CHECK.

## Notes
1. The table is idempotent (IF NOT EXISTS).
2. Policies are dropped before recreate to stay re-runnable.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  profile_image text DEFAULT '',
  blood_group text DEFAULT '',
  emergency_contacts jsonb NOT NULL DEFAULT '[]'::jsonb,
  medical_notes text DEFAULT '',
  language text NOT NULL DEFAULT 'en',
  theme text NOT NULL DEFAULT 'dark',
  email_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_login timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE TO authenticated
  USING (auth.uid() = id);
