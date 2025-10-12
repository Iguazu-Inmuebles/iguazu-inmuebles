import React, { useState } from 'react';
import { Calculator, CheckCircle, Home, MapPin, Phone, MessageCircle, Clock, Award, AlarmCheck, HandHelping } from 'lucide-react';

const Valuations = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      icon: HandHelping,
      title: "Coordinación de Visita",
      description: "Coordinamos una visita para evaluar la propiedad y discutir los detalles"
    },
    {
      icon: Home,
      title: "Análisis Completo",
      description: "Evaluamos todos los aspectos: ubicación, estado, mercado y características únicas"
    },
    {
      icon: CheckCircle,
      title: "Sin Compromiso",
      description: "Tasación sin obligación de contratar nuestros servicios"
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
              Tasación de Propiedades en Puerto Iguazú
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Conoce el valor real de tu propiedad con nuestra tasación profesional 
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Tasación </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Solicitud enviada!</h3>
                  <p className="text-gray-600">
                    Hemos recibido tu solicitud de tasación. Nos pondremos en contacto contigo dentro de las próximas 24 horas.
                  </p>
                </div>
              ) : (
                <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK000006UN3l" method="POST" className="space-y-6">
                  <input type="hidden" name="oid" value="00DgK000006UN3l" />
                  <input type="hidden" name="retURL" value="https://iguazuinmuebles.com" />
                  <input type="hidden" name="lead_source" value="Web" />
                  <input type="hidden" name="company" value="Web Tasaciónes" />
                  <input type="hidden" name="00NgK00001tNhdy" value="0" />
                  <input type="hidden" name="00NgK00001tQepd" value="1" />
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apellido *
                        </label>
                        <input
                           type="text"
                           name="last_name"
                           required
                           value={formData.last_name}
                           onChange={handleInputChange}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                           placeholder="Tu apellido"
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
                      <div>
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
                          placeholder="(3757) 501460"
                        />
                      </div>
                    </div>
                  </div>



                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comentarios adicionales
                    </label>
                    <textarea
                      name="description"
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
                    <span>Solicitar Tasación </span>
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
                  href="tel:+543757501460"
                  className="w-full flex items-center justify-center space-x-2 bg-[#1F5F2D] text-white px-4 py-3 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>Llamar Ahora</span>
                </a>
                <a
                  href="https://wa.me/543757501460"
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