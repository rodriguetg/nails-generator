import axios from 'axios';
import { GenerationRequest, ApiResponse, SocialPlatform, ImageDimensions } from '../types';

const API_BASE_URL = 'https://image.pollinations.ai/prompt';

class PollinationService {
  // Plateformes sociales supportées
  getSocialPlatforms(): SocialPlatform[] {
    return [
      {
        id: 'instagram-post',
        name: 'Instagram Post',
        icon: '📷',
        dimensions: { width: 1080, height: 1080, ratio: '1:1' },
        description: 'Format carré parfait pour les posts Instagram'
      },
      {
        id: 'instagram-story',
        name: 'Instagram Story',
        icon: '📱',
        dimensions: { width: 1080, height: 1920, ratio: '9:16' },
        description: 'Format vertical pour les stories Instagram'
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        icon: '📌',
        dimensions: { width: 735, height: 1102, ratio: '2:3' },
        description: 'Format vertical optimisé pour Pinterest'
      },
      {
        id: 'facebook-post',
        name: 'Facebook Post',
        icon: '👥',
        dimensions: { width: 1200, height: 630, ratio: '1.9:1' },
        description: 'Format paysage pour les posts Facebook'
      },
      {
        id: 'facebook-story',
        name: 'Facebook Story',
        icon: '📖',
        dimensions: { width: 1080, height: 1920, ratio: '9:16' },
        description: 'Format vertical pour les stories Facebook'
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        icon: '🎵',
        dimensions: { width: 1080, height: 1920, ratio: '9:16' },
        description: 'Format vertical pour TikTok'
      }
    ];
  }

  private async generateImage(request: GenerationRequest): Promise<string> {
    try {
      // Construction du prompt optimisé pour nail art
      let enhancedPrompt = `nail art design, ${request.prompt}, professional manicure, detailed nail polish, high quality, beautiful nails, studio lighting`;
      
      // Ajout d'optimisations selon la plateforme
      if (request.platform) {
        switch (request.platform.id) {
          case 'pinterest':
            enhancedPrompt += ', pinterest-style, aesthetic, trendy, lifestyle photography';
            break;
          case 'instagram-post':
          case 'instagram-story':
            enhancedPrompt += ', instagram-worthy, social media ready, influencer style';
            break;
          case 'facebook-post':
          case 'facebook-story':
            enhancedPrompt += ', shareable, eye-catching, social media optimized';
            break;
          case 'tiktok':
            enhancedPrompt += ', trending, viral-worthy, gen-z aesthetic';
            break;
        }
      }
      
      // Construction des paramètres avec dimensions
      const params = new URLSearchParams({
        width: request.platform?.dimensions.width.toString() || '512',
        height: request.platform?.dimensions.height.toString() || '512',
        model: 'flux',
        enhance: 'true',
        nologo: 'true',
        private: 'false'
      });

      // URL finale avec le prompt encodé
      const imageUrl = `${API_BASE_URL}/${encodeURIComponent(enhancedPrompt)}?${params.toString()}`;
      
      console.log('URL générée:', imageUrl);
      console.log('Plateforme:', request.platform?.name);
      console.log('Dimensions:', request.platform?.dimensions);
      
      return imageUrl;
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      throw new Error('Impossible de générer l\'image. Veuillez réessayer.');
    }
  }

  async generateNailDesign(request: GenerationRequest): Promise<ApiResponse> {
    try {
      const imageUrl = await this.generateImage(request);
      
      return {
        success: true,
        data: {
          imageUrl,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  // Prompts prédéfinis pour inspiration
  getPresetPrompts(): string[] {
    return [
      'elegant french manicure with gold leaf accents',
      'vibrant sunset gradient with glitter tips',
      'minimalist geometric patterns in rose gold',
      'delicate cherry blossom petals on nude base',
      'cosmic galaxy theme with twinkling stars',
      'luxury marble effect in soft pastels',
      'vintage art nouveau patterns in emerald green',
      'tropical paradise with palm leaf designs',
      'glamorous crystal-encrusted nail tips',
      'sophisticated matte black with gold details',
      'dreamy watercolor splashes in ocean blues',
      'holographic chrome with rainbow reflections',
      'romantic lace patterns in champagne tones'
    ];
  }

  // Prompts spécialisés par plateforme
  getPlatformSpecificPrompts(platformId: string): string[] {
    const basePrompts = {
      'pinterest': [
        'aesthetic minimalist nail art for wedding inspiration',
        'cozy autumn nail designs with warm earth tones',
        'spring garden nail art with delicate flowers',
        'boho chic nails with natural gemstone accents'
      ],
      'instagram-post': [
        'trendy summer nails with neon colors and patterns',
        'luxury nail art perfect for selfies and photos',
        'festival-ready nails with bold colors and glitter',
        'everyday chic nails that look amazing in photos'
      ],
      'tiktok': [
        'viral nail art trend with changing colors',
        'satisfying gradient nails perfect for close-ups',
        'trendy nail design that will get millions of views',
        'aesthetic nails that look amazing on camera'
      ]
    };

    return basePrompts[platformId] || this.getPresetPrompts().slice(0, 4);
  }

  // Prompts automatiques pour génération multiple
  getAutoGenerationPrompts(): string[] {
    return [
      'elegant french manicure with subtle pearl accents',
      'vibrant rainbow gradient with holographic glitter',
      'minimalist black and white geometric lines',
      'delicate pink cherry blossoms on clear base',
      'deep space galaxy with silver stars',
      'luxury white marble with gold veins',
      'vintage floral patterns in emerald and gold',
      'tropical sunset with palm tree silhouettes',
      'glamorous diamond-encrusted accent nails',
      'sophisticated burgundy with rose gold details',
      'dreamy purple and blue watercolor swirls',
      'chrome mirror finish with rainbow reflections',
      'romantic red roses with green leaves',
      'bold zebra print in black and white',
      'abstract neon colors with geometric shapes'
    ];
  }
}

export const pollinationService = new PollinationService();
