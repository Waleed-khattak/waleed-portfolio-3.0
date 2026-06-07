import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { random } from "maath";

function Stars() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(5000 * 3);
    random.inSphere(arr, { radius: 8 });
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 28;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#5fe5ff"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <Stars />
      </Canvas>
    </div>
  );
}