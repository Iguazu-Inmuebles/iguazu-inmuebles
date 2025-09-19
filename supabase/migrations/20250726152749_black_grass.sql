/*
  # Fix RLS policies for properties table

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policies that allow authenticated users to perform CRUD operations
    - Ensure proper access control for admin operations

  2. Changes
    - Allow authenticated users to insert, update, delete properties
    - Maintain public read access for the website
    - Fix RLS policy violations in admin panel
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable read access for all users" ON properties;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON properties;

-- Create new policies with proper permissions
CREATE POLICY "Allow public read access"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Also fix policies for property_images table
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_images;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_images;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_images;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_images;

CREATE POLICY "Allow public read access for images"
  ON property_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert for images"
  ON property_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update for images"
  ON property_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete for images"
  ON property_images
  FOR DELETE
  TO authenticated
  USING (true);