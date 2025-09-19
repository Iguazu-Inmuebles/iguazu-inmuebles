import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Pencil, Trash2, Plus, X, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AdminLogin from '../components/AdminLogin';

interface PropertyZone {
  id: string;
  name: string;
  code: string;
  city: string;
  province: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PropertyType {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PropertyFeature {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminConfig = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<'zones' | 'types' | 'features'>('zones');
  const [zones, setZones] = useState<PropertyZone[]>([]);
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [features, setFeatures] = useState<PropertyFeature[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [showFeatureForm, setShowFeatureForm] = useState(false);
  
  const [editingZone, setEditingZone] = useState<PropertyZone | null>(null);
  const [editingType, setEditingType] = useState<PropertyType | null>(null);
  const [editingFeature, setEditingFeature] = useState<PropertyFeature | null>(null);

  const [zoneForm, setZoneForm] = useState({
    name: '',
    code: '',
    city: 'Iguazú',
    province: 'Misiones',
    is_active: true
  });

  const [typeForm, setTypeForm] = useState({
    name: '',
    code: '',
    description: '',
    is_active: true
  });

  const [featureForm, setFeatureForm] = useState({
    name: '',
    code: '',
    description: '',
    is_active: true
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchZones(),
        fetchTypes(),
        fetchFeatures()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar los datos de configuración');
    } finally {
      setLoading(false);
    }
  };

  const fetchZones = async () => {
    const { data, error } = await supabase
      .from('property_zones')
      .select('*')
      .order('name');

    if (error) throw error;
    setZones(data || []);
  };

  const fetchTypes = async () => {
    const { data, error } = await supabase
      .from('property_types')
      .select('*')
      .order('name');

    if (error) throw error;
    setTypes(data || []);
  };

  const fetchFeatures = async () => {
    const { data, error } = await supabase
      .from('property_features')
      .select('*')
      .order('name');

    if (error) throw error;
    setFeatures(data || []);
  };

  // Zone handlers
  const handleZoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingZone) {
        const { error } = await supabase
          .from('property_zones')
          .update({
            ...zoneForm,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingZone.id);

        if (error) throw error;
        
        toast.success('La zona se ha actualizado correctamente');
      } else {
        const { error } = await supabase
          .from('property_zones')
          .insert(zoneForm);

        if (error) throw error;
        
        toast.success('La zona se ha creado correctamente');
      }

      await fetchZones();
      resetZoneForm();
    } catch (error) {
      console.error('Error saving zone:', error);
      toast.error('Error al guardar la zona');
    }
  };

  const handleEditZone = (zone: PropertyZone) => {
    setEditingZone(zone);
    setZoneForm({
      name: zone.name,
      code: zone.code,
      city: zone.city,
      province: zone.province,
      is_active: zone.is_active
    });
    setShowZoneForm(true);
  };

  const handleDeleteZone = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta zona?')) return;

    try {
      const { error } = await supabase
        .from('property_zones')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('La zona se ha eliminado correctamente');

      await fetchZones();
    } catch (error) {
      console.error('Error deleting zone:', error);
      toast.error('Error al eliminar la zona');
    }
  };

  const resetZoneForm = () => {
    setZoneForm({
      name: '',
      code: '',
      city: 'Iguazú',
      province: 'Misiones',
      is_active: true
    });
    setEditingZone(null);
    setShowZoneForm(false);
  };

  // Type handlers
  const handleTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingType) {
        const { error } = await supabase
          .from('property_types')
          .update({
            ...typeForm,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingType.id);

        if (error) throw error;
        
        toast.success('El tipo de propiedad se ha actualizado correctamente');
      } else {
        const { error } = await supabase
          .from('property_types')
          .insert(typeForm);

        if (error) throw error;
        
        toast.success('El tipo de propiedad se ha creado correctamente');
      }

      await fetchTypes();
      resetTypeForm();
    } catch (error) {
      console.error('Error saving type:', error);
      toast.error('Error al guardar el tipo de propiedad');
    }
  };

  const handleEditType = (type: PropertyType) => {
    setEditingType(type);
    setTypeForm({
      name: type.name,
      code: type.code,
      description: type.description || '',
      is_active: type.is_active
    });
    setShowTypeForm(true);
  };

  const handleDeleteType = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este tipo?')) return;

    try {
      const { error } = await supabase
        .from('property_types')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('El tipo de propiedad se ha eliminado correctamente');

      await fetchTypes();
    } catch (error) {
      console.error('Error deleting type:', error);
      toast.error('Error al eliminar el tipo de propiedad');
    }
  };

  const resetTypeForm = () => {
    setTypeForm({
      name: '',
      code: '',
      description: '',
      is_active: true
    });
    setEditingType(null);
    setShowTypeForm(false);
  };

  // Feature handlers
  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingFeature) {
        const { error } = await supabase
          .from('property_features')
          .update({
            ...featureForm,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFeature.id);

        if (error) throw error;
        
        toast.success('La característica se ha actualizado correctamente');
      } else {
        const { error } = await supabase
          .from('property_features')
          .insert(featureForm);

        if (error) throw error;
        
        toast.success('La característica se ha creado correctamente');
      }

      await fetchFeatures();
      resetFeatureForm();
    } catch (error) {
      console.error('Error saving feature:', error);
      toast.error('Error al guardar la característica');
    }
  };

  const handleEditFeature = (feature: PropertyFeature) => {
    setEditingFeature(feature);
    setFeatureForm({
      name: feature.name,
      code: feature.code,
      description: feature.description || '',
      is_active: feature.is_active
    });
    setShowFeatureForm(true);
  };

  const handleDeleteFeature = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta característica?')) return;

    try {
      const { error } = await supabase
        .from('property_features')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('La característica se ha eliminado correctamente');

      await fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
      toast.error('Error al eliminar la característica');
    }
  };

  const resetFeatureForm = () => {
    setFeatureForm({
      name: '',
      code: '',
      description: '',
      is_active: true
    });
    setEditingFeature(null);
    setShowFeatureForm(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B1E1E]"></div>
          <p className="mt-4 text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="flex items-center space-x-2 text-gray-600 hover:text-[#8B1E1E] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Panel</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'zones', label: 'Zonas' },
              { key: 'types', label: 'Tipos de Propiedad' },
              { key: 'features', label: 'Características' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-[#8B1E1E] text-[#8B1E1E]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Zones Tab */}
        {activeTab === 'zones' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Zonas</h2>
              <button
                onClick={() => setShowZoneForm(true)}
                className="bg-[#8B1E1E] text-white px-4 py-2 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Zona</span>
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {zones.map((zone) => (
                  <li key={zone.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{zone.name}</h3>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            zone.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {zone.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Código: {zone.code} | {zone.city}, {zone.province}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditZone(zone)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteZone(zone.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Types Tab */}
        {activeTab === 'types' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Tipos de Propiedad</h2>
              <button
                onClick={() => setShowTypeForm(true)}
                className="bg-[#8B1E1E] text-white px-4 py-2 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Tipo</span>
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {types.map((type) => (
                  <li key={type.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            type.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {type.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Código: {type.code}
                          {type.description && ` | ${type.description}`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditType(type)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteType(type.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Características</h2>
              <button
                onClick={() => setShowFeatureForm(true)}
                className="bg-[#8B1E1E] text-white px-4 py-2 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Característica</span>
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {features.map((feature) => (
                  <li key={feature.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            feature.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {feature.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Código: {feature.code}
                          {feature.description && ` | ${feature.description}`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditFeature(feature)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFeature(feature.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Zone Form Modal */}
        {showZoneForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingZone ? 'Editar Zona' : 'Nueva Zona'}
                </h3>
                <button
                  onClick={resetZoneForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleZoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={zoneForm.name}
                    onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código *
                  </label>
                  <input
                    type="text"
                    value={zoneForm.code}
                    onChange={(e) => setZoneForm({ ...zoneForm, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provincia
                    </label>
                    <select
                      value={zoneForm.province}
                      onChange={(e) => setZoneForm({ ...zoneForm, province: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    >
                      <option value="Misiones">Misiones</option>
                      <option value="Corrientes">Corrientes</option>
                      <option value="Entre Ríos">Entre Ríos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={zoneForm.city}
                      onChange={(e) => setZoneForm({ ...zoneForm, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="zone-active"
                    checked={zoneForm.is_active}
                    onChange={(e) => setZoneForm({ ...zoneForm, is_active: e.target.checked })}
                    className="h-4 w-4 text-[#8B1E1E] focus:ring-[#8B1E1E] border-gray-300 rounded"
                  />
                  <label htmlFor="zone-active" className="ml-2 block text-sm text-gray-900">
                    Activo
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetZoneForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8B1E1E] text-white rounded-md hover:bg-[#a52525]"
                  >
                    {editingZone ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Type Form Modal */}
        {showTypeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingType ? 'Editar Tipo' : 'Nuevo Tipo'}
                </h3>
                <button
                  onClick={resetTypeForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleTypeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={typeForm.name}
                    onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código *
                  </label>
                  <input
                    type="text"
                    value={typeForm.code}
                    onChange={(e) => setTypeForm({ ...typeForm, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={typeForm.description}
                    onChange={(e) => setTypeForm({ ...typeForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    rows={3}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="type-active"
                    checked={typeForm.is_active}
                    onChange={(e) => setTypeForm({ ...typeForm, is_active: e.target.checked })}
                    className="h-4 w-4 text-[#8B1E1E] focus:ring-[#8B1E1E] border-gray-300 rounded"
                  />
                  <label htmlFor="type-active" className="ml-2 block text-sm text-gray-900">
                    Activo
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetTypeForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8B1E1E] text-white rounded-md hover:bg-[#a52525]"
                  >
                    {editingType ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Feature Form Modal */}
        {showFeatureForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingFeature ? 'Editar Característica' : 'Nueva Característica'}
                </h3>
                <button
                  onClick={resetFeatureForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleFeatureSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={featureForm.name}
                    onChange={(e) => setFeatureForm({ ...featureForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código *
                  </label>
                  <input
                    type="text"
                    value={featureForm.code}
                    onChange={(e) => setFeatureForm({ ...featureForm, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={featureForm.description}
                    onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B1E1E] focus:border-[#8B1E1E]"
                    rows={3}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feature-active"
                    checked={featureForm.is_active}
                    onChange={(e) => setFeatureForm({ ...featureForm, is_active: e.target.checked })}
                    className="h-4 w-4 text-[#8B1E1E] focus:ring-[#8B1E1E] border-gray-300 rounded"
                  />
                  <label htmlFor="feature-active" className="ml-2 block text-sm text-gray-900">
                    Activo
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetFeatureForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8B1E1E] text-white rounded-md hover:bg-[#a52525]"
                  >
                    {editingFeature ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
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

export default AdminConfig;