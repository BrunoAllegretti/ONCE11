import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Loader, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  path: string;
  scale?: number;
  position?: [number, number, number];
}

const RotatingModel: React.FC<ModelProps> = ({ path, scale = 1, position = [0, 0, 0] }) => {
  const model = useGLTF(path);
  const meshRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={meshRef} position={position} scale={scale} dispose={null}>
      <primitive object={model.scene} />
    </group>
  );
};

const modelConfigs = [
  {
    name: 'Basquete',
    path: '/ONCE11/mdl3D/mdls/basquete.glb',
    scale: 1.2,
  },
  {
    name: 'Futebol',
    path: '/ONCE11/mdl3D/mdls/futebol.glb',
    scale: 1.2,
  },
  {
    name: 'Volei',
    path: '/ONCE11/mdl3D/mdls/volei.glb',
    scale: 1.2,
  },
];

const ModelDisplay: React.FC = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prev) => (prev + 1) % modelConfigs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentModel = modelConfigs[currentModelIndex];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />

        <React.Suspense fallback={null}>
          <RotatingModel
            key={currentModel.name}
            path={currentModel.path}
            scale={currentModel.scale}
          />
        </React.Suspense>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <Loader />
    </div>
  );
};

export default ModelDisplay;
