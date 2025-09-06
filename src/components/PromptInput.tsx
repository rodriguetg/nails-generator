import React, { useState } from 'react';
import { Send, Sparkles, Shuffle, Palette, Lightbulb } from 'lucide-react';
import { pollinationService } from '../services/pollinationApi';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showTips, setShowTips] = useState(false);
  const presetPrompts = pollinationService.getPresetPrompts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setPrompt(''); // Clear after submit
    }
  };

  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const handleRandomPrompt = () => {
    const randomPrompt = presetPrompts[Math.floor(Math.random() * presetPrompts.length)];
    setPrompt(randomPrompt);
  };

  const tips = [
    "Mentionnez des couleurs spécifiques pour plus de précision",
    "Ajoutez des matériaux comme 'paillettes', 'chrome' ou 'mate'",
    "Spécifiez un style comme 'minimaliste', 'baroque' ou 'moderne'",
    "Incluez des motifs : 'géométrique', 'floral', 'animal print'"
  ];

  return (
    <div className="w-full">
      {/* Header de section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
          <Palette size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Créez votre design</h2>
          <p className="text-gray-600">Décrivez le nail art de vos rêves</p>
        </div>
        <button
          onClick={() => setShowTips(!showTips)}
          className={`p-2 rounded-xl transition-all duration-300 ${
            showTips ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
          }`}
          title="Conseils pour de meilleurs résultats"
        >
          <Lightbulb size={20} />
        </button>
      </div>

      {/* Conseils d'écriture */}
      {showTips && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Conseils pour de meilleurs résultats :</h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulaire principal */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: French manicure avec des paillettes dorées et motifs floraux délicats..."
            className="w-full p-6 pr-20 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none resize-none h-32 text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            disabled={isLoading}
          />
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              type="button"
              onClick={handleRandomPrompt}
              className="p-3 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all duration-300"
              disabled={isLoading}
              title="Prompt aléatoire"
            >
              <Shuffle size={20} />
            </button>
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
        {/* Compteur de caractères */}
        <div className="absolute bottom-1 left-4 text-xs text-gray-400">
          {prompt.length}/500 caractères
        </div>
      </form>

      {/* Section inspiration */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-pink-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Idées d'inspiration</h3>
          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Cliquez pour utiliser
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presetPrompts.slice(0, 6).map((presetPrompt, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(presetPrompt)}
              className="text-left p-4 bg-gradient-to-r from-gray-50 to-pink-50 hover:from-pink-50 hover:to-purple-50 rounded-xl text-sm text-gray-700 hover:text-purple-700 transition-all duration-300 border border-transparent hover:border-pink-200 transform hover:scale-105"
              disabled={isLoading}
            >
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-medium">{presetPrompt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
