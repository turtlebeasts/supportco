import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";

export default function SupportOrb(props) {
  const ref = useRef();
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.25;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={ref} {...props} castShadow receiveShadow>
        <icosahedronGeometry args={[1.2, 1]} />
        {/* Pretty glassy material (falls back if heavy on mobile) */}
        <MeshTransmissionMaterial
          thickness={0.5}
          anisotropy={0.2}
          roughness={0.2}
          chromaticAberration={0.02}
          color="#67e8f9"
          ior={1.2}
          attenuationColor="#06b6d4"
          attenuationDistance={2.5}
        />
      </mesh>
    </Float>
  );
}
