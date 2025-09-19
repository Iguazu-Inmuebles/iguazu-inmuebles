import React, { useState } from 'react';
import { Calculator, CheckCircle, Home, MapPin, Phone, MessageCircle, Clock, Award } from 'lucide-react';

const Valuations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    address: '',
    neighborhood: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    garage: false,
    pool: false,
    garden: false,
    age: '',
    condition: '',
    urgency: '',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Valuation request submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        address: '',
        neighborhood: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        garage: false,
        pool: false,
        garden: false,
        age: '',
        condition: '',
        urgency: '',
        comments: ''
      });
    }, 3000);
  };

  const benefits = [
    {
      icon: Award,
      title: "Tasación Profesional",
      description: "Realizada por profesionales matriculados con amplia experiencia en el mercado local"
    },
    {
      icon: Clock,
      title: "Respuesta Rápida",
      description: "Recibe tu tasación en un plazo máximo de 48 horas hábiles"
    },
    {
      icon: Home,
      title: "Análisis Completo",
      description: "Evaluamos todos los aspectos: ubicación, estado, mercado y características únicas"
    },
    {
      icon: CheckCircle,
      title: "Sin Compromiso",
      description: "Tasación gratuita y sin obligación de contratar nuestros servicios"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Completa el formulario",
      description: "Proporciona la información básica de tu propiedad"
    },
    {
      step: "2",
      title: "Análisis de mercado",
      description: "Nuestros expertos analizan propiedades similares en la zona"
    },
    {
      step: "3",
      title: "Visita técnica",
      description: "Coordinamos una visita para evaluar el estado y características"
    },
    {
      step: "4",
      title: "Informe de tasación",
      description: "Recibes un informe detallado con el valor de mercado"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8B1E1E] to-[#a52525] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Calculator className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tasación de Propiedades
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Conoce el valor real de tu propiedad con nuestra tasación profesional gratuita
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ¿Por qué solicitar una tasación con nosotros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <benefit.icon className="w-12 h-12 text-[#8B1E1E] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Valuation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Tasación Gratuita</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Solicitud enviada!</h3>
                  <p className="text-gray-600">
                    Hemos recibido tu solicitud de tasación. Nos pondremos en contacto contigo dentro de las próximas 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="(0376) 4-123456"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Propiedad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de propiedad *
                        </label>
                        <select
                          name="propertyType"
                          required
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Selecciona el tipo</option>
                          <option value="casa">Casa</option>
                          <option value="departamento">Departamento</option>
                          <option value="terreno">Terreno</option>
                          <option value="local">Local comercial</option>
                          <option value="oficina">Oficina</option>
                          <option value="quinta">Quinta/Chacra</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Barrio/Zona *
                        </label>
                        <select
                          name="neighborhood"
                          required
                          value={formData.neighborhood}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Selecciona la zona</option>
                          <option value="centro">Centro</option>
                          <option value="barrio-jardin">Barrio Jardín</option>
                          <option value="villa-cabello">Villa Cabello</option>
                          <option value="san-lorenzo">San Lorenzo</option>
                          <option value="itaembe-mini">Itaembé Miní</option>
                          <option value="villa-urquiza">Villa Urquiza</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="Dirección completa"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de la Propiedad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Superficie (m²) *
                        </label>
                        <input
                          type="number"
                          name="area"
                          required
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="120"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dormitorios
                        </label>
                        <select
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5+">5+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Baños
                        </label>
                        <select
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Antigüedad (años)
                        </label>
                        <select
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Seleccionar</option>
                          <option value="0-5">0-5 años</option>
                          <option value="6-10">6-10 años</option>
                          <option value="11-20">11-20 años</option>
                          <option value="21-30">21-30 años</option>
                          <option value="30+">Más de 30 años</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado general
                        </label>
                        <select
                          name="condition"
                          value={formData.condition}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Seleccionar</option>
                          <option value="excelente">Excelente</option>
                          <option value="muy-bueno">Muy bueno</option>
                          <option value="bueno">Bueno</option>
                          <option value="regular">Regular</option>
                          <option value="refaccionar">A refaccionar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Urgencia
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                        >
                          <option value="">Seleccionar</option>
                          <option value="inmediata">Inmediata</option>
                          <option value="1-mes">En 1 mes</option>
                          <option value="3-meses">En 3 meses</option>
                          <option value="6-meses">En 6 meses</option>
                          <option value="sin-urgencia">Sin urgencia</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Características Adicionales</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="garage"
                          checked={formData.garage}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-[#8B1E1E] focus:ring-[#8B1E1E]"
                        />
                        <span className="text-sm text-gray-700">Cochera</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="pool"
                          checked={formData.pool}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-[#8B1E1E] focus:ring-[#8B1E1E]"
                        />
                        <span className="text-sm text-gray-700">Piscina</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="garden"
                          checked={formData.garden}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-[#8B1E1E] focus:ring-[#8B1E1E]"
                        />
                        <span className="text-sm text-gray-700">Jardín</span>
                      </label>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comentarios adicionales
                    </label>
                    <textarea
                      name="comments"
                      rows={4}
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent resize-none"
                      placeholder="Cualquier información adicional que consideres relevante..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#8B1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>Solicitar Tasación Gratuita</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 mb-4">
                Nuestro equipo está disponible para ayudarte con cualquier consulta sobre la tasación.
              </p>
              
              <div className="space-y-3">
                <a
                  href="tel:+543764123456"
                  className="w-full flex items-center justify-center space-x-2 bg-[#1F5F2D] text-white px-4 py-3 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>Llamar Ahora</span>
                </a>
                <a
                  href="https://wa.me/543764123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#20b858] transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proceso de Tasación</h3>
              <div className="space-y-4">
                {process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#8B1E1E] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valuations;