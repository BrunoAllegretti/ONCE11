import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Loader, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveBallProps {
  path: string;
  scale?: number;
}

const InteractiveBall: React.FC<InteractiveBallProps> = ({ path, scale = 1.3 }) => {
  const gltf = useGLTF(path) as any;
  const groupRef = useRef<THREE.Group | null>(null);
  const { viewport } = useThree();
  
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isDragging) {
      // Apply momentum
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      
      targetRotation.current.y += velocity.current.x * delta * 2;
      targetRotation.current.x += velocity.current.y * delta * 2;
      // Base continuous rotation to keep model spinning
      targetRotation.current.y += 0.3 * delta;
      
      // Clamp X rotation
      targetRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.current.x));
    }

    // Smooth interpolation
    setRotation(prev => ({
      x: THREE.MathUtils.lerp(prev.x, targetRotation.current.x, 0.1),
      y: THREE.MathUtils.lerp(prev.y, targetRotation.current.y, 0.1)
    }));

    groupRef.current.rotation.x = rotation.x;
    groupRef.current.rotation.y = rotation.y;

    // Subtle floating animation
    if (!isDragging) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    e.stopPropagation();

    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    velocity.current.x = deltaX * 0.01;
    velocity.current.y = -deltaY * 0.01;

    targetRotation.current.y += deltaX * 0.01;
    targetRotation.current.x += -deltaY * 0.01;
    
    targetRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.current.x));

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

const modelConfigs = [
  { name: "Basquete", path: "/ONCE11/mdl3D/mdls/basquete.glb", scale: 1.4 },
  { name: "Futebol", path: "/ONCE11/mdl3D/mdls/futebol.glb", scale: 1.4 },
  { name: "Volei", path: "/ONCE11/mdl3D/mdls/volei.glb", scale: 1.4 },
  { name: "Tennis", path: "/ONCE11/mdl3D/mdls/tennis.glb", scale: 1.4 },
];

const ModelDisplay: React.FC = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prev) => (prev + 1) % modelConfigs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentModel = modelConfigs[currentModelIndex];

  return (
    <div className="model-display-wrapper">
      <div className="model-canvas-container">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={0.4}
            color="#a8ff3a"
          />
          <spotLight
            position={[-10, 10, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.6}
            castShadow
          />
          <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />
          
          <React.Suspense fallback={null}>
            <InteractiveBall
              key={currentModel.name}
              path={currentModel.path}
              scale={currentModel.scale}
            />
          </React.Suspense>
        </Canvas>
        <Loader
          containerStyles={{
            background: "rgba(0, 74, 173, 0.8)",
          }}
          innerStyles={{
            background: "#a8ff3a",
          }}
          barStyles={{
            background: "#a8ff3a",
          }}
        />
      </div>
      
      <div className="model-indicator">
        {modelConfigs.map((model, idx) => (
          <button
            key={model.name}
            className={`indicator-dot ${idx === currentModelIndex ? "active" : ""}`}
            onClick={() => setCurrentModelIndex(idx)}
            aria-label={`Ver ${model.name}`}
          />
        ))}
      </div>
      
      <div className="model-label">
        <span className="model-name">{currentModel.name}</span>
        <span className="model-hint">Arraste para interagir</span>
      </div>
    </div>
  );
};

export default ModelDisplay;