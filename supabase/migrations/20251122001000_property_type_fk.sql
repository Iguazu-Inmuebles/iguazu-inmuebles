-- Fix property type constraint by replacing static CHECK with foreign key
-- This allows dynamic property types from property_types table

-- First, ensure all existing property types have corresponding entries in property_types table
INSERT INTO property_types (name, code, description, is_active) 
SELECT DISTINCT 
  CASE 
    WHEN property_type = 'casa' THEN 'Casa'
    WHEN property_type = 'departamento' THEN 'Departamento'
    WHEN property_type = 'terreno' THEN 'Terreno'
    WHEN property_type = 'local' THEN 'Local Comercial'
    WHEN property_type = 'quinta' THEN 'Quinta'
    WHEN property_type = 'oficina' THEN 'Oficina'
    WHEN property_type = 'galpon' THEN 'Galpón'
    ELSE INITCAP(property_type)
  END,
  property_type,
  CASE 
    WHEN property_type = 'casa' THEN 'Casa familiar independiente'
    WHEN property_type = 'departamento' THEN 'Departamento en edificio'
    WHEN property_type = 'terreno' THEN 'Terreno para construcción'
    WHEN property_type = 'local' THEN 'Local para actividad comercial'
    WHEN property_type = 'quinta' THEN 'Quinta o chacra'
    WHEN property_type = 'oficina' THEN 'Oficina comercial'
    WHEN property_type = 'galpon' THEN 'Galpón industrial o comercial'
    ELSE 'Tipo de propiedad'
  END,
  true
FROM properties 
WHERE property_type NOT IN (SELECT code FROM property_types)
ON CONFLICT (code) DO NOTHING;

-- Drop the existing CHECK constraint
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS properties_property_type_check;

-- Add foreign key constraint to property_types table
ALTER TABLE properties 
ADD CONSTRAINT properties_property_type_fk 
FOREIGN KEY (property_type) 
REFERENCES property_types(code) 
ON UPDATE CASCADE 
ON DELETE RESTRICT;

-- Ensure property_types.code is unique (required for foreign key)
ALTER TABLE property_types 
ADD CONSTRAINT property_types_code_unique UNIQUE (code);

-- Grant necessary permissions
GRANT SELECT ON property_types TO anon;
GRANT SELECT ON property_types TO authenticated;
GRANT INSERT, UPDATE, DELETE ON property_types TO authenticated;