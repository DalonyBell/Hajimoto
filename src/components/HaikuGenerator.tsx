
import React from 'react';
import PromptInput from './PromptInput';
import HaikuDisplay from './HaikuDisplay';
import SavedHaikus from './SavedHaikus';
import { useHaikuGenerator } from '../hooks/useHaikuGenerator';
import ManifestingAnimation from './ManifestingAnimation';

const HaikuGenerator: React.FC = () => {
  const {
    prompt,
    setPrompt,
    currentHaiku,
    savedHaikus,
    isGenerating,
    generateHaiku,
    saveHaiku,
    deleteHaiku,
    copyToClipboard
  } = useHaikuGenerator();

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 md:p-8">
      <SavedHaikus 
        haikus={savedHaikus} 
        deleteHaiku={deleteHaiku} 
        copyToClipboard={copyToClipboard} 
      />
      
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2 text-pink-800">
          Hajimoto
        </h1>
        <p className="text-pink-600 text-center mb-8 max-w-md">
          Enter a prompt and let Hajimoto create a beautiful haiku inspired by your words.
        </p>
        
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          generateHaiku={generateHaiku}
          isGenerating={isGenerating}
        />
        
        {isGenerating && (
          <ManifestingAnimation />
        )}
        
        {!isGenerating && currentHaiku && (
          <HaikuDisplay
            haiku={currentHaiku}
            saveHaiku={saveHaiku}
            copyToClipboard={copyToClipboard}
          />
        )}
      </div>
    </div>
  );
};

export default HaikuGenerator;
