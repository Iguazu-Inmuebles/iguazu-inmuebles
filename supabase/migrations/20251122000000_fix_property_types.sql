-- Fix property type constraint to include all available types from property_types table

-- First, let's add the missing property types to the property_types table if they don't exist
INSERT INTO property_types (name, code, description) VALUES
  ('Galpón', 'galpon', 'Galpón industrial o comercial'),
  ('Oficina', 'oficina', 'Oficina comercial')
ON CONFLICT (code) DO NOTHING;

-- Now update the constraint in the properties table
-- We need to drop the existing constraint and create a new one
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS properties_property_type_check;

-- Create new constraint with all available property types
ALTER TABLE properties 
ADD CONSTRAINT properties_property_type_check 
CHECK (property_type IN ('casa', 'departamento', 'terreno', 'local', 'quinta', 'oficina', 'galpon'));

-- Grant permissions for the property_types table to anon and authenticated roles
GRANT SELECT ON property_types TO anon;
GRANT SELECT ON property_types TO authenticated;
GRANT INSERT, UPDATE, DELETE ON property_types TO authenticated;