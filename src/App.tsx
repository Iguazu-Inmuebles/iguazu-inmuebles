import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Valuations from './pages/Valuations';
import Admin from './pages/Admin';
import AdminConfig from './pages/AdminConfig';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-lato">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedades/:id" element={<PropertyDetail />} />
            <Route path="/quienes-somos" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/tasaciones" element={<Valuations />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/config" element={<AdminConfig />} />
          </Routes>
        </main>
        <FloatingWhatsApp />
        <Footer />
      </div>
    </Router>
  );
}

export default App;