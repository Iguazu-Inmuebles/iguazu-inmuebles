import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Car, MapPin, Eye, Star } from 'lucide-react';
import { supabase, Property } from '../lib/supabase';
import { sanitizePropertyDescription } from '../utils/sanitization';

const FeaturedProperties = () => {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.error('Supabase not configured. Please add your Supabase credentials to the .env file.');
        setProperties([]);
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images!property_images_property_id_fkey (*)
        `)
        .eq('featured', true)
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      // Set empty array to prevent UI issues
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('es-AR');
    const symbol = currency === 'USD' ? 'US$' : '$';
    return `${symbol} ${formatter.format(price)}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cargando propiedades destacadas...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de las mejores propiedades disponibles en Misiones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => {
            const coverImage = property.property_images?.find(img => img.is_cover) || property.property_images?.[0];
            const location = `${property.neighborhood ? property.neighborhood + ', ' : ''}${property.city}`;
            
            return (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative">
                <img
                  src={coverImage?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={`${property.property_type} en ${property.operation} - ${property.title} - Puerto Iguazú, Misiones - Inmobiliaria Iguazú`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.operation === 'Venta' || 
                    property.operation === 'venta' 
                      ? 'bg-[#8B1E1E] text-white' 
                      : 'bg-[#1F5F2D] text-white'
                  }`}>
                    {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
                  </span>
                </div>
                {property.featured && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{location}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {property.description ? sanitizePropertyDescription(property.description) : 'Excelente propiedad disponible.'}
                </p>

                {/* Features */}
                <div className="flex items-center space-x-4 mb-4 text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center space-x-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{property.bathrooms}</span>
                    </div>
                  )}
                  {property.garage && (
                    <div className="flex items-center space-x-1">
                      <Car className="w-4 h-4" />
                      <span className="text-sm">Cochera</span>
                    </div>
                  )}
                  <div className="text-sm font-medium">{property.area}</div>
                  <div className="text-sm font-medium">{property.area ? `${property.area} m²` : ''}</div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#8B1E1E]">
                    {property.price === 0 ? 'Consultar Valor' : formatPrice(property.price, property.currency || 'ARS')}
                  </div>
                  <Link
                    to={`/propiedades/${property.id}`}
                    className="bg-[#1F5F2D] text-white px-4 py-2 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver más</span>
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/propiedades"
            className="bg-[#8B1E1E] text-white px-8 py-3 rounded-lg hover:bg-[#a52525] transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Ver Todas las Propiedades</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;