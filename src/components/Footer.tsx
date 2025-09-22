import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, Facebook, Instagram, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex flex-col font-lato">
                <img className="h-36" src="https://i.imgur.com/2yEP9bw.png" alt="Estrella PNG" />
                {/* <span className="text-2xl font-bold text-[#8B1E1E]">IGUAZÚ</span>
                <span className="text-lg font-semibold text-[#1F5F2D] -mt-1">INMUEBLES</span> */}
              </div>
            </div>
            <p className="text-gray-200 mb-3 max-w-md font-lato">
              Seguridad y confianza, respaldando tu inversión
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/17Ds6wSLoN/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors duration-200"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/iguazuinmuebles?igsh=MjZpanpyaDlzdWZq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FFD700] font-lato">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/propiedades" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/tasaciones" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  Tasaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FFD700] font-lato">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#1F5F2D]" />
                <span className="text-gray-300 font-lato">Av. Corrientes 1234, Posadas</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1F5F2D]" />
                <a href="tel:+543764123456" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  (0376) 4-123456
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <a 
                  href="https://wa.me/543764123456" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-lato"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8B1E1E]" />
                <a href="mailto:info@iguazuinmuebles.com" className="text-gray-300 hover:text-white transition-colors duration-200 font-lato">
                  info@iguazuinmuebles.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-lato">
            © {currentYear} Iguazú Inmuebles. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;