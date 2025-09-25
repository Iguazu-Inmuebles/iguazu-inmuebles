/*
  # Crear tabla de relación properties-features

  NOTA: La tabla property_features (singular) ya existe y contiene las características configurables.
  Esta migración crea properties_features (plural) que es la tabla de relación many-to-many
  entre propiedades y características.

  1. Crear tabla properties_features para relacionar propiedades con características
  2. Agregar claves foráneas y restricciones
  3. Configurar políticas RLS
*/

-- Crear tabla de relación properties_features (plural)
-- Esta tabla conecta properties con property_features (singular)
CREATE TABLE IF NOT EXISTS properties_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  feature_id uuid NOT NULL REFERENCES property_features(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(property_id, feature_id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_properties_features_property_id ON properties_features(property_id);
CREATE INDEX IF NOT EXISTS idx_properties_features_feature_id ON properties_features(feature_id);

-- Habilitar RLS
ALTER TABLE properties_features ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Enable read access for all users" ON properties_features
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON properties_features
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON properties_features
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users" ON properties_features
  FOR DELETE USING (true);

-- Comentarios para documentación
COMMENT ON TABLE properties_features IS 'Tabla de relación many-to-many entre propiedades y características configurables';
COMMENT ON COLUMN properties_features.property_id IS 'ID de la propiedad (referencia a properties.id)';
COMMENT ON COLUMN properties_features.feature_id IS 'ID de la característica (referencia a property_features.id)';