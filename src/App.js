import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// import model from "../home_office__blender_asset_pack"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { Stats, OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import pc from "./88 Keys_Cover (front)_e.jpg"
import { Group, TextureLoader } from 'three'
import * as THREE from "three";
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
  const gltf = useLoader(GLTFLoader, "./home_office__blender_asset_pack/scene.gltf");
  const model = gltf.scene
  const colorMap = useLoader(TextureLoader, pc)
  console.log(model);
  model.getObjectByName('iMac_Silver_iMac_Screen_0').material.map = colorMap

  function AngleToRadians(deg) {

    const pi = Math.PI;
    return deg * (pi / 180);
  }
  // gltf.scene.children[0].children[0].children[0].castShadow = true
  // gltf.scene.children[0].children[0].castShadow = true
  // gltf.scene.children[0].castShadow = true
  // for (let i = 0; i < gltf.scene.children[0].children[0].children[0].children.length; i++) {

  //   gltf.scene.children[0].children[0].children[0].children[i].castShadow = true
  //   gltf.scene.children[0].children[0].children[0].children[i].traverse(function (node) {
  //     // console.log(gltf.scene.children[0].children[0].children[0].children[i]);
  //     console.log(node.isMesh);
  //     if (node.isMesh || node.isLight) node.castShadow = true;
  //     if (node.isMesh || node.isLight) node.receiveShadow = true;

  //   });
  // }
  gltf.scene.traverse(function (node) {
    // console.log(gltf.scene.children[0].children[0].children[0].children[i]);
    console.log(node.isMesh);
    if (node.isMesh || node.isLight) node.castShadow = true;
    if (node.isMesh || node.isLight) node.receiveShadow = true;

  });
  console.log(gltf.scene.children[0].children[0].children[0].children)
  // gltf.scene.children[0].children[0].children[0].children.traverse(function (node) {

  //   if (node.isMesh || node.isLight) node.castShadow = true;
  //   if (node.isMesh || node.isLight) node.receiveShadow = true;

  // });

  const light = useRef()
  useHelper(light, THREE.SpotLightHelper, 'cyan')

  return (
    <>
      <ambientLight intensity={0.2} />
      <mesh rotation={[-(AngleToRadians(90)), 0, 0]} receiveShadow={true}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>

      {/* <mesh position={[0, 2, 0]} rotation={[0, 0, 0]} castShadow={true}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} castShadow={true} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh> */}
      {/* <directionalLight castShadow={true} args={["#00FFFF", 1]} position={[1, 1, 0]} rotation={[0, 180, 0]} /> */}

      {/* <PerspectiveCamera position={[10, 10, 10]} fov={45} /> */}
      <spotLight ref={light} castShadow={true} args={["#FFF", 1]} position={[0, 3.5, -3]} />
      {/* <directionalLight castShadow={true} args={["#000", 1]} position={[0, .5, 0]} /> */}
      <OrbitControls minPolarAngle={AngleToRadians(30)} maxPolarAngle={AngleToRadians(80)} />
      {/* <Box position={[-1.2, 0, 0]} /> */}
      {/* <spotLight castShadow={true} color="#fFFFFF" position={[-3, 1, 0]} /> */}
      {/* <pointLightHelper /> */}
      {/* <Box position={[1.2, 0, 0]} /> */}
      {/* <Model position={[0, 0, 0]} /> */}
      <primitive object={gltf.scene} meshStandardMaterial={colorMap} position={[0, 0, 0]} castShadow={true} />
    </>)
}

