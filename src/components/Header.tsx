import React from 'react';
import { Palette, Sparkles, Zap, Star } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700">
      {/* Effets de fond */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo et titre principal */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <Palette size={56} className="text-white drop-shadow-lg" />
              <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              Nail<span className="text-pink-200">Art</span>
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">AI</span>
            </h1>
          </div>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transformez vos idées en designs d'ongles époustouflants grâce à l'intelligence artificielle
          </p>

          {/* Badges de fonctionnalités */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap size={16} className="text-yellow-300" />
              <span className="text-white text-sm font-medium">Génération Instantanée</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Star size={16} className="text-yellow-300" />
              <span className="text-white text-sm font-medium">Qualité Professionnelle</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-white text-sm font-medium">Designs Uniques</span>
            </div>
          </div>

          {/* CTA subtitle - updated */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/30">
            <Sparkles size={20} className="text-yellow-300 animate-spin" />
            <span className="text-white text-lg font-semibold">IA Créative Avancée</span>
          </div>
        </div>
      </div>

      {/* Bordure décorative */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"></div>
    </header>
  );
};
