/*
  # Create admin configuration tables

  1. New Tables
    - `property_features` - Configurable property features
    - `property_zones` - Configurable zones/neighborhoods  
    - `property_types` - Configurable property types
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Add policies for public users to read data

  3. Initial Data
    - Insert default features, zones, and property types
*/

-- Create property_features table
CREATE TABLE IF NOT EXISTS property_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_zones table
CREATE TABLE IF NOT EXISTS property_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  city text DEFAULT 'Posadas',
  province text DEFAULT 'Misiones',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_types table
CREATE TABLE IF NOT EXISTS property_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_types ENABLE ROW LEVEL SECURITY;

-- Create policies for property_features
CREATE POLICY "Enable read access for all users" ON property_features
  FOR SELECT TO public USING (true);

CREATE POLICY "Enable insert for authenticated users" ON property_features
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON property_features
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON property_features
  FOR DELETE TO authenticated USING (true);

-- Create policies for property_zones
CREATE POLICY "Enable read access for all users" ON property_zones
  FOR SELECT TO public USING (true);

CREATE POLICY "Enable insert for authenticated users" ON property_zones
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON property_zones
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON property_zones
  FOR DELETE TO authenticated USING (true);

-- Create policies for property_types
CREATE POLICY "Enable read access for all users" ON property_types
  FOR SELECT TO public USING (true);

CREATE POLICY "Enable insert for authenticated users" ON property_types
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON property_types
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON property_types
  FOR DELETE TO authenticated USING (true);

-- Insert default property features
INSERT INTO property_features (name, code, description) VALUES
  ('Cochera', 'garage', 'Propiedad con cochera o estacionamiento'),
  ('Piscina', 'pool', 'Propiedad con piscina'),
  ('Jardín', 'garden', 'Propiedad con jardín o espacio verde'),
  ('Amueblado', 'furnished', 'Propiedad completamente amueblada'),
  ('Acepta Mascotas', 'pets_allowed', 'Se permiten mascotas en la propiedad'),
  ('Inversión', 'investment', 'Propiedad ideal para inversión')
ON CONFLICT (code) DO NOTHING;

-- Insert default zones
INSERT INTO property_zones (name, code) VALUES
  ('Centro', 'centro'),
  ('Barrio Jardín', 'barrio-jardin'),
  ('Villa Cabello', 'villa-cabello'),
  ('San Lorenzo', 'san-lorenzo'),
  ('Itaembé Miní', 'itaembe-mini'),
  ('Villa Urquiza', 'villa-urquiza'),
  ('Villa Sarita', 'villa-sarita'),
  ('Nemesio Parma', 'nemesio-parma')
ON CONFLICT (code) DO NOTHING;

-- Insert default property types
INSERT INTO property_types (name, code, description) VALUES
  ('Casa', 'casa', 'Casa familiar independiente'),
  ('Departamento', 'departamento', 'Departamento en edificio'),
  ('Terreno', 'terreno', 'Terreno para construcción'),
  ('Local Comercial', 'local', 'Local para actividad comercial'),
  ('Quinta', 'quinta', 'Quinta o chacra'),
  ('Oficina', 'oficina', 'Oficina comercial'),
  ('Galpón', 'galpon', 'Galpón industrial o comercial')
ON CONFLICT (code) DO NOTHING;