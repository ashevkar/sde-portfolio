import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate positions outside component to avoid Math.random in render
const count = 3000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

function ParticleField() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.02) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00f5c4" size={0.025} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

function FloatingTorus() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
    ref.current.position.y = Math.sin(t * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref} position={[3.5, 0, -2]}>
      <torusGeometry args={[1.2, 0.05, 16, 100]} />
      <meshStandardMaterial color="#7b61ff" wireframe opacity={0.4} transparent />
    </mesh>
  );
}

function FloatingOctahedron() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.3;
    ref.current.position.y = Math.cos(t * 0.4) * 0.4;
  });
  return (
    <mesh ref={ref} position={[-4, 1, -1]}>
      <octahedronGeometry args={[0.8]} />
      <meshStandardMaterial color="#00f5c4" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

function GridPlane() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1;
  });
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    const size = 30;
    const divisions = 20;
    const step = size / divisions;
    for (let i = -size / 2; i <= size / 2; i += step) {
      vertices.push(i, -3, -size / 2, i, -3, size / 2);
      vertices.push(-size / 2, -3, i, size / 2, -3, i);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#7b61ff" opacity={0.08} transparent />
    </lineSegments>
  );
}

function MouseLight() {
  const light = useRef();
  const { viewport } = useThree();
  useFrame(({ mouse }) => {
    light.current.position.x = (mouse.x * viewport.width) / 2;
    light.current.position.y = (mouse.y * viewport.height) / 2;
  });
  return <pointLight ref={light} color="#00f5c4" intensity={2} distance={8} />;
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <MouseLight />
        <ParticleField />
        <FloatingTorus />
        <FloatingOctahedron />
        <GridPlane />
      </Canvas>
    </div>
  );
}
