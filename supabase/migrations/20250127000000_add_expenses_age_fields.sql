-- Add expenses and age fields to properties table
-- Migration created: 2025-01-27

-- Add expenses field (text to allow flexible input like "$50,000" or "No aplica")
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS expenses text;

-- Add age field (integer for years)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS age integer DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN properties.expenses IS 'Property expenses - can be amount or text like "No aplica"';
COMMENT ON COLUMN properties.age IS 'Property age in years';