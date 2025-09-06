import React from 'react';
import { Heart, Github, Twitter, Sparkles, Palette, Zap, ExternalLink, User } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative">
        {/* Section principale */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Colonne 1: Logo et description */}
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
                <Palette size={32} className="text-pink-400" />
                <h3 className="text-2xl font-bold text-white">NailArt AI</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Créez des designs d'ongles extraordinaires en quelques secondes. 
                L'intelligence artificielle au service de votre créativité.
              </p>
              
              {/* Créateur */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <User size={16} className="text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">Créé par</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-lg font-bold text-white">Rodrigue Gbadou</span>
                  <a 
                    href="https://github.com/rodriguetg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 group"
                    title="GitHub de Rodrigue Gbadou"
                  >
                    <Github size={16} className="text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://github.com/rodriguetg" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 hover:bg-purple-600 rounded-full transition-all duration-300 group">
                  <Github size={20} className="text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 group">
                  <Twitter size={20} className="text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Colonne 2: Fonctionnalités */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-6">Fonctionnalités</h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-pink-400 transition-colors">
                  <Zap size={16} className="text-pink-400" />
                  <span>Génération instantanée</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-pink-400 transition-colors">
                  <Sparkles size={16} className="text-pink-400" />
                  <span>Templates d'occasions</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-pink-400 transition-colors">
                  <Palette size={16} className="text-pink-400" />
                  <span>Formats sociaux optimisés</span>
                </li>
              </ul>
            </div>

            {/* Colonne 3: Stats et info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-6">Statistiques</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-2xl font-bold text-pink-400 mb-1">5000+</div>
                  <div className="text-sm text-gray-400">Designs générés</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Disponible</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-2xl font-bold text-blue-400 mb-1">6</div>
                  <div className="text-sm text-gray-400">Templates</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800"></div>

        {/* Copyright */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>Développé avec</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>par</span>
              <span className="font-semibold text-white">Rodrigue Gbadou</span>
              <span>en utilisant React & TypeScript</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 Nail Art Generator. Tous droits réservés.
            </div>
          </div>
          
          {/* Crédit discret pour Pollination */}
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-600">
              Générations d'images alimentées par{' '}
              <a 
                href="https://pollinations.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-400 transition-colors inline-flex items-center gap-1"
              >
                Pollination AI
                <ExternalLink size={10} />
              </a>
            </p>
          </div>
        </div>

        {/* Bordure décorative */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      </div>
    </footer>
  );
};
