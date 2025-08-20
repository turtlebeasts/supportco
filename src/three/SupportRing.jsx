import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

export default function SupportRing({ radius = 2.2, count = 24, speed = 0.3 }) {
  const ref = useRef();

  // positions around a circle
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      arr.push(
        new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)
      );
    }
    return arr;
  }, [count, radius]);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * speed;
  });

  return (
    <group ref={ref}>
      {/* faint ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 96, 1]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
      </mesh>

      {/* glowing nodes */}
      <Instances limit={count}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#0ea5b8"
          emissive="#67e8f9"
          emissiveIntensity={1.6}
        />
        {positions.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
    </group>
  );
}
