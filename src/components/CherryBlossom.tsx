
import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  swayFactor: number;
  swaySpeed: number;
  opacity: number;
}

const CherryBlossom: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  
  useEffect(() => {
    // Initial petals creation
    const initialPetals = Array.from({ length: 30 }, (_, i) => createPetal(i));
    setPetals(initialPetals);
    
    // Animation loop
    let lastTime = 0;
    let petalCount = 30;
    
    const animatePetals = (time: number) => {
      // Add new petals occasionally
      if (time - lastTime > 500) { // Add a new petal every 500ms
        setPetals(prevPetals => {
          const newPetal = createPetal(petalCount++);
          return [...prevPetals.filter(p => p.y < window.innerHeight + 100), newPetal];
        });
        lastTime = time;
      }
      
      // Update petal positions
      setPetals(prevPetals => 
        prevPetals.map(petal => {
          // Calculate new position
          const newY = petal.y + petal.fallSpeed;
          const swayAmount = Math.sin(time * petal.swaySpeed * 0.001) * petal.swayFactor;
          const newX = petal.x + swayAmount;
          const newRotation = petal.rotation + petal.rotationSpeed;
          
          return {
            ...petal,
            x: newX,
            y: newY,
            rotation: newRotation
          };
        })
      );
      
      requestAnimationFrame(animatePetals);
    };
    
    const animationId = requestAnimationFrame(animatePetals);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Create a new petal with random properties
  const createPetal = (id: number): Petal => {
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 100, // Start above the visible screen
      size: 10 + Math.random() * 15,
      rotation: Math.random() * 360,
      rotationSpeed: 0.2 + Math.random() * 0.8,
      fallSpeed: 0.5 + Math.random() * 1.5,
      swayFactor: 0.5 + Math.random() * 2,
      swaySpeed: 0.3 + Math.random() * 0.7,
      opacity: 0.6 + Math.random() * 0.4
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute rounded-full bg-pink-200"
          style={{
            left: `${petal.x}px`,
            top: `${petal.y}px`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.9}px`,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotation}deg)`,
            boxShadow: 'inset 1px 1px 1px rgba(255, 255, 255, 0.5)',
            background: 'linear-gradient(135deg, #ffd1dc 0%, #ffb6c1 100%)'
          }}
        />
      ))}
    </div>
  );
};

export default CherryBlossom;
