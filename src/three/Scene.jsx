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

export default function Scene({ eventSource, autoBase = 0.35 }) {
  const [low, setLow] = useState(isCoarse());
  const controlsRef = useRef(null);

  // current rotate speed we feed into OrbitControls (reactive)
  const [rotSpeed, setRotSpeed] = useState(() =>
    low ? Math.min(autoBase, 0.35) : autoBase
  );

  useEffect(() => {
    // keep rotSpeed in sync if quality mode changes or prop changes
    const target = low ? Math.min(autoBase, 0.35) : autoBase;
    setRotSpeed((prev) => target); // no ramp here; we ramp during pause/resume below
  }, [low, autoBase]);

  // Pause on user interaction, resume after a delay with a smooth ramp
  useEffect(() => {
    const c = controlsRef.current;
    if (!c) return;

    let idleTimer, rafId;
    const idleDelay = 3000; // ms before resuming
    const rampMs = 650; // ramp duration

    // helper: tween rotSpeed to a target value
    const rampTo = (to, ms = rampMs) => {
      const from = c.autoRotateSpeed;
      const start = performance.now();
      cancelAnimationFrame(rafId);
      const tick = (t) => {
        const p = Math.min(1, (t - start) / ms);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setRotSpeed(from + (to - from) * eased);
        if (p < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    // ensure autorotate is enabled
    c.autoRotate = true;
    c.autoRotateSpeed = rotSpeed;

    const pause = () => {
      clearTimeout(idleTimer);
      rampTo(0, 250); // stop quickly
      idleTimer = setTimeout(() => {
        const target = low ? Math.min(autoBase, 0.08) : autoBase;
        rampTo(target); // resume gently
      }, idleDelay);
    };

    c.addEventListener("start", pause);
    c.addEventListener("end", pause);

    return () => {
      c.removeEventListener("start", pause);
      c.removeEventListener("end", pause);
      clearTimeout(idleTimer);
      cancelAnimationFrame(rafId);
    };
  }, [low, autoBase, rotSpeed]);

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
        autoRotate
        autoRotateSpeed={rotSpeed} // <- driven by state
      />
    </Canvas>
  );
}
