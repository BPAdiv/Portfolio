import { createRoot } from 'react-dom/client'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// import model from "../home_office__blender_asset_pack"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { Stats, OrbitControls, PerspectiveCamera, useHelper, Environment } from '@react-three/drei'
import pc from "./88 Keys_Cover (front)_e.jpg"
import { Group, TextureLoader } from 'three'
import * as THREE from "three";
import { Model } from './Model'
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

export default function App() {
  const gltf = useLoader(GLTFLoader, "./models/home_office__blender_asset_pack/scene.gltf");
  const model = gltf.scene
  const colorMap = useLoader(TextureLoader, pc)
  console.log(model);
  model.getObjectByName('iMac_Silver_iMac_Screen_0').material.map = colorMap

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

  useHelper(light, THREE.PointLightHelper, 0.3, 'cyan')

  return (
    <>
      <fog attach="fog" args={["floralwhite", 2, 100]} />

      <gridHelper args={[30, 30, 30]} />
      <ambientLight intensity={0.2} />
      <OrbitControls minPolarAngle={AngleToRadians(30)} maxPolarAngle={AngleToRadians(80)} />
      <mesh rotation={[-(AngleToRadians(90)), 0, 0]} receiveShadow={true}>
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

