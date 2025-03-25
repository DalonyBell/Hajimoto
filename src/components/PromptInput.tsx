
import React, { KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  generateHaiku: () => void;
  isGenerating: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  generateHaiku,
  isGenerating
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGenerating && prompt.trim()) {
      generateHaiku();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter key without shift generates haiku
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isGenerating && prompt.trim()) {
        generateHaiku();
      }
    }
    // Shift + Enter allows for new line creation
    // No need to handle this case as it's the default textarea behavior
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="backdrop-blur-sm bg-white/80 border border-pink-200 rounded-2xl p-4 transition-all duration-300 shadow-md">
        <Textarea
          placeholder="Enter a prompt for your haiku... (e.g., autumn leaves, ocean waves)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none focus:ring-0 resize-none text-base placeholder:text-pink-300 text-pink-700"
          rows={3}
          disabled={isGenerating}
        />
        <div className="flex justify-end mt-2">
          <Button 
            type="submit" 
            disabled={isGenerating || !prompt.trim()}
            className="button-effect rounded-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Manifesting
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate <Send size={16} />
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PromptInput;
