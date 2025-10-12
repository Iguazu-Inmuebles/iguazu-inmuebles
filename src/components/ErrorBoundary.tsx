import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualizar el estado para mostrar la UI de error
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log del error de forma segura (sin exponer información sensible)
    console.error('Error capturado por ErrorBoundary:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      componentStack: process.env.NODE_ENV === 'development' ? errorInfo.componentStack : undefined
    });

    this.setState({
      error,
      errorInfo: process.env.NODE_ENV === 'development' ? errorInfo : undefined
    });

    // En producción, podrías enviar el error a un servicio de logging
    if (process.env.NODE_ENV === 'production') {
      // Ejemplo: logError(error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Si se proporciona un fallback personalizado, usarlo
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI de error por defecto
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Oops! Algo salió mal
              </h1>
              <p className="text-gray-600">
                Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center px-4 py-2 bg-[#8B1E1E] text-white rounded-lg hover:bg-[#7a1a1a] transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Recargar página
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Ir al inicio
              </button>
            </div>

            {/* Mostrar detalles del error solo en desarrollo */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Detalles del error (solo en desarrollo)
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-700 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar en componentes funcionales
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error manejado:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      errorInfo: process.env.NODE_ENV === 'development' ? errorInfo : undefined
    });

    // En producción, enviar a servicio de logging
    if (process.env.NODE_ENV === 'production') {
      // Ejemplo: logError(error, errorInfo);
    }
  };
};

// Componente de error simple para casos específicos
export const SimpleErrorFallback: React.FC<{ error?: Error; onRetry?: () => void }> = ({ 
  error, 
  onRetry 
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Error al cargar el contenido
    </h3>
    <p className="text-gray-600 mb-4">
      {error?.message || 'Ha ocurrido un error inesperado'}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center px-4 py-2 bg-[#8B1E1E] text-white rounded-lg hover:bg-[#7a1a1a] transition-colors"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Reintentar
      </button>
    )}
  </div>
);

export default ErrorBoundary;