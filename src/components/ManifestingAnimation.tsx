
import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ManifestingAnimation: React.FC = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full bg-white/90 backdrop-blur-sm border border-pink-200 shadow-lg rounded-lg p-8 text-center">
          <h3 className="text-xl text-pink-800 mb-4 font-light animate-pulse">
            Hajimoto is manifesting{dots}
          </h3>
          
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-pink-100" />
            <Skeleton className="h-4 w-full bg-pink-100" />
            <Skeleton className="h-4 w-full bg-pink-100" />
          </div>
          
          <div className="mt-6 w-24 h-24 mx-auto">
            <svg 
              className="w-full h-full text-pink-400 animate-spin opacity-70" 
              viewBox="0 0 24 24"
            >
              <path 
                fill="currentColor" 
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" 
                opacity=".25"
              />
              <path 
                fill="currentColor" 
                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestingAnimation;
