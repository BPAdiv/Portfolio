import { createRoot } from 'react-dom/client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import model from "../home_office__blender_asset_pack"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { Stats, OrbitControls, PerspectiveCamera, useHelper, Environment } from '@react-three/drei'
import pc from "./88 Keys_Cover (front)_e.jpg"
import { Camera, Group, TextureLoader } from 'three'
import * as THREE from "three";
import { Model } from './Model'
import { gsap } from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger'
// import angleToRadians from "../"
// export function Model(props) {
//   const fileUrl = new URL("../home_office__blender_asset_pack/scene.gltf", import.meta.url);
//   const assetLoader = new GLTFLoader()
//   assetLoader.load(fileUrl.href, function (gltf) {
//     var model = gltf.scene
//     console.log(model);
//   },undefined,function(error) {
//     console.log(error);
//   })
//   return(
//     <mesh>

//     </mesh>
//   )
// }
// export function Model() {
//   const gltf = useLoader(GLTFLoader, "../home_office__blender_asset_pack/scene.gltf");
//   return (

//     <Suspense fallback={null}>
//       <primitive object={gltf.scene} />
//     </Suspense>

//   );
// };

export function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    const ref = useRef()


    useFrame(({ clock }) => {

        ref.current.rotation.x = clock.getElapsedTime()
    })

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (mesh.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default function ThreePlat() {
    const gltf = useLoader(GLTFLoader, "./models/home_office__blender_asset_pack/scene.gltf");
    const model = gltf.scene
    const colorMap = useLoader(TextureLoader, pc)
    console.log(model);
    model.getObjectByName('iMac_Silver_iMac_Screen_0').material.map = colorMap
    gsap.registerPlugin(ScrollTrigger)
    function AngleToRadians(deg) {

        const pi = Math.PI;
        return deg * (pi / 180);
    }
    const gl = useRef()

    const light = useRef()
    // useHelper(pointLight, PointLightHelper, 0.5, "hotpink")
    // useFrame(() => {
    //   gl.current.rotation.x = +0.1
    // }) 
    // useEffect(() => {

    //     gsap.to(light.current.position, {
    //         scrollTrigger: ".projects", // start the animation when ".box" enters the viewport (once)
    //         x: 5,
    //         y: 5,
    //         duration: 2,
    //         marker: true


    //     });
    // }, [light.current])
    const camera = useThree(state => state.camera)
    useHelper(light, THREE.PointLightHelper, 0.3, 'cyan')


    gsap.to(camera.position, {
        // scrollTrigger: ".projects",
        scrollTrigger: {
            trigger: ".projects",
            // pin: true,   // pin the trigger element while active
            start: "top top", // when the top of the trigger hits the top of the viewport
            end: "+=500", // end after scrolling 500px beyond the start
            scrub: 1,
        }, // start the animation when ".box" enters the viewport (once)
        x: 0.782192036056714,
        y: 1.47611358061373,
        z: -0.50434002976111556,
        duration: 2,
        markers: true


    });
    gsap.fromTo(camera.position, {
        x: 0.782192036056714,
        y: 1.47611358061373,
        z: -0.50434002976111556,
    },
        {
            // scrollTrigger: ".sub-projects",
            scrollTrigger: {
                trigger: ".sub-projects",
                // pin: true,   // pin the trigger element while active
                start: "top top", // when the top of the trigger hits the top of the viewport
                end: "+=500", // end after scrolling 500px beyond the start
                scrub: 1,
            }, // start the animation when ".box" enters the viewport (once)
            x: -0.782192036056714,
            y: 1.47611358061373,
            z: -0.50434002976111556,
            duration: 2,
            markers: true


        });
    gsap.fromTo(camera.position, {
        x: -0.782192036056714,
        y: 1.47611358061373,
        z: -0.50434002976111556,
    }, {
        scrollTrigger: {
            trigger: ".music-player",
            // pin: true,   // pin the trigger element while active
            start: "top top", // when the top of the trigger hits the top of the viewport
            end: "+=500", // end after scrolling 500px beyond the start
            scrub: 1,
        },  // start the animation when ".box" enters the viewport (once)
        x: -0.082192036056714,
        y: 1.47611358061373,
        z: -0.50434002976111556,
        duration: 2,
        markers: true


    });
    // gsap.to(camera.rotation, {
    //     scrollTrigger: ".projects", // start the animation when ".box" enters the viewport (once)
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //     duration: 2,
    //     marker: true


    // });

    console.log(camera);

    useEffect(() => {


        let tl = gsap.timeline({
            // yes, we can add it to an entire timeline!

            scrollTrigger: {
                trigger: ".projects",
                pin: true,   // pin the trigger element while active
                start: "top top", // when the top of the trigger hits the top of the viewport
                end: "+=500", // end after scrolling 500px beyond the start
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                // snap: {
                //     snapTo: "labels", // snap to the closest label in the timeline
                //     duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                //     delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                //     ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
                // }
            }
        });

        // add animations and labels to the timeline
        tl.addLabel("start")
            .to(light.current.position, {
                x: 5,
                y: 5,
                duration: 2,
                markers: true
            })
        // .addLabel("poster1")
        // .to(camera.position, {
        //     scrollTrigger: ".projects", // start the animation when ".box" enters the viewport (once)
        //     x: 0.782192036056714,
        //     y: 1.47611358061373,
        //     z: -0.50434002976111556,
        //     duration: 2,
        //     marker: true

        // })
        // .addLabel("poster2")
        // .to(camera.position, {
        //     scrollTrigger: ".music-player", // start the animation when ".box" enters the viewport (once)
        //     x: -0.082192036056714,
        //     y: 1.47611358061373,
        //     z: -0.50434002976111556,
        //     duration: 2,
        //     marker: true


        // })
        // .addLabel("poster3")
        // .to(camera.position, {
        //     scrollTrigger: ".sub-projects", // start the animation when ".box" enters the viewport (once)
        //     x: 0.782192036056714,
        //     y: 1.47611358061373,
        //     z: -0.50434002976111556,
        //     duration: 2,
        //     marker: true
        // });
    }, [light.current])
    // useEffect(() => {
    //     // position: [0, 1, 3]
    //     camera.position.x = 0
    //     camera.position.y = 1
    //     camera.position.z = 8
    // }, [camera])

    return (
        <>
            <fog attach="fog" args={["floralwhite", 2, 100]} />

            <gridHelper args={[30, 30, 30]} />
            <ambientLight intensity={0.2} />
            {/* <OrbitControls ref={orbit} minPolarAngle={AngleToRadians(30)} maxPolarAngle={AngleToRadians(80)} /> */}
            <mesh ref={gl} rotation={[-(AngleToRadians(90)), 0, 0]} receiveShadow={true}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>
            <pointLight ref={light} args={["#ffffff", 1, 8, AngleToRadians(45), 0.4]} position={[0, 4, -1]} castShadow={true} />
            <Suspense fallback={null}>
                <Model />
            </Suspense>

            {/* <spotLight ref={light} args={["#ffffff", 1.5, 7, AngleToRadians(45), 0.4]} position={[-3, 2, 0]} castShadow={true} /> */}
            {/* <pointLightHelper /> */}
            {/* <primitive object={gltf.scene} meshStandardMaterial={colorMap} position={[0, 0, 0]} castShadow={true} /> */}
            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    )
}