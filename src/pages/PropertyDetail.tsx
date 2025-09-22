import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Property, PropertyZone } from '../lib/supabase';
import { 
  Bed, 
  Bath, 
  Car, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ChevronLeft,
  ChevronRight,
  Home,
  Ruler,
  Shield,
  Heart,
  X,
  ZoomIn
} from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images!property_images_property_id_fkey (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('es-AR');
    const symbol = currency === 'USD' ? 'US$' : '$';
    return `${symbol} ${formatter.format(price)}`;
  };

  const nextImage = () => {
    const images = property?.property_images || [];
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const images = property?.property_images || [];
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const nextModalImage = () => {
    const images = property?.property_images || [];
    setModalImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    const images = property?.property_images || [];
    setModalImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B1E1E] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
          <Link to="/propiedades" className="text-[#8B1E1E] hover:underline">
            Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  const images = property.property_images || [];
  const location = `${property.neighborhood ? property.neighborhood + ', ' : ''}${property.city}`;
  
  const amenities = [
    ...(property.credit_eligible ? [{ icon: Shield, text: "Apto crédito hipotecario" }] : []),
    ...(property.pets_allowed ? [{ icon: Heart, text: "Acepta mascotas" }] : []),
    ...(property.garage ? [{ icon: Car, text: "Cochera" }] : []),
    ...(property.furnished ? [{ icon: Home, text: "Amueblado" }] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#8B1E1E]">Inicio</Link>
            <span>/</span>
            <Link to="/propiedades" className="hover:text-[#8B1E1E]">Propiedades</Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <div className="relative cursor-pointer group" onClick={() => openImageModal(currentImageIndex)}>
                  <img
                    src={images[currentImageIndex]?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                    alt={property.title}
                    className="w-full h-96 object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Operation Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.operation === 'venta' 
                      ? 'bg-[#8B1E1E] text-white' 
                      : 'bg-[#1F5F2D] text-white'
                  }`}>
                    {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
                  </span>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openImageModal(index)}
                      className={`relative rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-[#8B1E1E]' : ''
                      } hover:opacity-80 transition-opacity duration-200`}
                    >
                      <img
                        src={image.image_url}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <ZoomIn className="w-4 h-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.address}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              
              <div className="text-4xl font-bold text-[#8B1E1E] mb-6">
                {formatPrice(property.price, property.currency || 'ARS')}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-8 h-8 text-[#8B1E1E] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Dormitorios</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-8 h-8 text-[#8B1E1E] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Baños</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Ruler className="w-8 h-8 text-[#8B1E1E] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.area ? `${property.area} m²` : 'N/A'}</div>
                  <div className="text-sm text-gray-600">Cubiertos</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="w-8 h-8 text-[#8B1E1E] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.lot_area ? `${property.lot_area} m²` : 'N/A'}</div>
                  <div className="text-sm text-gray-600">Terreno</div>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
              )}

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Servicios y Comodidades</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                      <amenity.icon className="w-8 h-8 text-[#1F5F2D] mb-2" />
                      <span className="text-sm text-gray-700">{amenity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Información de la Propiedad</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código:</span>
                    <span className="font-medium font-mono">
                      {property.property_code || `IG-${property.id.slice(-4).toUpperCase()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium capitalize">{property.property_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operación:</span>
                    <span className="font-medium">{property.operation === 'venta' ? 'Venta' : 'Alquiler'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Superficie cubierta:</span>
                    <span className="font-medium">{property.area ? `${property.area} m²` : 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Superficie total:</span>
                    <span className="font-medium">{property.lot_area ? `${property.lot_area} m²` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Antigüedad:</span>
                    <span className="font-medium">5 años</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-medium">Excelente</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expensas:</span>
                    <span className="font-medium">No aplica</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Button Section */}
            {property.google_maps_link && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ubicación</h3>
                
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">
                    <p className="font-medium">{property.address}</p>
                    <p>{property.neighborhood && `${property.neighborhood}, `}{property.city}, {property.province}</p>
                  </div>
                  
                  <a
                    href={property.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1F5F2D] text-white px-6 py-3 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200 flex items-center space-x-2 font-medium"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Ver en Google Maps</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contactar por esta propiedad</h3>
              
              {/* Property Code Display */}
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Código de Propiedad:</div>
                <div className="font-mono font-semibold text-gray-900">
                  {property.property_code || `IG-${property.id.slice(-4).toUpperCase()}`}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-2 mb-4">
                <a
                  href="tel:+543764123456"
                  className="w-full flex items-center justify-center space-x-2 bg-[#1F5F2D] text-white px-4 py-2.5 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>Llamar Ahora</span>
                </a>
                <a
                  href={`https://wa.me/543764123456?text=${encodeURIComponent(`¡Hola! Me interesa la propiedad ${property.property_code || `IG-${property.id.slice(-4).toUpperCase()}`} - ${property.title}. ¿Podrían darme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg hover:bg-[#20b858] transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Contact Form */}
              <form className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder={`Mensaje sobre la propiedad ${property.property_code || `IG-${property.id.slice(-4).toUpperCase()}`} (opcional)`}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent resize-none text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B1E1E] text-white px-4 py-2.5 rounded-lg hover:bg-[#a52525] transition-colors duration-200 font-medium"
                >
                  Enviar Consulta
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-7xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <img
                src={images[modalImageIndex]?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt={`${property.title} - Imagen ${modalImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                {modalImageIndex + 1} / {images.length}
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="flex space-x-2 max-w-md overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setModalImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                          index === modalImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                        }`}
                      >
                        <img
                          src={image.image_url}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;