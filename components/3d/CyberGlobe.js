import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
    const meshRef = useRef();
    const pointsRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001;
            pointsRef.current.rotation.x += 0.0005;
        }
    });

    // Create grid points on sphere
    const particles = useMemo(() => {
        const pts = [];
        const count = 2000;
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const r = 2;
            pts.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
        }
        return new Float32Array(pts);
    }, []);

    // Connection lines
    const lines = useMemo(() => {
        const lineGeometries = [];
        const count = 30;
        for (let i = 0; i < count; i++) {
            const phi1 = Math.acos(2 * Math.random() - 1);
            const theta1 = 2 * Math.PI * Math.random();
            const phi2 = Math.acos(2 * Math.random() - 1);
            const theta2 = 2 * Math.PI * Math.random();
            const r = 2.01;
            const start = new THREE.Vector3(
                r * Math.sin(phi1) * Math.cos(theta1),
                r * Math.sin(phi1) * Math.sin(theta1),
                r * Math.cos(phi1)
            );
            const end = new THREE.Vector3(
                r * Math.sin(phi2) * Math.cos(theta2),
                r * Math.sin(phi2) * Math.sin(theta2),
                r * Math.cos(phi2)
            );
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(r * 1.3);

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const points = curve.getPoints(20);
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            lineGeometries.push(geo);
        }
        return lineGeometries;
    }, []);

    return (
        <group>
            {/* Wireframe globe */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#00f7ff" wireframe transparent opacity={0.08} />
            </mesh>

            {/* Particles on surface */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial color="#00f7ff" size={0.015} transparent opacity={0.6} sizeAttenuation />
            </points>

            {/* Connection arcs */}
            {lines.map((geo, i) => (
                <line key={i} geometry={geo}>
                    <lineBasicMaterial color="#7a00ff" transparent opacity={0.2} />
                </line>
            ))}

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[1.95, 32, 32]} />
                <meshBasicMaterial color="#0b0f1a" transparent opacity={0.9} />
            </mesh>
        </group>
    );
}

export default function CyberGlobe() {
    return (
        <div className="w-full h-full" style={{ minHeight: "400px" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <Globe />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
