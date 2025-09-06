import React from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { DesignGallery } from './components/DesignGallery';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { AutoGenerateCard } from './components/AutoGenerateCard';
import { PlatformSelector } from './components/PlatformSelector';
import { TemplateSelector } from './components/TemplateSelector';
import { FloatingAnimations } from './components/FloatingAnimations';
import { useNailGeneration } from './hooks/useNailGeneration';
import { useTemplates } from './hooks/useTemplates';
import { SocialPlatform } from './types';

function App() {
  const {
    isGenerating,
    generatedDesigns,
    error,
    selectedPlatforms,
    setSelectedPlatforms,
    generateDesign,
    generateMultipleDesigns,
    removeDesign,
    clearDesigns,
    addDesigns
  } = useNailGeneration();

  const {
    isGeneratingTemplate,
    templateError,
    generateTemplateDesigns
  } = useTemplates();

  const isAnyLoading = isGenerating || isGeneratingTemplate;

  const handlePromptSubmit = async (prompt: string) => {
    try {
      await generateDesign({ prompt });
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    }
  };

  const handleAutoGenerate = async () => {
    try {
      await generateMultipleDesigns();
    } catch (error) {
      console.error('Erreur lors de la génération automatique:', error);
    }
  };

  const handleTemplateSelect = async (templatePrompts: string[]) => {
    try {
      const newDesigns = await generateTemplateDesigns(templatePrompts, selectedPlatforms);
      // Ajouter les designs générés à la galerie
      addDesigns(newDesigns);
    } catch (error) {
      console.error('Erreur lors de la génération de template:', error);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handlePlatformToggle = (platform: SocialPlatform) => {
    setSelectedPlatforms(prev => {
      const isSelected = prev.some(p => p.id === platform.id);
      if (isSelected) {
        return prev.filter(p => p.id !== platform.id);
      } else {
        return [...prev, platform];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 relative">
      {/* Animations flottantes */}
      <FloatingAnimations />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Section principale avec grid moderne */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <PromptInput 
              onSubmit={handlePromptSubmit} 
              isLoading={isAnyLoading} 
            />
          </div>
          <div className="lg:col-span-1">
            <AutoGenerateCard 
              onAutoGenerate={handleAutoGenerate}
              isLoading={isAnyLoading}
            />
          </div>
        </div>

        {/* Sélecteur de plateformes */}
        <div className="mb-8">
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            onPlatformToggle={handlePlatformToggle}
          />
        </div>

        {/* Templates d'occasions */}
        <div className="mb-12">
          <TemplateSelector
            onTemplateSelect={handleTemplateSelect}
            isLoading={isAnyLoading}
          />
        </div>

        {/* États et messages */}
        {(error || templateError) && !isAnyLoading && (
          <div className="mb-8">
            <ErrorMessage 
              message={error || templateError || 'Erreur inconnue'} 
              onRetry={handleRetry} 
            />
          </div>
        )}

        {isAnyLoading && (
          <div className="mb-8">
            <LoadingSpinner 
              message={
                isGeneratingTemplate 
                  ? "Création des designs de template..." 
                  : "Création de vos designs d'ongles..."
              } 
            />
          </div>
        )}

        {/* Actions rapides */}
        {generatedDesigns.length > 0 && (
          <div className="flex justify-center mb-8">
            <button
              onClick={clearDesigns}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-300 font-medium"
            >
              Effacer toutes les créations
            </button>
          </div>
        )}

        {/* Galerie */}
        <DesignGallery 
          designs={generatedDesigns} 
          onRemove={removeDesign} 
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
