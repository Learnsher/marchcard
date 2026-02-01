import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Card3DProps {
  isRevealed: boolean;
}

export const Card3D = ({ isRevealed }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Placeholder GLTFLoader path - can be swapped later
  // Uncomment below when you have a .glb model:
  // const { scene } = useGLTF('/path/to/card-model.glb');

  useFrame((state) => {
    if (meshRef.current && !isRevealed) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.1, 0, 0]}>
      <planeGeometry args={[3, 4, 32, 32]} />
      <meshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        emissive="#d4af37"
        emissiveIntensity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Preload GLB model when available
// useGLTF.preload('/path/to/card-model.glb');
