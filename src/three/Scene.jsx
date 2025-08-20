// imports
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import City from "./City.jsx";

export default function Scene({ eventSource }) {
  const controlsRef = useRef(null);

  useEffect(() => {
    const c = controlsRef.current;
    if (!c) return;
    let t;
    const pause = () => {
      c.autoRotate = false;
      clearTimeout(t);
      t = setTimeout(() => (c.autoRotate = true), 3000); // resume after 3s idle
    };
    c.addEventListener("start", pause); // user starts interacting
    c.addEventListener("end", pause); // user stops; start idle timer
    return () => {
      c.removeEventListener("start", pause);
      c.removeEventListener("end", pause);
      clearTimeout(t);
    };
  }, []);

  return (
    <Canvas
      style={{ touchAction: "none" }}
      eventSource={eventSource}
      eventPrefix="client"
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true }}
      camera={{ position: [8, 8, 12], fov: 45 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#020617", 0.06);
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 6]} intensity={1.2} castShadow />
      <City />

      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.55} />
      </EffectComposer>

      <Environment preset="city" />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableRotate
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.35}
        minDistance={8}
        maxDistance={30}
        minPolarAngle={0.9}
        maxPolarAngle={1.45}
        target={[0, 2, 0]}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      />

      <ResetViewOnKey />
    </Canvas>
  );
}

// Press "R" to reset the camera/target
function ResetViewOnKey() {
  const controls = useThree((s) => s.controls);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "r") controls?.reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [controls]);
  return null;
}
