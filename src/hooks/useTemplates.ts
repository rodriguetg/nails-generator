import { useState, useCallback } from 'react';
import { localApiService } from '../services/localApi';
import { NailDesign, SocialPlatform } from '../types';

export const useTemplates = () => {
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);
  const [templateError, setTemplateError] = useState<string | null>(null);

  const generateTemplateDesigns = useCallback(async (
    templatePrompts: string[],
    selectedPlatforms: SocialPlatform[] = []
  ): Promise<NailDesign[]> => {
    setIsGeneratingTemplate(true);
    setTemplateError(null);

    try {
      const designs = await localApiService.generateTemplateDesigns(
        templatePrompts,
        selectedPlatforms
      );
      
      // Mise à jour des statistiques pour chaque design
      for (const design of designs) {
        await localApiService.updateStats(design);
      }
      
      return designs;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setTemplateError(errorMessage);
      throw error;
    } finally {
      setIsGeneratingTemplate(false);
    }
  }, []);

  return {
    isGeneratingTemplate,
    templateError,
    generateTemplateDesigns
  };
};
