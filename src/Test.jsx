import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
// import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
// import Car from "./car";

export default function Test() {
    function AngleToRadians(deg) {

        const pi = Math.PI;
        return deg * (pi / 180);
    }
    // Code to move the camera around
    const orbitControlsRef = useRef(null);
    // useFrame((state) => {
    //     if (!!orbitControlsRef.current) {
    //         const { x, y } = state.mouse;
    //         orbitControlsRef.current.setAzimuthalAngle(-x * AngleToRadians(45));
    //         orbitControlsRef.current.setPolarAngle((y + 1) * AngleToRadians(90 - 30));
    //         orbitControlsRef.current.update();
    //     }
    // })

    // Animation
    const ballRef = useRef(null);
    // useEffect(() => {
    //     if (!!ballRef.current) {

    //         // Timeline
    //         const timeline = gsap.timeline({ paused: true });

    //         // x-axis motion
    //         timeline.to(ballRef.current.position, {
    //             x: 1,
    //             duration: 2,
    //             ease: "power2.out"
    //         });

    //         // y-axis motion
    //         timeline.to(ballRef.current.position, {
    //             y: 0.5,
    //             duration: 1,
    //             ease: "bounce.out"
    //         }, "<");

    //         // Play
    //         timeline.play();
    //     }
    // }, [ballRef.current])

    return (
        <Canvas style={{ width: "100vw", height: "100vh" }} shadows>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls ref={orbitControlsRef} minPolarAngle={AngleToRadians(60)} maxPolarAngle={AngleToRadians(80)} />

            {/* Ball */}
            <mesh position={[-2, 1.5, 0]} castShadow={true} ref={ballRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Car */}
            {/* <Car /> */}

            {/* Floor */}
            <mesh rotation={[-(AngleToRadians(90)), 0, 0]} receiveShadow={true}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>

            {/* Ambient light */}
            <ambientLight args={["#ffffff", 0.25]} />

            {/* Spotlight light */}
            <spotLight args={["#ffffff", 1.5, 7, AngleToRadians(45), 0.4]} position={[-3, 2, 0]} castShadow={true} />

            {/* Environmnet */}
            {/* <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment> */}
        </Canvas>
    )
}