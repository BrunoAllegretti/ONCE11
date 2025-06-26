import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import './Banner.css';
import Once from '../../assets/img/Once11.png';
import Fundo from '../../assets/img/nossosProdutos.png';

// Componente para o modelo 3D do tênis
function TenisModel() {
  const { scene } = useGLTF('/3D/tenis.glb');
  const meshRef = useRef<Group>(null);

  // Animação de rotação
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Velocidade de rotação
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={[4, 4, 4]} 
      position={[0, 0, 0]} 
    />
  );
}

export default function Banner() {
  return (
    <div className="banner">
      <div className="tenis-3d-container">
        {/* Imagem de fundo */}
        <div className="background-image">
          <img src={Fundo} alt="Background" className='fundo'/>
        </div>
        
        {/* Canvas do Three.js para o modelo 3D */}
        <div className="canvas-container">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            
            <Suspense fallback={null}>
              <TenisModel />
            </Suspense>
            
            {/* Controles opcionais para interação */}
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate={false}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Canvas>
        </div>
      </div>
      
      <div className="lb">
        <h2>Bem-vindo a</h2>
        <img className="onceB" src={Once} alt="Once11" />
      </div>
    </div>
  );
}
useGLTF.preload('/3D/tenis.glb');



