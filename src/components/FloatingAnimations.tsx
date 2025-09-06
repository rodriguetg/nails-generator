import React from 'react';
import { Sparkles, Heart, Star, Palette } from 'lucide-react';

export const FloatingAnimations: React.FC = () => {
  return (
    <>
      {/* Particules flottantes principales */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Particules colorées */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-float-medium"></div>
        <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-yellow-400 rounded-full opacity-40 animate-float-fast"></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-float-slow"></div>
        <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-float-medium"></div>
        <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-red-400 rounded-full opacity-40 animate-float-fast"></div>
        
        {/* Icônes flottantes */}
        <div className="absolute top-1/5 left-1/5 text-pink-300 opacity-30 animate-float-rotate-slow">
          <Sparkles size={16} />
        </div>
        <div className="absolute top-2/5 right-1/5 text-purple-300 opacity-25 animate-float-rotate-medium">
          <Heart size={14} />
        </div>
        <div className="absolute top-3/5 left-1/2 text-yellow-300 opacity-35 animate-float-rotate-fast">
          <Star size={12} />
        </div>
        <div className="absolute top-4/5 right-1/2 text-blue-300 opacity-30 animate-float-rotate-slow">
          <Palette size={18} />
        </div>
      </div>

      {/* Effet de vagues subtiles */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0">
        <div className="relative h-32 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-pink-50/30 to-transparent animate-wave-slow"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-purple-50/20 to-transparent animate-wave-medium"></div>
        </div>
      </div>

      {/* Bulles flottantes occasionnelles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-6 h-6 bg-white/20 rounded-full animate-bubble-1"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-white/15 rounded-full animate-bubble-2"></div>
        <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-white/25 rounded-full animate-bubble-3"></div>
        <div className="absolute bottom-32 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-bubble-4"></div>
      </div>
    </>
  );
};
