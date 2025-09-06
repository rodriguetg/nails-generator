import { useState, useCallback } from 'react';
import { pollinationService } from '../services/pollinationApi';
import { NailDesign, GenerationRequest, SocialPlatform } from '../types';

export const useNailGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<NailDesign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);

  const generateDesign = useCallback(async (request: GenerationRequest) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Si des plateformes sont sélectionnées, générer pour chacune
      if (selectedPlatforms.length > 0) {
        const promises = selectedPlatforms.map(async (platform) => {
          const response = await pollinationService.generateNailDesign({
            ...request,
            platform
          });
          
          if (response.success && response.data) {
            return {
              id: response.data.id,
              prompt: request.prompt,
              imageUrl: response.data.imageUrl,
              createdAt: new Date(),
              style: request.style,
              platform,
              dimensions: platform.dimensions
            };
          }
          return null;
        });

        const results = await Promise.all(promises);
        const validDesigns = results.filter(design => design !== null) as NailDesign[];
        
        if (validDesigns.length > 0) {
          setGeneratedDesigns(prev => [...validDesigns, ...prev]);
          return validDesigns;
        }
      } else {
        // Génération standard sans plateforme spécifique
        const response = await pollinationService.generateNailDesign(request);
        
        if (response.success && response.data) {
          const newDesign: NailDesign = {
            id: response.data.id,
            prompt: request.prompt,
            imageUrl: response.data.imageUrl,
            createdAt: new Date(),
            style: request.style
          };

          setGeneratedDesigns(prev => [newDesign, ...prev]);
          return newDesign;
        }
      }
      
      throw new Error('Échec de la génération');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [selectedPlatforms]);

  const generateMultipleDesigns = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const autoPrompts = pollinationService.getAutoGenerationPrompts();
      const targetPlatforms = selectedPlatforms.length > 0 ? selectedPlatforms : [pollinationService.getSocialPlatforms()[0]];
      
      const promises = autoPrompts.slice(0, 4).map(async (prompt, index) => {
        // Délai progressif pour éviter la surcharge
        await new Promise(resolve => setTimeout(resolve, index * 1000));
        
        const platform = targetPlatforms[index % targetPlatforms.length];
        const response = await pollinationService.generateNailDesign({ 
          prompt,
          platform 
        });
        
        if (response.success && response.data) {
          return {
            id: response.data.id,
            prompt,
            imageUrl: response.data.imageUrl,
            createdAt: new Date(),
            platform,
            dimensions: platform?.dimensions
          };
        }
        return null;
      });

      const results = await Promise.all(promises);
      const validDesigns = results.filter(design => design !== null) as NailDesign[];
      
      if (validDesigns.length > 0) {
        setGeneratedDesigns(prev => [...validDesigns, ...prev]);
      } else {
        throw new Error('Aucun design n\'a pu être généré');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [selectedPlatforms]);

  const clearDesigns = useCallback(() => {
    setGeneratedDesigns([]);
    setError(null);
  }, []);

  const removeDesign = useCallback((id: string) => {
    setGeneratedDesigns(prev => prev.filter(design => design.id !== id));
  }, []);

  const addDesigns = useCallback((designs: NailDesign[]) => {
    setGeneratedDesigns(prev => [...designs, ...prev]);
  }, []);

  return {
    isGenerating,
    generatedDesigns,
    error,
    selectedPlatforms,
    setSelectedPlatforms,
    generateDesign,
    generateMultipleDesigns,
    clearDesigns,
    removeDesign,
    addDesigns
  };
};
