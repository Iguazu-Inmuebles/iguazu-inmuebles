import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("¡Hola! Me interesa conocer más sobre sus propiedades. ¿Podrían ayudarme?");
    window.open(`https://wa.me/543757501460?text=${message}`, '_blank');
    setShowPopup(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20b858] transition-all duration-300 hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Popup Message */}
        {showPopup && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-80 border font-lato">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Iguazú Inmuebles</h4>
                  <p className="text-sm text-gray-600">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                ¡Hola! 👋 ¿En qué podemos ayudarte hoy? Estamos aquí para encontrar tu propiedad ideal.
              </p>
            </div>
            
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20b858] transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Iniciar conversación</span>
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {showPopup && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPopup(false)}
        ></div>
      )}
    </>
  );
};

export default FloatingWhatsApp;