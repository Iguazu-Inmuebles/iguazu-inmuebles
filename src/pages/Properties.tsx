import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Car, MapPin, Eye, Filter, Grid, List, X, Home, ChevronDown } from 'lucide-react';
import { supabase, Property, PropertyZone, PropertyFeature } from '../lib/supabase';

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [zones, setZones] = useState<PropertyZone[]>([]);
  const [features, setFeatures] = useState<PropertyFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    operation: '',
    bedrooms: '',
    bathrooms: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchProperties();
    fetchZones();
    fetchFeatures();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images!property_images_property_id_fkey(
            id,
            image_url,
            order_index,
            is_cover
          ),
          properties_features!properties_features_property_id_fkey(
            feature_id,
            property_features!properties_features_feature_id_fkey(
              id,
              name,
              code
            )
          )
        `)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setError('Error al cargar las propiedades');
      } else {
        setProperties(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar las propiedades');
    } finally {
      setLoading(false);
    }
  };

  const fetchZones = async () => {
    try {
      const { data, error } = await supabase
        .from('property_zones')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setZones(data || []);
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('property_features')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setFeatures(data || []);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('es-AR');
    const symbol = currency === 'USD' ? 'US$' : '$';
    return `${symbol} ${formatter.format(price)}`;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFilters(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      propertyType: '',
      operation: '',
      bedrooms: '',
      bathrooms: '',
      neighborhood: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  const filteredProperties = properties.filter(property => {
    // Filtro por búsqueda de texto
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle = property.title.toLowerCase().includes(searchTerm);
      const matchesAddress = property.address.toLowerCase().includes(searchTerm);
      const matchesCode = property.property_code?.toLowerCase().includes(searchTerm);
      const matchesDescription = property.description?.toLowerCase().includes(searchTerm);
      
      if (!matchesTitle && !matchesAddress && !matchesCode && !matchesDescription) {
        return false;
      }
    }

    // Filtro por tipo de propiedad
    if (filters.propertyType && filters.propertyType !== property.property_type) {
      return false;
    }

    // Filtro por operación
    if (filters.operation && filters.operation !== property.operation) {
      return false;
    }

    // Filtro por dormitorios
    if (filters.bedrooms) {
      if (filters.bedrooms === '4+') {
        if (property.bedrooms < 4) return false;
      } else {
        if (property.bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }

    // Filtro por baños
    if (filters.bathrooms) {
      if (filters.bathrooms === '4+') {
        if (property.bathrooms < 4) return false;
      } else {
        if (property.bathrooms !== parseInt(filters.bathrooms)) return false;
      }
    }

    // Filtro por zona/barrio
    if (filters.neighborhood) {
      const propertyNeighborhood = property.neighborhood?.toLowerCase() || '';
      if (!propertyNeighborhood.includes(filters.neighborhood.toLowerCase())) {
        return false;
      }
    }

    // Filtro por precio mínimo
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      if (property.price < minPrice) return false;
    }

    // Filtro por precio máximo
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (property.price > maxPrice) return false;
    }

    // Filtros dinámicos por características usando properties_features
    for (const feature of features) {
      const filterKey = `feature_${feature.code}` as keyof typeof filters;
      if (filters[filterKey]) {
        // Verificar si la propiedad tiene esta característica en properties_features
        const hasFeature = property.properties_features?.some(
          (pf: any) => pf.property_features?.code === feature.code
        );
        
        // Debug: Log para verificar el filtrado
        console.log(`Filtering by ${feature.name} (${feature.code}):`, {
          propertyId: property.id,
          propertyTitle: property.title,
          hasFeature,
          propertyFeatures: property.properties_features?.map((pf: any) => ({
            featureId: pf.feature_id,
            featureName: pf.property_features?.name,
            featureCode: pf.property_features?.code
          }))
        });
        
        // Si no tiene la característica, excluir la propiedad
        if (!hasFeature) {
          return false;
        }
      }
    }

    return true;
  });

  const CustomSelect = ({ name, value, onChange, options, placeholder, className = '' }: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    className?: string;
  }) => {
    const selectedOption = options.find(option => option.value === value);
    const isOpen = openDropdown === name;

    const handleToggle = () => {
      setOpenDropdown(isOpen ? null : name);
    };

    const handleSelect = (optionValue: string) => {
      const syntheticEvent = {
        target: { name, value: optionValue }
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
      setOpenDropdown(null);
    };

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;
        if (isOpen && !target.closest(`[data-dropdown="${name}"]`)) {
          setOpenDropdown(null);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen, name]);

    return (
      <div className={`relative ${className}`} data-dropdown={name}>
        <button
          type="button"
          onClick={handleToggle}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] transition-colors duration-200 bg-white text-left flex items-center justify-between text-sm"
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-150 text-sm ${
                  option.value === value ? 'bg-[#8B1E1E] text-white hover:bg-[#a52525]' : 'text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const PropertyCard = ({ property, isListView = false }: { property: Property, isListView?: boolean }) => {
    const coverImage = property.property_images?.find(img => img.is_cover) || property.property_images?.[0];
    const location = `${property.neighborhood ? property.neighborhood + ', ' : ''}${property.city}`;
    
    return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 font-lato ${
      isListView ? 'flex' : ''
    }`}>
      {/* Image */}
      <div className={`relative ${isListView ? 'w-1/3' : ''}`}>
        <img
          src={coverImage?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={property.title}
          className={`object-cover ${isListView ? 'w-full h-full' : 'w-full h-40'}`}
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            property.operation === 'venta' 
              ? 'bg-[#8B1E1E] text-white' 
              : 'bg-[#1F5F2D] text-white'
          }`}>
            {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="text-xs">{location}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {property.description || 'Excelente propiedad disponible.'}
        </p>

        {/* Features */}
        <div className="flex items-center space-x-3 mb-3 text-gray-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center space-x-1">
              <Bed className="w-3 h-3" />
              <span className="text-xs">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center space-x-1">
              <Bath className="w-3 h-3" />
              <span className="text-xs">{property.bathrooms}</span>
            </div>
          )}
          {property.garage && (
            <div className="flex items-center space-x-1">
              <Car className="w-3 h-3" />
              <span className="text-xs">Cochera</span>
            </div>
          )}
          <div className="text-xs font-medium">{property.area ? `${property.area} m²` : ''}</div>
        </div>

        {/* Price and Button */}
        <div className={`flex items-center justify-between ${isListView ? 'mt-auto' : ''}`}>
          <div className="text-lg font-bold text-[#8B1E1E]">
            {formatPrice(property.price, property.currency || 'ARS')}
          </div>
          <Link
            to={`/propiedades/${property.id}`}
            className="bg-[#1F5F2D] text-white px-3 py-1.5 rounded hover:bg-[#2a7a3a] transition-colors duration-200 flex items-center space-x-1"
          >
            <Eye className="w-3 h-3" />
            <span className="text-xs">Ver más</span>
          </Link>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Todas las Propiedades</h1>
            <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-[#8B1E1E] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-[#8B1E1E] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            </div>
          </div>

          <div className="mt-3">
          {loading ? (
            <p className="text-sm text-gray-600">Cargando propiedades...</p>
          ) : (
            <p className="text-sm text-gray-600">
              Encontramos {filteredProperties.length} de {properties.length} propiedades disponibles
            </p>
          )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filters Section */}
        <div className="space-y-2 mb-4">

          {/* Advanced Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative z-20">
            {/* Header de Filtros */}
            <div className="bg-[#8B1E1E] text-white px-4 py-2 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros Avanzados
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={clearFilters}
                    className="text-white/80 hover:text-white flex items-center space-x-1 text-xs transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                    <span>Limpiar</span>
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-1 bg-white/20 text-white px-2 py-1 rounded text-xs hover:bg-white/30 transition-colors duration-200"
                  >
                    <Filter className="w-3 h-3" />
                    <span>{showFilters ? 'Ocultar' : 'Mostrar'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contenido de Filtros */}
            {showFilters && (
              <div className="p-3 relative z-10">
                {/* Primera fila de filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-3 relative">
                  {/* Tipo de Propiedad */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <CustomSelect
                      name="propertyType"
                      value={filters.propertyType}
                      onChange={handleFilterChange}
                      options={[
                        { value: "", label: "Todos" },
                        { value: "casa", label: "Casa" },
                        { value: "departamento", label: "Departamento" },
                        { value: "terreno", label: "Terreno" },
                        { value: "local", label: "Local" },
                        { value: "quinta", label: "Quinta" }
                      ]}
                      placeholder="Todos"
                    />
                  </div>

                  {/* Operación */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Operación
                    </label>
                    <CustomSelect
                      name="operation"
                      value={filters.operation}
                      onChange={handleFilterChange}
                      options={[
                        { value: "", label: "Todas" },
                        { value: "venta", label: "Venta" },
                        { value: "alquiler", label: "Alquiler" }
                      ]}
                      placeholder="Todas"
                    />
                  </div>

                  {/* Zona */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Zona
                    </label>
                    <CustomSelect
                      name="neighborhood"
                      value={filters.neighborhood}
                      onChange={handleFilterChange}
                      options={[
                        { value: "", label: "Todas las zonas" },
                        ...zones.map(zone => ({
                          value: zone.name.toLowerCase(),
                          label: zone.name
                        }))
                      ]}
                      placeholder="Todas las zonas"
                    />
                  </div>

                  {/* Dormitorios */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Dormitorios
                    </label>
                    <CustomSelect
                      name="bedrooms"
                      value={filters.bedrooms}
                      onChange={handleFilterChange}
                      options={[
                        { value: "", label: "Cualquiera" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4+", label: "4+" }
                      ]}
                      placeholder="Cualquiera"
                    />
                  </div>
                </div>

                {/* Segunda fila de filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Rango de Precio */}
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Rango de Precio
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Precio mínimo"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] transition-colors duration-200"
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Precio máximo"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Características Dinámicas */}
                  <div className="md:col-span-2 bg-gray-50 p-2 rounded border border-gray-200">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Características
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                      {/* Características dinámicas desde la configuración */}
                      {features.map(feature => (
                        <label key={feature.id} className="flex items-center cursor-pointer hover:bg-white p-1 rounded transition-colors duration-200">
                          <input 
                            type="checkbox" 
                            name={`feature_${feature.code}`}
                            checked={filters[`feature_${feature.code}` as keyof typeof filters] as boolean || false}
                            onChange={handleFilterChange}
                            className="w-3 h-3 rounded border-gray-300 text-[#8B1E1E] focus:ring-[#8B1E1E] mr-1.5" 
                          />
                          <span className="text-xs text-gray-700">{feature.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Bar - Always Visible Below Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Buscar por dirección, código o título..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] transition-colors duration-200 text-sm"
                />
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {filteredProperties.length} propiedades
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B1E1E] mx-auto mb-2"></div>
            <p className="text-gray-600">Cargando propiedades...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Home className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron propiedades</h3>
            <p className="text-gray-600 mb-4">
              No hay propiedades que coincidan con los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#8B1E1E] text-white px-4 py-2 rounded hover:bg-[#a52525] transition-colors duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
              : 'space-y-4'
          }`}>
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isListView={viewMode === 'list'} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;