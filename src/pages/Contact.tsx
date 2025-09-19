import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram,
  Send,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      details: "(3757) 501460",
      action: "tel:+543757501460",
      color: "text-[#1F5F2D]"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+54 3757-501460",
      action: "https://wa.me/543757501460",
      color: "text-[#25D366]"
    },
    {
      icon: Mail,
      title: "Email",
      details: "inmobiliaria@iguazuinmuebles.com",
      action: "mailto:inmobiliaria@iguazuinmuebles.com",
      color: "text-[#8B1E1E]"
    },
    {
      icon: MapPin,
      title: "Dirección",
      details: "Julio Silveira 103, Puerto Iguazú, Misiones",
      action: "#",
      color: "text-[#FFD700]"
    }
  ];

  const businessHours = [
    { day: "Lunes a Viernes", hours: "9:00 - 18:00" },
    { day: "Sábados", hours: "9:00 - 13:00" },
    { day: "Domingos", hours: "Cerrado" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8B1E1E] to-[#a52525] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactanos
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar tu hogar ideal. ¡Hablemos!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
              
              <form 
                action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK000006UN3l" 
                method="POST" 
                className="space-y-6"
              >
                <input type="hidden" name="oid" value="00DgK000006UN3l" />
                <input type="hidden" name="retURL" value="https://beautiful-beignet-dc32c2.netlify.app" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      maxLength={40}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      maxLength={80}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    maxLength={80}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    maxLength={40}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
                    placeholder="(3757) 501460"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  name="submit"
                  className="w-full bg-[#8B1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            </div>
            {/* Map Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestra Ubicación</h2>
            
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2 text-[#8B1E1E]" />
                <span className="font-medium">Julio Silveira 103 N 3370, Puerto Iguazú, Misiones</span>
              </div>
              <p className="text-sm text-gray-500">
                Estamos ubicados en el corazón de Puerto Iguazú, cerca de las principales atracciones turísticas.
              </p>
              <div className="mt-4">
                <a
                  href="https://maps.app.goo.gl/kenK3ed43tnCCwUz7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#8B1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#a52525] transition-colors duration-200"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Ver en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
          </div>
          

          {/* Contact Information */}
          <div className="lg:col-span-1">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.action}
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <info.icon className={`w-6 h-6 ${info.color} mt-1`} />
                    <div>
                      <div className="font-medium text-gray-900">{info.title}</div>
                      <div className="text-gray-600 text-sm">{info.details}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-[#8B1E1E] mr-2" />
                Horarios de Atención
              </h3>
              
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contacto Directo</h3>
              
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

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Síguenos</h3>
              
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors duration-200"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
        </div>

        
      </div>
    </div>
  );
};

export default Contact;