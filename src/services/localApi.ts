import { NailDesign, GenerationRequest, SocialPlatform } from '../types';
import { pollinationService } from './pollinationApi';

class LocalApiService {
  private baseUrl = window.location.origin;
  
  // Simule un endpoint d'API pour la génération automatique
  async generateAutoDesigns(platforms: SocialPlatform[] = []): Promise<NailDesign[]> {
    try {
      const autoPrompts = pollinationService.getAutoGenerationPrompts();
      const selectedPrompts = this.shuffleArray(autoPrompts).slice(0, 4);
      const targetPlatforms = platforms.length > 0 ? platforms : [pollinationService.getSocialPlatforms()[0]];
      
      const designs: NailDesign[] = [];
      
      for (let i = 0; i < selectedPrompts.length; i++) {
        const prompt = selectedPrompts[i];
        const platform = targetPlatforms[i % targetPlatforms.length];
        
        // Délai pour éviter la surcharge
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const response = await pollinationService.generateNailDesign({
          prompt,
          platform
        });
        
        if (response.success && response.data) {
          designs.push({
            id: response.data.id,
            prompt,
            imageUrl: response.data.imageUrl,
            createdAt: new Date(),
            platform,
            dimensions: platform?.dimensions
          });
        }
      }
      
      return designs;
    } catch (error) {
      console.error('Erreur lors de la génération automatique:', error);
      throw new Error('Impossible de générer les designs automatiquement');
    }
  }

  // Simule un endpoint pour les templates d'occasions
  async generateTemplateDesigns(templatePrompts: string[], platforms: SocialPlatform[] = []): Promise<NailDesign[]> {
    try {
      const targetPlatforms = platforms.length > 0 ? platforms : [pollinationService.getSocialPlatforms()[0]];
      const designs: NailDesign[] = [];
      
      for (let i = 0; i < templatePrompts.length; i++) {
        const prompt = templatePrompts[i];
        const platform = targetPlatforms[i % targetPlatforms.length];
        
        // Délai pour éviter la surcharge
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        const response = await pollinationService.generateNailDesign({
          prompt,
          platform
        });
        
        if (response.success && response.data) {
          designs.push({
            id: response.data.id,
            prompt,
            imageUrl: response.data.imageUrl,
            createdAt: new Date(),
            platform,
            dimensions: platform?.dimensions
          });
        }
      }
      
      return designs;
    } catch (error) {
      console.error('Erreur lors de la génération de template:', error);
      throw new Error('Impossible de générer les designs du template');
    }
  }

  // Endpoint pour obtenir les statistiques de l'app
  async getStats() {
    // Simule des statistiques stockées localement
    const stats = localStorage.getItem('nailart-stats');
    if (stats) {
      return JSON.parse(stats);
    }
    
    return {
      totalDesigns: 0,
      favoritePrompts: [],
      mostUsedPlatforms: []
    };
  }

  // Endpoint pour sauvegarder les statistiques
  async updateStats(newDesign: NailDesign) {
    try {
      const currentStats = await this.getStats();
      const updatedStats = {
        totalDesigns: currentStats.totalDesigns + 1,
        favoritePrompts: currentStats.favoritePrompts,
        mostUsedPlatforms: currentStats.mostUsedPlatforms
      };
      
      // Mise à jour des prompts favoris
      const promptIndex = updatedStats.favoritePrompts.findIndex(
        (p: any) => p.prompt === newDesign.prompt
      );
      
      if (promptIndex >= 0) {
        updatedStats.favoritePrompts[promptIndex].count++;
      } else {
        updatedStats.favoritePrompts.push({
          prompt: newDesign.prompt,
          count: 1
        });
      }
      
      // Mise à jour des plateformes les plus utilisées
      if (newDesign.platform) {
        const platformIndex = updatedStats.mostUsedPlatforms.findIndex(
          (p: any) => p.platform === newDesign.platform?.name
        );
        
        if (platformIndex >= 0) {
          updatedStats.mostUsedPlatforms[platformIndex].count++;
        } else {
          updatedStats.mostUsedPlatforms.push({
            platform: newDesign.platform.name,
            count: 1
          });
        }
      }
      
      localStorage.setItem('nailart-stats', JSON.stringify(updatedStats));
      return updatedStats;
    } catch (error) {
      console.error('Erreur lors de la mise à jour des stats:', error);
    }
  }

  // Utilitaire pour mélanger un tableau
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Endpoint pour exporter la galerie
  async exportGallery(designs: NailDesign[]) {
    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        designs: designs.map(design => ({
          id: design.id,
          prompt: design.prompt,
          platform: design.platform?.name,
          dimensions: design.dimensions,
          createdAt: design.createdAt
        })),
        totalCount: designs.length
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nail-art-gallery-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      return false;
    }
  }
}

export const localApiService = new LocalApiService();
