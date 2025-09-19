-- Add google_maps_link column to properties table
ALTER TABLE properties ADD COLUMN google_maps_link TEXT;

-- Add comment to the column
COMMENT ON COLUMN properties.google_maps_link IS 'URL de Google Maps para la ubicación de la propiedad';

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON properties TO anon;
GRANT ALL PRIVILEGES ON properties TO authenticated;