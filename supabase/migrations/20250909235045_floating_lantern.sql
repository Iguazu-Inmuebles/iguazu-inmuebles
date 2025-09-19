/*
  # Agregar columna de código de propiedad

  1. Cambios
    - Agregar columna `property_code` a la tabla `properties`
    - La columna será de tipo TEXT y única
    - Permitir NULL temporalmente para propiedades existentes
    - Agregar índice para búsquedas rápidas

  2. Seguridad
    - No se eliminan datos existentes
    - La columna es opcional inicialmente
*/

-- Agregar la columna property_code
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS property_code TEXT;

-- Crear índice único para el código de propiedad (permitiendo NULL)
CREATE UNIQUE INDEX IF NOT EXISTS idx_properties_property_code 
ON properties (property_code) 
WHERE property_code IS NOT NULL;

-- Agregar comentario a la columna
COMMENT ON COLUMN properties.property_code IS 'Código único personalizable para identificar la propiedad';