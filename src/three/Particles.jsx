import { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Particles({ count = 1200, radius = 6 }) {
  const positions = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(radius * Math.cbrt(Math.random()));
      pts.set([v.x, v.y, v.z], i * 3);
    }
    return pts;
  }, [count, radius]);

  return (
    <group>
      <Points positions={positions}>
        <PointMaterial
          transparent
          size={0.01}
          sizeAttenuation
          depthWrite={false}
          color="#a5f3fc"
        />
      </Points>
    </group>
  );
}
