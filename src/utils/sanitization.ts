/**
 * Utilidades de sanitización para prevenir ataques XSS
 */
import DOMPurify from 'dompurify';

// Configuración segura para DOMPurify
const sanitizeConfig = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_DOM_IMPORT: false,
  SANITIZE_DOM: true,
  WHOLE_DOCUMENT: false,
  FORCE_BODY: false,
  SANITIZE_NAMED_PROPS: true,
  SANITIZE_NAMED_PROPS_PREFIX: 'user-content-',
  FORBID_CONTENTS: ['script', 'style'],
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit']
};

// Sanitizar HTML general
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(html, sanitizeConfig);
};

// Sanitizar texto plano (remover HTML completamente)
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(text, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true 
  });
};

// Sanitizar descripciones de propiedades (permite formato básico)
export const sanitizePropertyDescription = (description: string): string => {
  if (!description || typeof description !== 'string') {
    return '';
  }
  
  const propertyConfig = {
    ...sanitizeConfig,
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    MAX_CHARS: 2000
  };
  
  let sanitized = DOMPurify.sanitize(description, propertyConfig);
  
  // Limitar longitud
  if (sanitized.length > 2000) {
    sanitized = sanitized.substring(0, 2000) + '...';
  }
  
  return sanitized;
};

// Sanitizar URLs para prevenir javascript: y data: schemes
export const sanitizeUrl = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return '';
  }
  
  // Remover espacios en blanco
  const cleanUrl = url.trim();
  
  // Verificar que no contenga esquemas peligrosos
  const dangerousSchemes = /^(javascript|data|vbscript|file|about):/i;
  if (dangerousSchemes.test(cleanUrl)) {
    return '';
  }
  
  // Si no tiene protocolo, asumir https
  if (!/^https?:\/\//i.test(cleanUrl)) {
    return `https://${cleanUrl}`;
  }
  
  return cleanUrl;
};

// Sanitizar nombres de archivos
export const sanitizeFileName = (fileName: string): string => {
  if (!fileName || typeof fileName !== 'string') {
    return '';
  }
  
  // Remover caracteres peligrosos
  return fileName
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\.\./g, '')
    .replace(/^\./, '')
    .trim()
    .substring(0, 255);
};

// Sanitizar parámetros de búsqueda
export const sanitizeSearchParams = (params: Record<string, any>): Record<string, string> => {
  const sanitized: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      const sanitizedKey = sanitizeText(String(key));
      const sanitizedValue = sanitizeText(String(value));
      
      if (sanitizedKey && sanitizedValue) {
        sanitized[sanitizedKey] = sanitizedValue;
      }
    }
  }
  
  return sanitized;
};