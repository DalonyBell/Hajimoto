
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Heart, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Haiku {
  id: string;
  lines: [string, string, string];
  prompt: string;
  createdAt: Date;
}

interface HaikuDisplayProps {
  haiku: Haiku;
  saveHaiku: () => void;
  copyToClipboard: (haiku: Haiku) => void;
}

const HaikuDisplay: React.FC<HaikuDisplayProps> = ({
  haiku,
  saveHaiku,
  copyToClipboard
}) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <div className="haiku-card bg-white/90 backdrop-blur-sm border border-pink-200 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full text-center mb-6">
            <p className="haiku-text text-pink-800">{haiku.lines[0]}</p>
            <p className="haiku-text mt-2 text-pink-800">{haiku.lines[1]}</p>
            <p className="haiku-text mt-2 text-pink-800">{haiku.lines[2]}</p>
          </div>
          
          <div className="flex items-center justify-between w-full mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-pink-400 hover:text-pink-700 rounded-full">
                    <Info size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm">Prompt: {haiku.prompt}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => copyToClipboard(haiku)}
                className="text-pink-400 hover:text-pink-700 rounded-full"
              >
                <Copy size={18} />
              </Button>
              
              <Button
                variant="ghost" 
                size="icon"
                onClick={saveHaiku}
                className="text-pink-400 hover:text-pink-700 rounded-full"
              >
                <Heart size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaikuDisplay;
