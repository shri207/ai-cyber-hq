"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
    const meshRef = useRef();
    const pointsRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.08;
            meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.12;
        }
    });

    const particles = useMemo(() => {
        const positions = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.2 + Math.random() * 0.3;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, []);

    const arcs = useMemo(() => {
        const lines = [];
        for (let i = 0; i < 8; i++) {
            const points = [];
            const startTheta = Math.random() * Math.PI * 2;
            const startPhi = Math.acos(2 * Math.random() - 1);
            const endTheta = Math.random() * Math.PI * 2;
            const endPhi = Math.acos(2 * Math.random() - 1);
            for (let t = 0; t <= 1; t += 0.05) {
                const theta = startTheta + (endTheta - startTheta) * t;
                const phi = startPhi + (endPhi - startPhi) * t;
                const r = 2.0 + Math.sin(t * Math.PI) * 0.6;
                points.push(
                    new THREE.Vector3(
                        r * Math.sin(phi) * Math.cos(theta),
                        r * Math.sin(phi) * Math.sin(theta),
                        r * Math.cos(phi)
                    )
                );
            }
            lines.push(points);
        }
        return lines;
    }, []);

    return (
        <group>
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#39FF14" wireframe transparent opacity={0.08} />
            </mesh>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[particles, 3]} />
                </bufferGeometry>
                <pointsMaterial color="#39FF14" size={0.015} transparent opacity={0.6} sizeAttenuation />
            </points>
            {arcs.map((points, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]} />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00e676" transparent opacity={0.2} />
                </line>
            ))}
        </group>
    );
}

export default function CyberGlobe() {
    return (
        <div className="absolute inset-0 z-0" style={{ opacity: 0.5 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <Globe />
            </Canvas>
        </div>
    );
}
