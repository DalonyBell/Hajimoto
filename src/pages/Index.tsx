
import React from 'react';
import HaikuGenerator from '../components/HaikuGenerator';
import CherryBlossom from '../components/CherryBlossom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100">
      <CherryBlossom />
      <main className="w-full py-10 relative z-10">
        <HaikuGenerator />
      </main>
    </div>
  );
};

export default Index;
