/*
  # Create Properties Management Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `operation` (text) - 'venta' or 'alquiler'
      - `property_type` (text) - 'casa', 'departamento', 'terreno', 'local'
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `area` (numeric)
      - `lot_area` (numeric)
      - `address` (text)
      - `neighborhood` (text)
      - `city` (text)
      - `province` (text)
      - `garage` (boolean)
      - `pool` (boolean)
      - `garden` (boolean)
      - `furnished` (boolean)
      - `pets_allowed` (boolean)
      - `credit_eligible` (boolean)
      - `featured` (boolean)
      - `status` (text) - 'available', 'sold', 'rented'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `image_url` (text)
      - `alt_text` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin users to manage properties
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  operation text NOT NULL CHECK (operation IN ('venta', 'alquiler')),
  property_type text NOT NULL CHECK (property_type IN ('casa', 'departamento', 'terreno', 'local', 'quinta')),
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  area numeric,
  lot_area numeric,
  address text NOT NULL,
  neighborhood text,
  city text DEFAULT 'Posadas',
  province text DEFAULT 'Misiones',
  garage boolean DEFAULT false,
  pool boolean DEFAULT false,
  garden boolean DEFAULT false,
  furnished boolean DEFAULT false,
  pets_allowed boolean DEFAULT false,
  credit_eligible boolean DEFAULT false,
  featured boolean DEFAULT false,
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Policies for properties table
CREATE POLICY "Properties are viewable by everyone"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for property_images table
CREATE POLICY "Property images are viewable by everyone"
  ON property_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert property images"
  ON property_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update property images"
  ON property_images
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete property images"
  ON property_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_operation ON properties(operation);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_neighborhood ON properties(neighborhood);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_order ON property_images(property_id, order_index);

-- Insert sample data
INSERT INTO properties (
  title, description, price, operation, property_type, bedrooms, bathrooms, 
  area, lot_area, address, neighborhood, garage, pool, garden, featured, credit_eligible
) VALUES 
(
  'Casa en Barrio Jardín',
  'Hermosa casa con amplio jardín, ideal para familias. Excelente ubicación cerca de escuelas y comercios.',
  85000000,
  'venta',
  'casa',
  3,
  2,
  180,
  300,
  'Av. Mitre 1234, Barrio Jardín',
  'Barrio Jardín',
  true,
  false,
  true,
  true,
  true
),
(
  'Departamento Centro',
  'Moderno departamento en el corazón de la ciudad. Totalmente amueblado y listo para habitar.',
  45000,
  'alquiler',
  'departamento',
  2,
  1,
  65,
  null,
  'San Martín 567, Centro',
  'Centro',
  false,
  false,
  false,
  true,
  false
),
(
  'Casa Villa Cabello',
  'Espectacular casa de dos plantas con piscina. Diseño moderno y acabados de primera calidad.',
  120000000,
  'venta',
  'casa',
  4,
  3,
  250,
  400,
  'Los Aromos 890, Villa Cabello',
  'Villa Cabello',
  true,
  true,
  true,
  true,
  true
);

-- Insert sample images
DO $$
DECLARE
  prop1_id uuid;
  prop2_id uuid;
  prop3_id uuid;
BEGIN
  SELECT id INTO prop1_id FROM properties WHERE title = 'Casa en Barrio Jardín';
  SELECT id INTO prop2_id FROM properties WHERE title = 'Departamento Centro';
  SELECT id INTO prop3_id FROM properties WHERE title = 'Casa Villa Cabello';

  INSERT INTO property_images (property_id, image_url, alt_text, order_index) VALUES
  (prop1_id, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Vista frontal de la casa', 0),
  (prop1_id, 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Living comedor', 1),
  (prop1_id, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Cocina moderna', 2),
  
  (prop2_id, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Vista del departamento', 0),
  (prop2_id, 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Dormitorio principal', 1),
  
  (prop3_id, 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Fachada de la casa', 0),
  (prop3_id, 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Piscina y jardín', 1),
  (prop3_id, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Interior moderno', 2);
END $$;