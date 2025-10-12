import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-black/50 to-black/30">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://www.amerian.com/wp-content/uploads/2021/11/vista-panoramica-cataratas-pirayu-hotel-resort-puerto-iguazu-misiones-argentina.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-lato">
            Inmobiliaria en Puerto Iguazú{' '}
            <span className="text-[#FFD700]">Misiones</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-lato">
            Más de 20 años conectando familias con sus hogares soñados en Puerto Iguazú. 
            Casas, departamentos y terrenos en venta y alquiler.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-lato">
            <Link
              to="/propiedades"
              className="bg-[#8B1E1E] text-white px-8 py-4 rounded-lg hover:bg-[#a52525] transition-colors duration-200 flex items-center space-x-2 text-lg font-semibold"
            >
              <Search className="w-6 h-6" />
              <span>Ver Propiedades</span>
            </Link>
            <Link
              to="/tasaciones"
              className="bg-[#1F5F2D] text-white px-8 py-4 rounded-lg hover:bg-[#2a7a3a] transition-colors duration-200 flex items-center space-x-2 text-lg font-semibold"
            >
              <Calculator className="w-6 h-6" />
              <span>Solicitar Tasación</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;