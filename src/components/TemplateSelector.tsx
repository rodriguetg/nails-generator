import React, { useState } from 'react';
import { Calendar, Heart, Sun, Snowflake, Sparkles, Flower, Music, Coffee, Star, Zap } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  prompts: string[];
  description: string;
}

interface TemplateSelectorProps {
  onTemplateSelect: (prompts: string[]) => void;
  isLoading: boolean;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect,
  isLoading
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: 'wedding',
      name: 'Mariage',
      icon: <Heart size={18} />,
      color: 'from-pink-500 to-rose-500',
      description: 'Élégance romantique pour le grand jour',
      prompts: [
        'elegant white french manicure with delicate lace patterns and pearl accents',
        'romantic nude nails with subtle rose gold details and tiny diamonds',
        'classic bridal white with intricate floral embossing',
        'soft pink gradient with champagne glitter and wedding ring motifs'
      ]
    },
    {
      id: 'summer',
      name: 'Été',
      icon: <Sun size={18} />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Vibes ensoleillées et tropicales',
      prompts: [
        'vibrant tropical sunset with palm tree silhouettes and ocean waves',
        'neon summer colors with fruit patterns and beach vibes',
        'turquoise and coral gradient with seashell decorations',
        'bright citrus colors with tropical flower patterns'
      ]
    },
    {
      id: 'winter',
      name: 'Hiver',
      icon: <Snowflake size={18} />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Magie hivernale et fêtes de fin d\'année',
      prompts: [
        'icy blue with silver snowflake patterns and holographic accents',
        'deep burgundy with gold Christmas tree designs',
        'winter wonderland with white and silver glitter ombre',
        'elegant navy with silver stars and winter constellation patterns'
      ]
    },
    {
      id: 'spring',
      name: 'Printemps',
      icon: <Flower size={18} />,
      color: 'from-green-500 to-emerald-500',
      description: 'Renouveau fleuri et fraîcheur',
      prompts: [
        'delicate cherry blossom petals on soft pink base with green leaves',
        'pastel lavender with watercolor flower garden designs',
        'fresh mint green with tiny white daisy patterns',
        'soft yellow with butterfly motifs and spring flower bouquets'
      ]
    },
    {
      id: 'party',
      name: 'Soirée',
      icon: <Music size={18} />,
      color: 'from-purple-500 to-pink-500',
      description: 'Glamour et éclat pour les soirées',
      prompts: [
        'glamorous black with gold sequin patterns and metallic accents',
        'holographic chrome with rainbow reflections and disco vibes',
        'deep purple with silver glitter gradient and party confetti',
        'bold red with gold geometric patterns and luxury textures'
      ]
    },
    {
      id: 'minimalist',
      name: 'Minimaliste',
      icon: <Coffee size={18} />,
      color: 'from-gray-500 to-slate-500',
      description: 'Simplicité élégante au quotidien',
      prompts: [
        'nude minimalist with single thin gold line accent',
        'matte black tips on clear base with geometric lines',
        'soft beige with delicate white dots pattern',
        'clear base with subtle rose gold geometric shapes'
      ]
    }
  ];

  const handleTemplateClick = async (template: Template) => {
    setSelectedTemplate(template.id);
    try {
      await onTemplateSelect(template.prompts);
    } catch (error) {
      console.error('Erreur lors de la génération du template:', error);
    } finally {
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-purple-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Templates d'occasions</h3>
        <Sparkles size={16} className="text-yellow-500 animate-pulse" />
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Choisissez un thème pour générer 4 designs adaptés à l'occasion
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            disabled={isLoading}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group ${
              selectedTemplate === template.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {/* Effet de chargement */}
            {selectedTemplate === template.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl animate-pulse"></div>
            )}
            
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${template.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {selectedTemplate === template.id ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  template.icon
                )}
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-1">{template.name}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {template.description}
              </p>
              
              {/* Badge nombre de designs */}
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  <Star size={10} />
                  4
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="text-purple-500" size={16} />
          <span className="font-medium text-purple-800 text-sm">Génération intelligente</span>
        </div>
        <p className="text-xs text-purple-700">
          Chaque template génère 4 designs uniques adaptés au thème sélectionné avec des variations créatives.
        </p>
      </div>
    </div>
  );
};
