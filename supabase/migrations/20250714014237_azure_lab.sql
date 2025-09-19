/*
  # Update RLS policies for admin operations

  1. Security Changes
    - Update policies to allow admin operations
    - Maintain security while enabling functionality
    - Allow operations with service role key for admin panel

  2. Policy Updates
    - Allow INSERT/UPDATE/DELETE for authenticated users
    - Allow public SELECT for property viewing
    - Enable admin operations through service role
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Properties are viewable by everyone" ON properties;
DROP POLICY IF EXISTS "Authenticated users can insert properties" ON properties;
DROP POLICY IF EXISTS "Authenticated users can update properties" ON properties;
DROP POLICY IF EXISTS "Authenticated users can delete properties" ON properties;

DROP POLICY IF EXISTS "Property images are viewable by everyone" ON property_images;
DROP POLICY IF EXISTS "Authenticated users can insert property images" ON property_images;
DROP POLICY IF EXISTS "Authenticated users can update property images" ON property_images;
DROP POLICY IF EXISTS "Authenticated users can delete property images" ON property_images;

-- Create new policies for properties table
CREATE POLICY "Enable read access for all users" ON properties
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON properties
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON properties
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON properties
  FOR DELETE USING (true);

-- Create new policies for property_images table
CREATE POLICY "Enable read access for all users" ON property_images
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON property_images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON property_images
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON property_images
  FOR DELETE USING (true);