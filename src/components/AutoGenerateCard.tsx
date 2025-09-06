import React from 'react';
import { Zap, Sparkles, Shuffle, Star } from 'lucide-react';

interface AutoGenerateCardProps {
  onAutoGenerate: () => void;
  isLoading: boolean;
}

export const AutoGenerateCard: React.FC<AutoGenerateCardProps> = ({
  onAutoGenerate,
  isLoading
}) => {
  return (
    <div className="h-full">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Génération Auto</h3>
            <p className="text-sm text-gray-600">Surprise garantie !</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-6">
          <p className="text-gray-700 mb-4 leading-relaxed">
            Laissez l'IA créer <span className="font-semibold text-purple-600">4 designs uniques</span> avec des styles et combinaisons automatiques.
          </p>
          
          {/* Features list */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star size={14} className="text-yellow-500" />
              <span>Styles variés et créatifs</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles size={14} className="text-pink-500" />
              <span>Combinaisons automatiques</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shuffle size={14} className="text-purple-500" />
              <span>Résultats imprévisibles</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onAutoGenerate}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span>Création en cours...</span>
            </>
          ) : (
            <>
              <Zap size={20} />
              <span>Générer 4 designs</span>
            </>
          )}
        </button>

        {/* Info badge */}
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            <Sparkles size={12} />
            Aucun prompt requis
          </span>
        </div>
      </div>
    </div>
  );
};
