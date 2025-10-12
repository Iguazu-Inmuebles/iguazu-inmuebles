/**
 * Utilidades de validación para mejorar la seguridad de la aplicación
 */

// Validación de números
export const validateNumber = (value: string | number): { isValid: boolean; value: number | null; error?: string } => {
  if (value === '' || value === null || value === undefined) {
    return { isValid: false, value: null, error: 'Valor requerido' };
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue) || !isFinite(numValue)) {
    return { isValid: false, value: null, error: 'Debe ser un número válido' };
  }

  if (numValue < 0) {
    return { isValid: false, value: null, error: 'El número no puede ser negativo' };
  }

  return { isValid: true, value: numValue };
};

// Validación de precios
export const validatePrice = (value: string | number): { isValid: boolean; value: number | null; error?: string } => {
  const result = validateNumber(value);
  
  if (!result.isValid) {
    return result;
  }

  if (result.value! > 999999999) {
    return { isValid: false, value: null, error: 'El precio es demasiado alto' };
  }

  return result;
};

// Validación de emails
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email requerido' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Formato de email inválido' };
  }

  // Verificar longitud máxima
  if (email.length > 254) {
    return { isValid: false, error: 'Email demasiado largo' };
  }

  return { isValid: true };
};

// Validación de URLs
export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL requerida' };
  }

  try {
    const urlObj = new URL(url);
    
    // Solo permitir HTTP y HTTPS
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'Solo se permiten URLs HTTP y HTTPS' };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Formato de URL inválido' };
  }
};

// Validación de teléfonos
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Teléfono requerido' };
  }

  // Remover espacios y caracteres especiales para validación
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Validar que solo contenga números y el símbolo +
  const phoneRegex = /^\+?[0-9]{8,15}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Formato de teléfono inválido' };
  }

  return { isValid: true };
};

// Validación de texto general (prevenir XSS básico)
export const validateText = (text: string, maxLength: number = 1000): { isValid: boolean; value: string; error?: string } => {
  if (!text) {
    return { isValid: false, value: '', error: 'Texto requerido' };
  }

  const trimmedText = text.trim();
  
  if (trimmedText.length === 0) {
    return { isValid: false, value: '', error: 'Texto requerido' };
  }

  if (trimmedText.length > maxLength) {
    return { isValid: false, value: '', error: `El texto no puede exceder ${maxLength} caracteres` };
  }

  // Verificar caracteres peligrosos básicos
  const dangerousChars = /<script|javascript:|on\w+=/i;
  if (dangerousChars.test(trimmedText)) {
    return { isValid: false, value: '', error: 'El texto contiene caracteres no permitidos' };
  }

  return { isValid: true, value: trimmedText };
};

// Validación de rangos de precios
export const validatePriceRange = (minPrice: string | number, maxPrice: string | number): { 
  isValid: boolean; 
  minValue: number | null; 
  maxValue: number | null; 
  error?: string 
} => {
  const minResult = validatePrice(minPrice);
  const maxResult = validatePrice(maxPrice);

  if (!minResult.isValid) {
    return { isValid: false, minValue: null, maxValue: null, error: `Precio mínimo: ${minResult.error}` };
  }

  if (!maxResult.isValid) {
    return { isValid: false, minValue: null, maxValue: null, error: `Precio máximo: ${maxResult.error}` };
  }

  if (minResult.value! > maxResult.value!) {
    return { 
      isValid: false, 
      minValue: null, 
      maxValue: null, 
      error: 'El precio mínimo no puede ser mayor al precio máximo' 
    };
  }

  return { 
    isValid: true, 
    minValue: minResult.value, 
    maxValue: maxResult.value 
  };
};