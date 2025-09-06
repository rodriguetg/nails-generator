import React from 'react';
import { Monitor, Smartphone, Camera, Users, BookOpen, Music } from 'lucide-react';
import { SocialPlatform } from '../types';
import { pollinationService } from '../services/pollinationApi';

interface PlatformSelectorProps {
  selectedPlatforms: SocialPlatform[];
  onPlatformToggle: (platform: SocialPlatform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onPlatformToggle
}) => {
  const platforms = pollinationService.getSocialPlatforms();

  const getIcon = (platformId: string) => {
    switch (platformId) {
      case 'instagram-post':
      case 'instagram-story':
        return <Camera size={20} />;
      case 'pinterest':
        return <Monitor size={20} />;
      case 'facebook-post':
      case 'facebook-story':
        return <Users size={20} />;
      case 'tiktok':
        return <Music size={20} />;
      default:
        return <Smartphone size={20} />;
    }
  };

  const isSelected = (platform: SocialPlatform) => 
    selectedPlatforms.some(p => p.id === platform.id);

  const getColorClasses = (platformId: string, selected: boolean) => {
    const baseClasses = "p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105";
    
    if (selected) {
      switch (platformId) {
        case 'instagram-post':
        case 'instagram-story':
          return `${baseClasses} bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg`;
        case 'pinterest':
          return `${baseClasses} bg-red-500 border-red-500 text-white shadow-lg`;
        case 'facebook-post':
        case 'facebook-story':
          return `${baseClasses} bg-blue-500 border-blue-500 text-white shadow-lg`;
        case 'tiktok':
          return `${baseClasses} bg-black border-black text-white shadow-lg`;
        default:
          return `${baseClasses} bg-gray-500 border-gray-500 text-white shadow-lg`;
      }
    } else {
      return `${baseClasses} bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md`;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Plateformes sociales</h3>
        <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {selectedPlatforms.length} sélectionnée(s)
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Sélectionnez les plateformes pour générer des images aux bonnes dimensions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => onPlatformToggle(platform)}
            className={getColorClasses(platform.id, isSelected(platform))}
          >
            <div className="flex items-center gap-3 mb-2">
              {getIcon(platform.id)}
              <div className="flex-1">
                <div className="font-medium text-sm">{platform.name}</div>
                <div className={`text-xs ${isSelected(platform) ? 'text-white/80' : 'text-gray-500'}`}>
                  {platform.dimensions.width}×{platform.dimensions.height}
                </div>
              </div>
              <div className="text-lg">{platform.icon}</div>
            </div>
            <p className={`text-xs ${isSelected(platform) ? 'text-white/70' : 'text-gray-500'}`}>
              {platform.description}
            </p>
          </div>
        ))}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <span className="font-medium">{selectedPlatforms.length} plateforme(s) sélectionnée(s):</span>
            {' '}
            {selectedPlatforms.map(p => p.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
