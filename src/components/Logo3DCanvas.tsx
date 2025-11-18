import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Logo3D from "./Logo3D";

const Logo3DCanvas = () => {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 3]} intensity={0.5} />
        
        {/* 3D Logo */}
        <Logo3D />
        
        {/* Optional: Allow user interaction */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Logo3DCanvas;
