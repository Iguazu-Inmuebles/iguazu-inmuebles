/*
  # Update Properties Schema

  1. Schema Updates
    - Add currency field to properties table
    - Add cover_image_id field to properties table
    - Update property_images table with is_cover field
    - Add indexes for better performance

  2. Security
    - Update RLS policies for authenticated admin users
    - Maintain public read access
*/

-- Add currency field to properties table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'currency'
  ) THEN
    ALTER TABLE properties ADD COLUMN currency text DEFAULT 'ARS' CHECK (currency IN ('ARS', 'USD'));
  END IF;
END $$;

-- Add cover_image_id field to properties table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'cover_image_id'
  ) THEN
    ALTER TABLE properties ADD COLUMN cover_image_id uuid REFERENCES property_images(id);
  END IF;
END $$;

-- Add is_cover field to property_images table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_images' AND column_name = 'is_cover'
  ) THEN
    ALTER TABLE property_images ADD COLUMN is_cover boolean DEFAULT false;
  END IF;
END $$;

-- Update RLS policies for admin authentication
DROP POLICY IF EXISTS "Enable insert for service role" ON properties;
DROP POLICY IF EXISTS "Enable update for service role" ON properties;
DROP POLICY IF EXISTS "Enable delete for service role" ON properties;

DROP POLICY IF EXISTS "Enable insert for service role" ON property_images;
DROP POLICY IF EXISTS "Enable update for service role" ON property_images;
DROP POLICY IF EXISTS "Enable delete for service role" ON property_images;

-- Properties policies for authenticated admin users
CREATE POLICY "Enable insert for authenticated users"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Property images policies for authenticated admin users
CREATE POLICY "Enable insert for authenticated users"
  ON property_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON property_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
  ON property_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_currency ON properties(currency);
CREATE INDEX IF NOT EXISTS idx_properties_cover_image ON properties(cover_image_id);
CREATE INDEX IF NOT EXISTS idx_property_images_cover ON property_images(is_cover);

-- Update existing properties with currency
UPDATE properties SET currency = 'ARS' WHERE currency IS NULL;