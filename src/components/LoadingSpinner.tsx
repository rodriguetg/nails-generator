import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Génération en cours..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Animation principale */}
      <div className="relative mb-8">
        {/* Cercles animés */}
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 border-4 border-pink-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 border-4 border-purple-300 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-pink-400 rounded-full animate-ping"></div>
          
          {/* Icône centrale */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Particules flottantes */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute -top-2 -right-6 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-4 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Message principal */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <Zap className="text-yellow-500" size={24} />
          {message}
        </h3>
        <p className="text-gray-600">L'IA travaille sur vos créations...</p>
      </div>

      {/* Barre de progression animée */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>

      {/* Texte d'encouragement */}
      <p className="mt-6 text-sm text-gray-500 text-center max-w-sm">
        ✨ Préparation de designs uniques et créatifs spécialement pour vous...
      </p>
    </div>
  );
};
