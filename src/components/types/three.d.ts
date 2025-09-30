// types/three.d.ts
declare module '*.glb' {
    const content: string;
    export default content;
  }
  
  declare module '*.gltf' {
    const content: string;
    export default content;
  }
  
  // Extensão dos tipos do Three.js para melhor compatibilidade
  import { Object3D } from 'three';
  
  export interface GLTFResult {
    nodes: { [name: string]: Object3D };
    materials: { [name: string]: any };
    scene: Object3D;
  }
  
  export interface TenisModelProps {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
  }
  
  