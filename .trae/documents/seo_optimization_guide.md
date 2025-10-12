# Guía de Optimización SEO para Iguazú Inmuebles

## 1. Resumen Ejecutivo

Esta guía proporciona un plan completo para implementar mejoras SEO en el sitio web de Iguazú Inmuebles, con el objetivo de mejorar el posicionamiento orgánico en Google para búsquedas relacionadas con propiedades inmobiliarias en Puerto Iguazú, Misiones.

**Nota importante**: Actualmente Iguazú Inmuebles opera exclusivamente en Puerto Iguazú, Misiones. La expansión a otras provincias como Corrientes y Entre Ríos está planificada para el futuro.

### Objetivos Principales:
- Aumentar la visibilidad en búsquedas locales de propiedades
- Mejorar el ranking para palabras clave específicas del sector inmobiliario
- Incrementar el tráfico orgánico cualificado
- Optimizar la experiencia del usuario y velocidad de carga

## 2. Archivos SEO Fundamentales

### 2.1 robots.txt
Crear archivo `public/robots.txt`:

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://iguazuinmuebles.com/sitemap.xml

# Disallow admin areas
Disallow: /admin
Disallow: /api/

# Allow important pages
Allow: /propiedades
Allow: /sobre-nosotros
Allow: /contacto
Allow: /tasaciones
```

### 2.2 sitemap.xml
Crear archivo `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://iguazuinmuebles.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://iguazuinmuebles.com/propiedades</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://iguazuinmuebles.com/sobre-nosotros</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://iguazuinmuebles.com/contacto</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://iguazuinmuebles.com/tasaciones</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 3. Optimización de Meta Etiquetas

### 3.1 Página Principal (index.html)
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Iguazú Inmuebles - Propiedades en Venta y Alquiler en Puerto Iguazú, Misiones</title>
  <meta name="description" content="Inmobiliaria líder en Puerto Iguazú, Misiones. Casas, departamentos y terrenos en venta y alquiler. Más de 20 años de experiencia en el mercado inmobiliario." />
  <meta name="keywords" content="inmobiliaria puerto iguazu, propiedades misiones, casas venta puerto iguazu, departamentos alquiler misiones, terrenos iguazu" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Iguazú Inmuebles - Propiedades en Puerto Iguazú, Misiones" />
  <meta property="og:description" content="Encuentra tu propiedad ideal en Puerto Iguazú, Misiones. Casas, departamentos y terrenos con más de 20 años de experiencia." />
  <meta property="og:image" content="https://iguazuinmuebles.com/logo.png" />
  <meta property="og:url" content="https://iguazuinmuebles.com" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Iguazú Inmuebles - Propiedades en Puerto Iguazú, Misiones" />
  <meta name="twitter:description" content="Inmobiliaria líder en Puerto Iguazú. Propiedades en venta y alquiler." />
  <meta name="twitter:image" content="https://iguazuinmuebles.com/logo.png" />
  
  <!-- Local Business -->
  <meta name="geo.region" content="AR-N" />
  <meta name="geo.placename" content="Puerto Iguazú, Misiones" />
  <meta name="geo.position" content="-25.5948;-54.5756" />
  <meta name="ICBM" content="-25.5948, -54.5756" />
</head>
```

### 3.2 Meta Tags por Página

#### Propiedades
```html
<title>Propiedades en Venta y Alquiler - Puerto Iguazú, Misiones | Iguazú Inmuebles</title>
<meta name="description" content="Explora nuestra amplia selección de propiedades en Puerto Iguazú, Misiones. Casas, departamentos y terrenos con la mejor atención y experiencia." />
```

#### Sobre Nosotros
```html
<title>Sobre Nosotros - Iguazú Inmuebles | 20 Años de Experiencia en Puerto Iguazú</title>
<meta name="description" content="Conoce a Iguazú Inmuebles, inmobiliaria con más de 20 años de experiencia en Puerto Iguazú, Misiones. Equipo profesional y servicio personalizado." />
```

#### Contacto
```html
<title>Contacto - Iguazú Inmuebles | Puerto Iguazú, Misiones</title>
<meta name="description" content="Contáctanos para encontrar tu propiedad ideal en Puerto Iguazú, Misiones. Oficina en el centro de la ciudad. Atención personalizada y profesional." />
```

#### Tasaciones
```html
<title>Tasaciones Gratuitas - Iguazú Inmuebles | Puerto Iguazú, Misiones</title>
<meta name="description" content="Tasación gratuita de tu propiedad en Puerto Iguazú, Misiones. Evaluación profesional con más de 20 años de experiencia en el mercado inmobiliario." />
```

## 4. Datos Estructurados Schema.org

### 4.1 Organización Local (Para todas las páginas)
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Iguazú Inmuebles",
  "description": "Inmobiliaria líder en Puerto Iguazú con más de 20 años de experiencia",
  "url": "https://iguazuinmuebles.com",
  "logo": "https://iguazuinmuebles.com/logo.png",
  "image": "https://iguazuinmuebles.com/logo.png",
  "telephone": "+54-3757-XXXXXX",
  "email": "info@iguazuinmuebles.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dirección de la oficina",
    "addressLocality": "Puerto Iguazú",
    "addressRegion": "Misiones",
    "postalCode": "3370",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-25.5948",
    "longitude": "-54.5756"
  },
  "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-13:00",
  "areaServed": [
    {
      "@type": "City",
      "name": "Puerto Iguazú"
    },
    {
      "@type": "State",
      "name": "Misiones"
    }
  ]
}
```

### 4.2 Listado de Propiedades
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Casa en Venta - Puerto Iguazú",
  "description": "Hermosa casa de 3 dormitorios en zona céntrica de Puerto Iguazú",
  "url": "https://iguazuinmuebles.com/propiedades/casa-venta-puerto-iguazu-123",
  "image": [
    "https://iguazuinmuebles.com/images/propiedad-123-1.jpg",
    "https://iguazuinmuebles.com/images/propiedad-123-2.jpg"
  ],
  "datePosted": "2024-01-15",
  "validThrough": "2024-12-31",
  "price": {
    "@type": "PriceSpecification",
    "price": "150000",
    "priceCurrency": "USD"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Ejemplo 123",
    "@addressLocality": "Puerto Iguazú",
    "addressRegion": "Misiones",
    "postalCode": "3370",
    "addressCountry": "AR"
  },
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "120",
    "unitCode": "MTK"
  },
  "numberOfRooms": "3",
  "numberOfBathroomsTotal": "2",
  "yearBuilt": "2015"
}
```

## 5. Palabras Clave Estratégicas

### 5.1 Palabras Clave Principales
- **Primarias**: 
  - "inmobiliaria puerto iguazu"
  - "propiedades puerto iguazu"
  - "casas venta misiones"
  - "departamentos alquiler puerto iguazu"

- **Secundarias**:
  - "terrenos venta puerto iguazu"
  - "inmuebles iguazu"
  - "propiedades misiones"
  - "casas alquiler puerto iguazu"

- **Long Tail**:
  - "casa 3 dormitorios venta puerto iguazu"
  - "departamento alquiler centro puerto iguazu"
  - "terreno comercial venta puerto iguazu"
  - "inmobiliaria confiable puerto iguazu misiones"

### 5.2 Implementación en Contenido

#### Títulos H1 por Página:
- **Home**: "Inmobiliaria Líder en Puerto Iguazú, Misiones - Propiedades de Calidad"
- **Propiedades**: "Propiedades en Venta y Alquiler en Puerto Iguazú, Misiones"
- **Sobre Nosotros**: "Iguazú Inmuebles - 20 Años de Experiencia en Puerto Iguazú, Misiones"
- **Contacto**: "Contacta con la Mejor Inmobiliaria de Puerto Iguazú, Misiones"
- **Tasaciones**: "Tasaciones Gratuitas de Propiedades en Puerto Iguazú, Misiones"

## 6. Optimización de URLs

### 6.1 Estructura de URLs Amigables
```
Actual → Optimizada
/properties → /propiedades
/about → /sobre-nosotros  
/contact → /contacto
/valuations → /tasaciones
/properties/123 → /propiedades/casa-venta-puerto-iguazu-123
```

### 6.2 Parámetros de Búsqueda SEO-Friendly
```
/propiedades/venta/casas/puerto-iguazu
/propiedades/alquiler/departamentos/puerto-iguazu
/propiedades/terrenos/puerto-iguazu-misiones
```

## 7. Contenido Optimizado

### 7.1 Página Principal
```html
<h1>Inmobiliaria Líder en Puerto Iguazú, Misiones - Propiedades de Calidad</h1>

<h2>Encuentra tu Propiedad Ideal en Puerto Iguazú</h2>
<p>Iguazú Inmuebles es la inmobiliaria de confianza en Puerto Iguazú, Misiones, con más de 20 años de experiencia. Ofrecemos el mejor servicio para la compra, venta y alquiler de propiedades en la región.</p>

<h3>Nuestros Servicios</h3>
<ul>
  <li>Venta de casas en Puerto Iguazú</li>
  <li>Alquiler de departamentos en Puerto Iguazú</li>
  <li>Terrenos comerciales y residenciales</li>
  <li>Tasaciones gratuitas</li>
  <li>Asesoramiento legal inmobiliario</li>
</ul>

<h3>¿Por qué Elegir Iguazú Inmuebles?</h3>
<p>Somos la inmobiliaria líder en Puerto Iguazú, Misiones, con un equipo de profesionales especializados en el mercado inmobiliario local. Nuestro compromiso es encontrar la propiedad perfecta para cada cliente en esta hermosa región.</p>
```

### 7.2 Descripciones de Propiedades Optimizadas
```html
<h2>Casa en Venta - 3 Dormitorios - Puerto Iguazú Centro</h2>
<p>Hermosa casa de 3 dormitorios en venta ubicada en el centro de Puerto Iguazú, Misiones. Propiedad ideal para familias, con amplio jardín y excelente ubicación cerca de servicios y comercios.</p>

<h3>Características de la Propiedad</h3>
<ul>
  <li>3 dormitorios amplios</li>
  <li>2 baños completos</li>
  <li>Cocina integrada</li>
  <li>Jardín de 200m²</li>
  <li>Garage para 2 autos</li>
</ul>
```

## 8. SEO Técnico

### 8.1 Optimización de Imágenes
```html
<!-- Ejemplo de imagen optimizada -->
<img 
  src="/images/casa-venta-puerto-iguazu-123.webp" 
  alt="Casa en venta 3 dormitorios Puerto Iguazú - Iguazú Inmuebles"
  title="Casa familiar en venta - Puerto Iguazú centro"
  width="800" 
  height="600"
  loading="lazy"
/>
```

### 8.2 Optimización de Velocidad
- Implementar lazy loading para imágenes
- Comprimir imágenes (formato WebP)
- Minificar CSS y JavaScript
- Implementar caché del navegador
- Optimizar Core Web Vitals

### 8.3 Responsive Design
- Diseño mobile-first
- Optimización para dispositivos móviles
- Velocidad de carga en móviles < 3 segundos

## 9. SEO Local

### 9.1 Google My Business
- Crear y optimizar perfil de Google My Business
- Agregar fotos de la oficina y equipo
- Solicitar reseñas de clientes
- Publicar actualizaciones regulares

### 9.2 Contenido Geo-local