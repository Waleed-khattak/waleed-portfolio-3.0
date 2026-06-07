import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// ---------- scroll progress hook ----------
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

const scrollState = { p: 0, reduce: false };

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uScroll;

  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 pos = position;
    float amp = 0.08 + uScroll * 0.18;
    float wave = sin(pos.x * 3.0 + uTime) * amp + cos(pos.y * 3.0 + uTime * 0.8) * amp;
    pos += normal * wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uScroll;

  void main() {
    vec3 cyan = vec3(0.28, 0.85, 0.95);
    vec3 magenta = vec3(0.95, 0.3, 0.75);
    vec3 violet = vec3(0.55, 0.35, 0.95);
    float mixVal = sin(vUv.y * 4.0 + uTime * 0.6) * 0.5 + 0.5;
    vec3 col = mix(cyan, magenta, mixVal);
    col = mix(col, violet, sin(vUv.x * 3.0 + uTime * 0.4 + uScroll * 6.28) * 0.5 + 0.5);
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    col += fresnel * 0.6;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderOrb() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uScroll: { value: 0 } }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollState.p;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uScroll.value = s;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15 + s * Math.PI * 2;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.25 + s * 0.6;
      const scl = 1 + s * 0.4;
      meshRef.current.scale.setScalar(scl);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 24]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function FloatingTorus({
  position,
  color,
  scale = 1,
  phase = 0,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  phase?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    const s = scrollState.p;
    ref.current.rotation.x = t * 0.3 + s * Math.PI;
    ref.current.rotation.y = t * 0.25 + s * Math.PI * 1.5;
    ref.current.position.z = position[2] + s * 3;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[0.42, 0.12, 96, 12]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.85}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  useFrame((state) => {
    const s = scrollState.p;
    const cam = state.camera;
    // ease-in pull-back + tilt as user scrolls
    const targetZ = 5 + s * 2.5;
    const targetY = -s * 1.2;
    cam.position.x += (Math.sin(state.clock.elapsedTime * 0.2) * 0.3 - cam.position.x) * 0.02;
    cam.position.z += (targetZ - cam.position.z) * 0.05;
    cam.position.y += (targetY - cam.position.y) * 0.05;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function ScrollSync() {
  const p = useScrollProgress();
  scrollState.p = p;
  return null;
}

export default function Scene3D() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    scrollState.reduce = m.matches;
    const h = () => {
      setReduce(m.matches);
      scrollState.reduce = m.matches;
    };
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  return (
    <>
      <ScrollSync />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          frameloop={reduce ? "demand" : "always"}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        >
          <color attach="background" args={["#05060d"]} />
          <fog attach="fog" args={["#05060d", 8, 22]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[8, 8, 8]} intensity={1.3} color="#5fe5ff" />
          <pointLight position={[-8, -6, -4]} intensity={1.1} color="#ff4fc4" />
          <pointLight position={[0, 4, -6]} intensity={0.6} color="#9b6bff" />

          <ShaderOrb />
          <FloatingTorus position={[-2.6, 1.4, -1]} color="#ff4fc4" scale={0.9} />
          <FloatingTorus position={[2.8, -1.2, -1]} color="#5fe5ff" scale={0.8} phase={1.4} />
          <FloatingTorus position={[2.4, 1.8, -3]} color="#9b6bff" scale={0.55} phase={2.8} />
          <FloatingTorus position={[-3.2, -1.8, -2]} color="#5fe5ff" scale={0.5} phase={0.7} />

          <Stars radius={40} depth={50} count={2500} factor={3} saturation={0} fade speed={0.6} />

          <CameraRig />
        </Canvas>
      </div>
    </>
  );
}