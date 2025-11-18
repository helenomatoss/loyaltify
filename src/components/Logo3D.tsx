import { useRef, useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";
import logoTexture from "@/assets/logo-3d.png";

const Logo3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Load the logo texture
  const texture = useLoader(THREE.TextureLoader, logoTexture);
  
  // Determine color based on theme - use #00DF88 for consistency
  const isLightMode = theme === "light";
  const logoColor = "#00DF88";
  
  // Create material with color tint based on theme
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      color: "#00DF88",
      emissive: "#00DF88",
      emissiveIntensity: isLightMode ? 0.2 : 0.4,
      metalness: 0.5,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
  }, [texture, isLightMode]);
  
  // Continuous rotation animation with hover speed boost
  useFrame((state, delta) => {
    if (meshRef.current) {
      const rotationSpeed = isHovered ? 1.5 : 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      material={material}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[2.5, 2.5]} />
    </mesh>
  );
};

export default Logo3D;
