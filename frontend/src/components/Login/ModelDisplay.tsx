import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Loader, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PhysicsBallProps {
  path: string;
  scale?: number;
  radius?: number;
  restitution?: number; // bounce factor (0..1)
  linearDamping?: number; // 0..1 per-frame damping
}

const PhysicsBall: React.FC<PhysicsBallProps> = ({
  path,
  scale = 1,
  radius = 0.9,
  restitution = 0.95, // high restitution -> bouncy (zero-gravity feel)
  linearDamping = 0.998, // slight damping so it eventually stops
}) => {
  const gltf = useGLTF(path) as any;
  const groupRef = useRef<THREE.Group | null>(null);

  // position and velocity (only X and Y used; Z kept fixed)
  const pos = useRef(new THREE.Vector3(0, 0, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));

  // dragging state & last pointer sample to compute release velocity
  const dragging = useRef(false);
  const lastPointer = useRef<THREE.Vector3 | null>(null);
  const lastTime = useRef<number | null>(null);
  const planeZ = 0; // keep object in Z=0 plane

  // world bounds (centered at origin)
  const bounds = { x: 2.2, y: 2.2 }; // tweak to fit your scene

  // update loop
  useFrame((state, delta) => {
    if (!dragging.current) {
      // integrate velocity (no gravity)
      pos.current.addScaledVector(vel.current, delta);

      // collisions with bounds -> invert corresponding velocity component
      // left / right (X)
      if (pos.current.x - radius < -bounds.x) {
        pos.current.x = -bounds.x + radius;
        vel.current.x = -vel.current.x * restitution;
      } else if (pos.current.x + radius > bounds.x) {
        pos.current.x = bounds.x - radius;
        vel.current.x = -vel.current.x * restitution;
      }

      // bottom / top (Y)
      if (pos.current.y - radius < -bounds.y) {
        pos.current.y = -bounds.y + radius;
        vel.current.y = -vel.current.y * restitution;
      } else if (pos.current.y + radius > bounds.y) {
        pos.current.y = bounds.y - radius;
        vel.current.y = -vel.current.y * restitution;
      }

      // damping
      vel.current.multiplyScalar(linearDamping);
    } else {
      // while dragging keep velocity small so it doesn't jump
      vel.current.multiplyScalar(0.9);
    }

    // apply to object (keep Z constant)
    if (groupRef.current) {
      groupRef.current.position.set(pos.current.x, pos.current.y, planeZ);
      // optionally add a little rotation to look nicer
      groupRef.current.rotation.y += 0.6 * delta;
    }
  });

  // pointer handlers attached to interactive wrapper
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    dragging.current = true;
    lastPointer.current = e.point.clone();
    lastPointer.current.z = planeZ;
    lastTime.current = e.timeStamp || performance.now();
    // zero velocity while user holds
    vel.current.set(0, 0, 0);
  };

  const handlePointerMove = (e: any) => {
    if (!dragging.current) return;
    e.stopPropagation();
    const now = e.timeStamp || performance.now();
    const p = e.point.clone();
    // constrain to planeZ
    p.z = planeZ;

    if (lastPointer.current && lastTime.current != null) {
      const dt = Math.max((now - lastTime.current) / 1000, 1e-4);
      // move only X and Y (user can drag horizontally & vertically)
      const dx = p.x - lastPointer.current.x;
      const dy = p.y - lastPointer.current.y;
      // immediate position set
      pos.current.x = p.x;
      pos.current.y = p.y;
      // velocity sample based on pointer motion (scale for nicer throw)
      vel.current.set(dx / dt * 0.9, dy / dt * 0.9, 0);
    } else {
      pos.current.x = p.x;
      pos.current.y = p.y;
    }

    lastPointer.current = p;
    lastTime.current = now;
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    dragging.current = false;
    lastPointer.current = null;
    lastTime.current = null;
    // on release vel.current already set from last pointerMove -> object will continue and bounce
  };

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      <group
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
};

/* ---------- main display component ---------- */

const modelConfigs = [
  { name: "Basquete", path: "/ONCE11/mdl3D/mdls/basquete.glb", scale: 1.2 },
  { name: "Futebol", path: "/ONCE11/mdl3D/mdls/futebol.glb", scale: 1.2 },
  { name: "Volei", path: "/ONCE11/mdl3D/mdls/volei.glb", scale: 1.2 },
  { name: "Tennis", path: "/ONCE11/mdl3D/mdls/tennis.glb", scale: 1.2 },
];

const ModelDisplay: React.FC = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((p) => (p + 1) % modelConfigs.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentModel = modelConfigs[currentModelIndex];

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 300 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <React.Suspense fallback={null}>
          <PhysicsBall
            key={currentModel.name}
            path={currentModel.path}
            scale={currentModel.scale}
            radius={0.9}
            restitution={0.95}
            linearDamping={0.997}
          />
        </React.Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default ModelDisplay;