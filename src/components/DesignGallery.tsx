import React, { useState } from 'react';
import { Download, Trash2, Calendar, Sparkles, Heart, Eye, AlertCircle, Copy, Share2, Monitor } from 'lucide-react';
import { NailDesign } from '../types';

interface DesignGalleryProps {
  designs: NailDesign[];
  onRemove: (id: string) => void;
}

export const DesignGallery: React.FC<DesignGalleryProps> = ({ designs, onRemove }) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const downloadImage = async (imageUrl: string, design: NailDesign) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Nom de fichier avec plateforme et dimensions
      const platformInfo = design.platform 
        ? `_${design.platform.name.replace(/\s+/g, '-')}_${design.dimensions?.width}x${design.dimensions?.height}`
        : '';
      a.download = `nail-design-${design.id}${platformInfo}.png`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement. Essayez de faire un clic droit > Enregistrer l\'image.');
    }
  };

  const copyPrompt = async (prompt: string, designId: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(designId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const shareDesign = async (design: NailDesign) => {
    if (navigator.share) {
      try {
        const platformInfo = design.platform ? ` (optimisé pour ${design.platform.name})` : '';
        await navigator.share({
          title: 'Design d\'ongles IA',
          text: `Regardez ce superbe design d'ongles : ${design.prompt}${platformInfo}`,
          url: design.imageUrl
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      copyPrompt(design.imageUrl, design.id);
    }
  };

  const handleImageError = (designId: string) => {
    setImageErrors(prev => new Set([...prev, designId]));
  };

  const handleImageLoad = (designId: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(designId);
      return newSet;
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPlatformBadgeColor = (platformId?: string) => {
    switch (platformId) {
      case 'instagram-post':
      case 'instagram-story':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'pinterest':
        return 'bg-red-500 text-white';
      case 'facebook-post':
      case 'facebook-story':
        return 'bg-blue-500 text-white';
      case 'tiktok':
        return 'bg-black text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (designs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative mx-auto mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
            <Sparkles className="text-pink-400" size={48} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Votre galerie vous attend ! ✨</h3>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          Commencez par créer votre premier design d'ongles en décrivant votre vision ou en utilisant la génération automatique.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header de la galerie */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
            <Eye size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Votre Galerie</h2>
            <p className="text-gray-600">{designs.length} création(s) générée(s)</p>
          </div>
        </div>
        
        {/* Badge compteur */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full">
          <Sparkles size={16} className="text-pink-500" />
          <span className="text-sm font-semibold text-gray-700">{designs.length} designs</span>
        </div>
      </div>
      
      {/* Grille des designs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {designs.map((design, index) => (
          <div key={design.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Image container */}
            <div className="relative overflow-hidden">
              {imageErrors.has(design.id) ? (
                <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center">
                  <AlertCircle className="text-gray-400 mb-2" size={32} />
                  <p className="text-gray-500 text-sm text-center px-4">
                    Erreur de chargement de l'image
                  </p>
                  <button
                    onClick={() => {
                      setImageErrors(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(design.id);
                        return newSet;
                      });
                    }}
                    className="mt-2 px-3 py-1 bg-pink-500 text-white text-xs rounded-full hover:bg-pink-600 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              ) : (
                <img
                  src={design.imageUrl}
                  alt={design.prompt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={() => handleImageError(design.id)}
                  onLoad={() => handleImageLoad(design.id)}
                  crossOrigin="anonymous"
                />
              )}
              
              {/* Badge plateforme */}
              {design.platform && (
                <div className={`absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded-full ${getPlatformBadgeColor(design.platform.id)}`}>
                  <div className="flex items-center gap-1">
                    <Monitor size={12} />
                    <span>{design.platform.name}</span>
                  </div>
                </div>
              )}
              
              {/* Overlay avec actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadImage(design.imageUrl, design)}
                      className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                      title="Télécharger"
                    >
                      <Download size={18} className="text-white" />
                    </button>
                    <button
                      onClick={() => shareDesign(design)}
                      className="p-3 bg-blue-500/80 backdrop-blur-sm hover:bg-blue-500 rounded-full transition-all duration-300 transform hover:scale-110"
                      title="Partager"
                    >
                      <Share2 size={18} className="text-white" />
                    </button>
                    <button
                      onClick={() => onRemove(design.id)}
                      className="p-3 bg-red-500/80 backdrop-blur-sm hover:bg-red-500 rounded-full transition-all duration-300 transform hover:scale-110"
                      title="Supprimer"
                    >
                      <Trash2 size={18} className="text-white" />
                    </button>
                  </div>
                  
                  {/* Badge nouveau */}
                  {index < 4 && (
                    <div className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                      NOUVEAU
                    </div>
                  )}
                </div>
              </div>

              {/* Badge de position */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
            
            {/* Contenu */}
            <div className="p-5">
              <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                {design.prompt}
              </p>
              
              {/* Info plateforme et dimensions */}
              {design.platform && design.dimensions && (
                <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="font-medium">{design.platform.name}</span>
                    <span>{design.dimensions.width}×{design.dimensions.height}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Ratio {design.dimensions.ratio}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={14} className="mr-2" />
                  {formatDate(design.createdAt)}
                </div>
                
                {/* Actions rapides */}
                <div className="flex gap-1">
                  <button
                    onClick={() => copyPrompt(design.prompt, design.id)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      copiedPrompt === design.id
                        ? 'text-green-500 bg-green-50'
                        : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'
                    }`}
                    title="Copier le prompt"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => downloadImage(design.imageUrl, design)}
                    className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-300"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => onRemove(design.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
