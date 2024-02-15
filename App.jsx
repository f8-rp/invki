// App.jsx
import React, { useRef, useEffect } from 'react';
import ThreeScene from './ThreeScene';

function App() {
  const canvasRef = useRef(null);
  let threeScene;

  useEffect(() => {
    if (canvasRef.current) {
      threeScene = new ThreeScene(canvasRef.current);

      // Set the initial arm angles
      threeScene.setArmAngles(45, 45, -90);

      // After 4 seconds, set the arm angles to 0
      setTimeout(() => {
        threeScene.setArmAngles(-15, 40, 10);
      }, 4000);

      const animate = () => {
        if (threeScene) {
          threeScene.animate();
        }
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (threeScene) {
          threeScene.cleanup();
        }
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', display: 'block' }}
    />
  );
}

export default App;
