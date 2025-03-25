
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Book, Copy, Trash2 } from "lucide-react";

interface Haiku {
  id: string;
  lines: [string, string, string];
  prompt: string;
  createdAt: Date;
}

interface SavedHaikusProps {
  haikus: Haiku[];
  deleteHaiku: (id: string) => void;
  copyToClipboard: (haiku: Haiku) => void;
}

const SavedHaikus: React.FC<SavedHaikusProps> = ({
  haikus,
  deleteHaiku,
  copyToClipboard
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-700 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <Book size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md sm:max-w-lg bg-pink-50 border-pink-200">
        <SheetHeader>
          <SheetTitle className="text-pink-800">Your Saved Haikus</SheetTitle>
          <SheetDescription className="text-pink-600">
            Your collection of saved haiku poetry.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)] pr-2">
          {haikus.length === 0 ? (
            <div className="text-center text-pink-500 py-10">
              <p>You haven't saved any haikus yet.</p>
              <p className="mt-2 text-sm">Create and save some beautiful poetry!</p>
            </div>
          ) : (
            haikus.map((haiku) => (
              <div key={haiku.id} className="haiku-card bg-white/90 border-pink-200">
                <div className="text-sm text-pink-400 mb-2">
                  {new Date(haiku.createdAt).toLocaleDateString()}
                </div>
                <div className="w-full mb-4">
                  <p className="haiku-text text-pink-800">{haiku.lines[0]}</p>
                  <p className="haiku-text mt-1 text-pink-800">{haiku.lines[1]}</p>
                  <p className="haiku-text mt-1 text-pink-800">{haiku.lines[2]}</p>
                </div>
                
                <div className="text-xs text-pink-500 italic mb-2">
                  Prompt: {haiku.prompt}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(haiku)}
                    className="text-pink-400 hover:text-pink-700 h-8 w-8 rounded-full"
                  >
                    <Copy size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteHaiku(haiku.id)}
                    className="text-pink-400 hover:text-red-500 h-8 w-8 rounded-full"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SavedHaikus;
