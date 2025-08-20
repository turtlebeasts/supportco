// src/three/Scene.jsx
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerformanceMonitor,
  AdaptiveDpr,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import City from "./City.jsx";

const isCoarse = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  matchMedia("(pointer: coarse)").matches;

export default function Scene({ eventSource }) {
  const [low, setLow] = useState(isCoarse());
  const controlsRef = useRef(null);

  // Slow, eased autorotate: pauses on interaction, resumes after 3s, ramping smoothly
  useEffect(() => {
    const c = controlsRef.current;
    if (!c) return;

    // nice, slow base speed (lower on phones)
    const base = low ? 0.08 : 0.35; // was 0.2 / 0.35
    const idleDelay = 3000; // ms to wait before resuming
    const rampMs = 650; // ms to ease speed changes

    c.autoRotate = true;
    c.autoRotateSpeed = base;

    let idleTimer, rafId;

    const setSpeed = (to, ms = rampMs) => {
      const from = c.autoRotateSpeed;
      const start = performance.now();
      cancelAnimationFrame(rafId);
      const tick = (t) => {
        const p = Math.min(1, (t - start) / ms);
        // smooth ease-out cubic
        const eased = 1 - Math.pow(1 - p, 3);
        c.autoRotateSpeed = from + (to - from) * eased;
        if (p < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const pause = () => {
      clearTimeout(idleTimer);
      setSpeed(0, 250); // stop quickly when user interacts
      idleTimer = setTimeout(() => setSpeed(base), idleDelay); // resume gently
    };

    c.addEventListener("start", pause);
    c.addEventListener("end", pause);

    return () => {
      c.removeEventListener("start", pause);
      c.removeEventListener("end", pause);
      clearTimeout(idleTimer);
      cancelAnimationFrame(rafId);
    };
  }, [low]);

  return (
    <Canvas
      style={{ touchAction: "none" }}
      eventSource={eventSource}
      eventPrefix="client"
      dpr={low ? [1, 1.15] : [1, 1.75]}
      shadows
      gl={{ antialias: !low, powerPreference: "high-performance" }}
      camera={{ position: [8, 8, 12], fov: 45 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#020617", 0.06);
      }}
    >
      {/* Auto downshift if FPS drops */}
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <AdaptiveDpr pixelated />

      {/* Lights */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={low ? 512 : 1024}
        shadow-mapSize-height={low ? 512 : 1024}
      />

      {/* City */}
      <City cols={low ? 9 : 12} rows={low ? 9 : 12} softShadows={!low} />

      {/* Post FX / Env only on higher quality */}
      {!low && (
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur intensity={0.4} luminanceThreshold={0.6} />
        </EffectComposer>
      )}
      {!low && <Environment preset="city" />}

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableRotate
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={30}
        minPolarAngle={0.9}
        maxPolarAngle={1.45}
        target={[0, 2, 0]}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        // Ensure updates keep running so autorotate animates
        autoRotate // initial on; speed set in useEffect
      />
    </Canvas>
  );
}
