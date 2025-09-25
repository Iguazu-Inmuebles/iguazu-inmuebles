import React, { useState, useEffect } from 'react';
import { supabase, Property } from '../lib/supabase';
import { Pencil, Trash2, Plus, X, Eye, Settings, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AdminLogin from '../components/AdminLogin';

interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  alt_text?: string;
  order_index: number;
  is_cover: boolean;
}

interface PropertyZone {
  id: string;
  name: string;
  code: string;
  city: string;
  province: string;
  is_active: boolean;
}

interface PropertyType {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
}

interface PropertyFeature {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
}

interface FormData {
  title: string;
  property_code: string;
  description: string;
  price: string;
  operation: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  lot_area: string;
  address: string;
  neighborhood: string;
  city: string;
  province: string;
  garage: boolean;
  pool: boolean;
  garden: boolean;
  furnished: boolean;
  pets_allowed: boolean;
  credit_eligible: boolean;
  featured: boolean;
  status: string;
  currency: string;
  google_maps_link: string;
  imageUrls: string[];
  selectedFeatures?: string[];
  expenses?: string;
  age?: number;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [zones, setZones] = useState<PropertyZone[]>([]);
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [features, setFeatures] = useState<PropertyFeature[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    property_code: '',
    description: '',
    price: '',
    operation: 'venta',
    property_type: 'casa',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    lot_area: '',
    address: '',
    neighborhood: '',
    city: '',
    province: '',
    garage: false,
    pool: false,
    garden: false,
    furnished: false,
    pets_allowed: false,
    credit_eligible: false,
    featured: false,
    status: 'available',
    currency: 'ARS',
    google_maps_link: '',
    imageUrls: [''],
    selectedFeatures: [],
    expenses: '',
    age: 0
  });

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  // Datos de ubicación
  const provinces = [
    { code: 'misiones', name: 'Misiones' },
    { code: 'corrientes', name: 'Corrientes' },
    { code: 'entre-rios', name: 'Entre Ríos' }
  ];

  const cities = {
    'misiones': [
      { code: 'posadas', name: 'Posadas' },
      { code: 'obera', name: 'Oberá' },
      { code: 'eldorado', name: 'Eldorado' },
      { code: 'puerto-iguazu', name: 'Puerto Iguazú' },
      { code: 'apostoles', name: 'Apóstoles' }
    ],
    'corrientes': [
      { code: 'corrientes', name: 'Corrientes' },
      { code: 'goya', name: 'Goya' },
      { code: 'mercedes', name: 'Mercedes' },
      { code: 'paso-de-los-libres', name: 'Paso de los Libres' }
    ],
    'entre-rios': [
      { code: 'parana', name: 'Paraná' },
      { code: 'concordia', name: 'Concordia' },
      { code: 'gualeguaychu', name: 'Gualeguaychú' },
      { code: 'concepcion-del-uruguay', name: 'Concepción del Uruguay' }
    ]
  };

  // Filtrar zonas según provincia y ciudad seleccionadas
  const getFilteredZones = () => {
    return zones.filter(zone => 
      zone.is_active && 
      zone.province.toLowerCase() === formData.province.toLowerCase() &&
      zone.city.toLowerCase() === formData.city.toLowerCase()
    );
  };

  // Formatear precio según moneda
  const formatPrice = (value: string, currency: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';

    const number = parseInt(numericValue);
    
    if (currency === 'USD') {
      return number.toLocaleString('en-US');
    } else {
      return number.toLocaleString('es-AR');
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPrice(value, formData.currency);
    setFormData({ ...formData, price: formatted });
  };

  const getCurrencySymbol = (currency: string) => {
    return currency === 'USD' ? 'US$' : '$';
  };

  useEffect(() => {
    fetchProperties();
    fetchZones();
    fetchTypes();
    fetchFeatures();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images!property_images_property_id_fkey (
            id,
            image_url,
            alt_text,
            order_index,
            is_cover
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error al cargar las propiedades');
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

  const fetchTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('property_types')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setTypes(data || []);
    } catch (error) {
      console.error('Error fetching types:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.property_code || !formData.description || !formData.price || !formData.address) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    try {
      setLoading(true);

      // Convertir precio a número
      const numericPrice = parseFloat(formData.price.replace(/[^\d]/g, ''));

      const propertyData = {
        title: formData.title,
        property_code: formData.property_code,
        description: formData.description,
        price: numericPrice,
        operation: formData.operation,
        property_type: formData.property_type,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area ? parseFloat(formData.area) : null,
        lot_area: formData.lot_area ? parseFloat(formData.lot_area) : null,
        address: formData.address,
        neighborhood: formData.neighborhood,
        city: formData.city,
        province: formData.province,
        garage: formData.garage,
        pool: formData.pool,
        garden: formData.garden,
        furnished: formData.furnished,
        pets_allowed: formData.pets_allowed,
        credit_eligible: formData.credit_eligible,
        featured: formData.featured,
        status: formData.status,
        currency: formData.currency,
        google_maps_link: formData.google_maps_link || null,
        expenses: formData.expenses || null,
        age: formData.age || null,
        updated_at: new Date().toISOString()
      };

      let propertyId: string;

      if (editingProperty) {
        // Actualizar propiedad existente
        const { error: updateError } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);

        if (updateError) throw updateError;
        propertyId = editingProperty.id;

        // Limpiar cover_image_id antes de eliminar imágenes
        await supabase
          .from('properties')
          .update({ cover_image_id: null })
          .eq('id', propertyId);

        // Eliminar imágenes existentes
        const { error: deleteImagesError } = await supabase
          .from('property_images')
          .delete()
          .eq('property_id', propertyId);

        if (deleteImagesError) throw deleteImagesError;

        toast.success('La propiedad se ha actualizado correctamente');
      } else {
        // Crear nueva propiedad
        const { data: newProperty, error: insertError } = await supabase
          .from('properties')
          .insert(propertyData)
          .select()
          .single();

        if (insertError) throw insertError;
        propertyId = newProperty.id;

        toast.success('La propiedad se ha creado correctamente');
      }

      // Guardar URLs de imágenes
      const validUrls = formData.imageUrls.filter(url => url.trim() !== '');
      if (validUrls.length > 0) {
        const imageData = validUrls.map((url, index) => ({
          property_id: propertyId,
          image_url: url.trim(),
          alt_text: formData.title,
          order_index: index,
          is_cover: index === 0
        }));

        const { data: insertedImages, error: imagesError } = await supabase
          .from('property_images')
          .insert(imageData)
          .select();

        if (imagesError) throw imagesError;

        // Establecer la primera imagen como cover
        if (insertedImages && insertedImages.length > 0) {
          await supabase
            .from('properties')
            .update({ cover_image_id: insertedImages[0].id })
            .eq('id', propertyId);
        }
      }

      await fetchProperties();
      resetForm();
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Error al guardar la propiedad');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    
    // Extraer URLs de imágenes existentes
    const existingUrls = property.property_images?.map(img => img.image_url) || [''];
    
    setFormData({
      title: property.title,
      property_code: property.property_code || '',
      description: property.description || '',
      price: property.price.toString(),
      operation: property.operation,
      property_type: property.property_type,
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      area: property.area?.toString() || '',
      lot_area: property.lot_area?.toString() || '',
      address: property.address,
      neighborhood: property.neighborhood || '',
      city: property.city || '',
      province: property.province || '',
      garage: property.garage || false,
      pool: property.pool || false,
      garden: property.garden || false,
      furnished: property.furnished || false,
      pets_allowed: property.pets_allowed || false,
      credit_eligible: property.credit_eligible || false,
      featured: property.featured || false,
      status: property.status || 'available',
      currency: property.currency || 'ARS',
      google_maps_link: property.google_maps_link || '',
      imageUrls: existingUrls.length > 0 ? existingUrls : [''],
      selectedFeatures: [],
      expenses: (property as any).expenses || '',
      age: (property as any).age || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta propiedad?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('La propiedad se ha eliminado correctamente');

      await fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Error al eliminar la propiedad');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      property_code: '',
      description: '',
      price: '',
      operation: 'venta',
      property_type: 'casa',
      bedrooms: 0,
      bathrooms: 0,
      area: '',
      lot_area: '',
      address: '',
      neighborhood: '',
      city: '',
      province: '',
      garage: false,
      pool: false,
      garden: false,
      furnished: false,
      pets_allowed: false,
      credit_eligible: false,
      featured: false,
      status: 'available',
      currency: 'ARS',
      google_maps_link: '',
      imageUrls: [''],
      selectedFeatures: [],
      expenses: '',
      age: 0
    });
    setEditingProperty(null);
    setShowForm(false);
  };

  const addImageUrl = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  };

  const removeImageUrl = (index: number) => {
    const newUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, imageUrls: newUrls.length > 0 ? newUrls : [''] });
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...formData.imageUrls];
    newUrls[index] = value;
    setFormData({ ...formData, imageUrls: newUrls });
  };

  // Mostrar pantalla de carga mientras verifica autenticación
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B1E1E]"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar pantalla de login si no está autenticado
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const formatPriceDisplay = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('es-AR');
    const symbol = currency === 'USD' ? 'US$' : '$';
    return `${symbol} ${formatter.format(price)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B1E1E]"></div>
          <p className="mt-4 text-gray-600">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Propiedades</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
            <Link
              to="/admin/config"
              className="bg-[#1F5F2D] text-white px-6 py-3 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200 flex items-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </Link>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#8B1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Propiedad</span>
            </button>
          </div>
        </div>

        {/* Lista de Propiedades en formato tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propiedad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => {
                  const coverImage = property.property_images?.find(img => img.is_cover) || property.property_images?.[0];
                  return (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={coverImage?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=200'}
                              alt={property.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            {property.property_code && (
                              <div className="text-xs text-gray-500 font-mono">
                                Código: {property.property_code}
                              </div>
                            )}
                            <div className="text-sm text-gray-500">
                              {property.bedrooms > 0 && `${property.bedrooms} dorm`}
                              {property.bathrooms > 0 && ` • ${property.bathrooms} baños`}
                              {property.area && ` • ${property.area} m²`}
                            </div>
                            {property.featured && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Destacada
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {property.neighborhood && `${property.neighborhood}, `}{property.city}
                        </div>
                        <div className="text-sm text-gray-500">{property.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPriceDisplay(property.price, property.currency || 'ARS')}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">{property.operation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{property.property_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === 'available' ? 'bg-green-100 text-green-800' :
                          property.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status === 'available' ? 'Disponible' :
                           property.status === 'sold' ? 'Vendida' : 'Alquilada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/propiedades/${property.id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Ver propiedad"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleEdit(property)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {properties.length === 0 && (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay propiedades</h3>
              <p className="text-gray-600">Comienza agregando tu primera propiedad.</p>
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col">
              {/* Header fijo */}
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Contenido scrolleable */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información básica */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código de Propiedad *
                      </label>
                      <input
                        type="text"
                        value={formData.property_code}
                        onChange={(e) => setFormData({ ...formData, property_code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        placeholder="ej: IG-001, CASA-2024-01"
                        required
                      />
                    </div>
                  </div>

                  {/* Operación */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Operación *
                      </label>
                      <select
                        value={formData.operation}
                        onChange={(e) => setFormData({ ...formData, operation: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        required
                      >
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                      </select>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                      placeholder="Describe las características principales de la propiedad..."
                      required
                    />
                  </div>

                  {/* Precio y Tipo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            {getCurrencySymbol(formData.currency)}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={handlePriceChange}
                          className="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="0"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <select
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md focus:ring-2 focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                          >
                            <option value="ARS">ARS</option>
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Propiedad *
                      </label>
                      <select
                        value={formData.property_type}
                        onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        required
                      >
                        <option value="">Seleccionar tipo</option>
                        {types.map(type => (
                          <option key={type.id} value={type.code}>
                            {type.name}
                          </option>
                        ))}
                        {/* Fallback options if no types are configured */}
                        {types.length === 0 && (
                          <>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="terreno">Terreno</option>
                            <option value="local">Local</option>
                            <option value="quinta">Quinta</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Ubicación jerárquica */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia *
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => {
                          setFormData({ 
                            ...formData, 
                            province: e.target.value,
                            city: '',
                            neighborhood: ''
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        required
                      >
                        <option value="">Seleccionar provincia</option>
                        {provinces.map(province => (
                          <option key={province.code} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ 
                            ...formData, 
                            city: e.target.value,
                            neighborhood: ''
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        disabled={!formData.province}
                        required
                      >
                        <option value="">Seleccionar ciudad</option>
                        {formData.province && cities[provinces.find(p => p.name === formData.province)?.code as keyof typeof cities]?.map(city => (
                          <option key={city.code} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Barrio
                      </label>
                      <select
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        disabled={!formData.city}
                      >
                        <option value="">Seleccionar barrio</option>
                        {getFilteredZones().map(zone => (
                          <option key={zone.id} value={zone.name}>
                            {zone.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dirección */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                      placeholder="Calle y número"
                      required
                    />
                  </div>

                  {/* Link de Google Maps */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link de Google Maps
                    </label>
                    <input
                      type="url"
                      value={formData.google_maps_link}
                      onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                      placeholder="https://maps.google.com/..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Opcional: Enlace directo a Google Maps para mostrar el botón "Ver en Google Maps"
                    </p>
                  </div>

                  {/* Características numéricas */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dormitorios
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Baños
                      </label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Antigüedad (años)
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        min="0"
                        placeholder="Ej: 5"
                      />
                    </div>
                  </div>

                  {/* Áreas y Expensas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Área (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Terreno (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.lot_area}
                        onChange={(e) => setFormData({ ...formData, lot_area: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expensas
                      </label>
                      <input
                        type="text"
                        value={formData.expenses}
                        onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        placeholder="Ej: $50,000 o No aplica"
                      />
                    </div>
                  </div>

                  {/* URLs de Imágenes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URLs de Imágenes
                    </label>
                    <div className="space-y-3">
                      {formData.imageUrls.map((url, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => updateImageUrl(index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                            placeholder="https://ejemplo.com/imagen.jpg"
                          />
                          {formData.imageUrls.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageUrl(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="flex items-center space-x-2 text-[#8B1E1E] hover:text-[#a52525] transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar otra imagen</span>
                      </button>
                    </div>
                  </div>

                  {/* Características booleanas */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { key: 'pets_allowed', label: 'Mascotas' },
                      { key: 'credit_eligible', label: 'Apto Crédito' },
                      { key: 'featured', label: 'Destacado' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={key}
                          checked={formData[key as keyof FormData] as boolean}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                          className="h-4 w-4 text-[#8B1E1E] focus:ring-[#8B1E1E] border-gray-300 rounded"
                        />
                        <label htmlFor={key} className="ml-2 block text-sm text-gray-900">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Características adicionales configurables */}
                  {features.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Características Adicionales
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {features.map((feature) => (
                          <div key={feature.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`feature-${feature.id}`}
                              checked={formData.selectedFeatures?.includes(feature.id) || false}
                              onChange={(e) => {
                                const currentFeatures = formData.selectedFeatures || [];
                                const updatedFeatures = e.target.checked
                                  ? [...currentFeatures, feature.id]
                                  : currentFeatures.filter(id => id !== feature.id);
                                setFormData({ ...formData, selectedFeatures: updatedFeatures });
                              }}
                              className="h-4 w-4 text-[#8B1E1E] focus:ring-[#8B1E1E] border-gray-300 rounded"
                            />
                            <label htmlFor={`feature-${feature.id}`} className="ml-2 block text-sm text-gray-900">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                    >
                      <option value="available">Disponible</option>
                      <option value="sold">Vendida</option>
                      <option value="rented">Alquilada</option>
                    </select>
                  </div>
                </form>
              </div>
              
              {/* Footer fijo */}
              <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-[#8B1E1E] text-white rounded-lg hover:bg-[#a52525] transition-colors duration-200"
                >
                  {editingProperty ? 'Actualizar' : 'Crear'} Propiedad
                </button>
              </div>
            </div>
          </div>
        )}

        {/* React Hot Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Admin;