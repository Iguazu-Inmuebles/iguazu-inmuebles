import React from 'react';
import { Users, Award, Home, Heart, Shield, Clock, Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Send } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Home, number: "100+", label: "Propiedades Vendidas" },
    { icon: Users, number: "1000+", label: "Familias Satisfechas" },
    { icon: Award, number: "10+", label: "Años de Experiencia" },
    { icon: Shield, number: "100%", label: "Confianza y Seguridad" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Nos comprometemos con cada cliente para encontrar la propiedad perfecta que se adapte a sus necesidades y presupuesto."
    },
    {
      icon: Shield,
      title: "Confianza",
      description: "Construimos relaciones duraderas basadas en la transparencia, honestidad y profesionalismo en cada transacción."
    },
    {
      icon: Clock,
      title: "Experiencia",
      description: "Más de una década en el mercado inmobiliario nos respalda, conociendo cada rincón de Misiones y sus oportunidades."
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description: "Cada cliente es único, por eso ofrecemos un servicio personalizado y acompañamiento en todo el proceso de compra o venta."
    }
  ];

  const team = [
    {
      name: "Karina Vier",
      role: "Martillera Pública",
      image: "/Karina-Vier.png",
      description: "15 años de experiencia en el sector inmobiliario de Misiones."
    },
    {
      name: "Miguel Rodríguez",
      role: "Tasador",
      image: "/Miguel-Rodriguez.png",
      description: "Especialista en propiedades comerciales y residenciales de alta gama."
    },
    {
      name: "Gabriel Rodríguez",
      role: "Maestro mayor de obra",
      image: "/Gabriel-Rodriguez.png",
      description: "Técnico con formación integral para planificar, conducir y supervisar obras edilicias."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#8B1E1E] to-[#a52525]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Quiénes Somos
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Somos una inmobiliaria con raíces profundas en Puerto Iguazú. Nuestro equipo combina experiencia, profesionalismo y un trato humano para ofrecer un servicio integral que abarca compra/venta de propiedades, administración de alquileres, tasaciones e informes de valuación. Nuestra filosofía se basa en escuchar, asesorar y acompañar, brindando respuestas concretas y personalizadas para cada necesidad.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <stat.icon className="w-12 h-12 text-[#8B1E1E] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Con más de 20 años de trayectoria, hemos sido testigos y protagonistas del crecimiento de Puerto Iguazú. Desde nuestros primeros pasos, nos hemos especializado en operaciones de compra y venta, administración de alquileres, tasaciones e informes de valuación, siempre priorizando la satisfacción y la tranquilidad de nuestros clientes. Nuestra reputación en la ciudad se ha forjado gracias a la honestidad, el compromiso y la dedicación constante, que nos han permitido construir relaciones duraderas y ser un referente del sector inmobiliario local.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/iguazu.jpg"
                alt="Equipo Iguazú Inmuebles"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#8B1E1E] mb-4">Nuestra Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                Nuestra misión es brindar soluciones inmobiliarias confiables y eficientes, acompañando a cada cliente en cada etapa del proceso de compra, venta, administración o tasación de propiedades. Trabajamos con un compromiso basado en la transparencia, la ética profesional y un profundo conocimiento del mercado de Puerto Iguazú, garantizando seguridad, agilidad y satisfacción en cada operación.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#1F5F2D] mb-4">Nuestra Visión</h3>
              <p className="text-gray-700 leading-relaxed">
                Ser la inmobiliaria de referencia en Puerto Iguazú y la región, reconocida por su profesionalismo, innovación y compromiso con el desarrollo urbano y social. Aspiramos a consolidar relaciones de largo plazo con nuestros clientes, adaptándonos a las nuevas tendencias del mercado inmobiliario y manteniendo la confianza y el trato cercano que nos caracterizan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra relación con cada cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                  <value.icon className="w-12 h-12 text-[#8B1E1E] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales comprometidos con tu satisfacción y el éxito de tu inversión inmobiliaria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#8B1E1E] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Iguazú Inmuebles?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#8B1E1E] rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Seguridad Jurídica</h3>
              <p className="text-gray-600">
                Todas nuestras operaciones cuentan con el respaldo legal necesario para garantizar 
                transacciones seguras y transparentes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#1F5F2D] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Atención Personalizada</h3>
              <p className="text-gray-600">
                Cada cliente recibe un trato único y personalizado, adaptado a sus necesidades 
                específicas y objetivos inmobiliarios.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Experiencia Comprobada</h3>
              <p className="text-gray-600">
                Más de 10 años en el mercado nos avalan, con cientos de operaciones exitosas 
                y clientes satisfechos en toda la región.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contáctanos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar la propiedad perfecta
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Contact Form and Location */}
            <div className="space-y-8">
              {/* Contact Form */}
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

              {/* Location Section */}
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

            {/* Right Column: Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:+543757501460"
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Phone className="w-6 h-6 text-[#1F5F2D] mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Teléfono</div>
                      <div className="text-gray-600 text-sm">(3757) 501460</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/543757501460"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <MessageCircle className="w-6 h-6 text-[#25D366] mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">WhatsApp</div>
                      <div className="text-gray-600 text-sm">+54 3757-501460</div>
                    </div>
                  </a>
                  <a
                    href="mailto:inmobiliaria@iguazuinmuebles.com"
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Mail className="w-6 h-6 text-[#8B1E1E] mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600 text-sm">inmobiliaria@iguazuinmuebles.com</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <MapPin className="w-6 h-6 text-[#FFD700] mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Dirección</div>
                      <div className="text-gray-600 text-sm">Julio Silveira 103, Puerto Iguazú, Misiones</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-[#8B1E1E] mr-2" />
                  Horarios de Atención
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Lunes a Viernes</span>
                    <span className="font-medium text-gray-900">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sábados</span>
                    <span className="font-medium text-gray-900">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Domingos</span>
                    <span className="font-medium text-gray-900">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
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
      </section>
    </div>
  );
};

export default About;