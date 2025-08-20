import { useMemo, useState } from "react";
import { Instances, Instance, ContactShadows, Grid } from "@react-three/drei";
import * as THREE from "three";

/** Deterministic RNG so the city looks the same on each reload */
function rng(seed = 42) {
  let t = seed >>> 0;
  return () => (
    (t = (t + 0x6d2b79f5) | 0),
    (Math.imul(t ^ (t >>> 15), 1 | t) >>> 0) / 4294967296
  );
}

export default function City({
  cols = 12,
  rows = 12,
  gap = 1.6, // spacing between plots
  hMin = 0.6, // min building height
  hMax = 4.5, // max building height
  seed = 12,
  softShadows = true,
}) {
  const rand = useMemo(() => rng(seed), [seed]);
  const [hovered, setHovered] = useState(null);

  // Precompute building transforms + colors
  const buildings = useMemo(() => {
    const items = [];
    const ox = -((cols - 1) * gap) / 2;
    const oz = -((rows - 1) * gap) / 2;
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        const i = z * cols + x;
        const px = ox + x * gap;
        const pz = oz + z * gap;
        // Make center district taller, edges shorter
        const centerFalloff =
          1 -
          Math.min(
            1,
            Math.hypot((x - cols / 2) / cols, (z - rows / 2) / rows) * 1.6
          );
        const height =
          hMin + centerFalloff * (hMax - hMin) * (0.6 + 0.4 * rand());
        const w = 0.9 + rand() * 0.6;
        const d = 0.9 + rand() * 0.6;

        // cool cyan/steel palette
        const c = new THREE.Color().setHSL(
          0.55 + rand() * 0.03,
          0.45,
          0.45 + rand() * 0.1
        );

        items.push({
          key: i,
          position: [px, height / 2, pz],
          scale: [w, height, d],
          color: `#${c.getHexString()}`,
        });
      }
    }
    return items;
  }, [cols, rows, gap, hMin, hMax, rand]);

  return (
    <group>
      {/* Ground grid (roads feel) */}
      <Grid
        position={[0, 0.001, 0]}
        args={[cols * gap + 8, rows * gap + 8]}
        cellSize={gap}
        cellThickness={0.6}
        cellColor="#0ea5b8"
        sectionSize={gap * 4}
        sectionThickness={1.2}
        sectionColor="#0891b2"
        fadeDistance={32}
        infiniteGrid={false}
      />

      {/* Buildings (instanced for perf) */}
      <Instances castShadow receiveShadow limit={cols * rows}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.6} metalness={0.2} />

        {buildings.map(({ key, position, scale, color }, i) => (
          <Instance
            key={key}
            position={position}
            scale={
              hovered === i
                ? [scale[0] * 1.03, scale[1] * 1.05, scale[2] * 1.03]
                : scale
            }
            color={hovered === i ? "#67e8f9" : color}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(i);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(null);
            }}
          />
        ))}
      </Instances>

      {/* Soft ground shadow */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={softShadows ? 0.42 : 0.28}
        scale={50}
        blur={softShadows ? 2.2 : 1.2}
        far={softShadows ? 7 : 5}
        frames={1}
      />
    </group>
  );
}
