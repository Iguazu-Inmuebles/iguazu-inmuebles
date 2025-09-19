import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: false
    }
  }
);

// Types for our database
export interface Property {
  id: string;
  title: string;
  property_code?: string;
  description?: string;
  price: number;
  operation: 'venta' | 'alquiler';
  property_type: 'casa' | 'departamento' | 'terreno' | 'local' | 'quinta';
  currency: 'ARS' | 'USD';
  bedrooms: number;
  bathrooms: number;
  area?: number;
  lot_area?: number;
  address: string;
  neighborhood?: string;
  city: string;
  province: string;
  garage: boolean;
  pool: boolean;
  garden: boolean;
  furnished: boolean;
  pets_allowed: boolean;
  credit_eligible: boolean;
  featured: boolean;
  status: 'available' | 'sold' | 'rented';
  cover_image_id?: string;
  created_at: string;
  updated_at: string;
  property_images?: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  alt_text?: string;
  order_index: number;
  is_cover: boolean;
  created_at: string;
}

export interface PropertyFeature {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyZone {
  id: string;
  name: string;
  code: string;
  city: string;
  province: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyType {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
