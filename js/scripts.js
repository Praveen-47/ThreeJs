import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import nebula from '../img/nebula.jpg'
import stars from '../img/stars.jpg'

const monkeyUrl = new URL('../assets/monkey.glb', import.meta.url)

const renderer = new THREE.WebGLRenderer()

renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

const orbit = new OrbitControls(camera, renderer.domElement)

// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

camera.position.set(-10, 30, 30)
orbit.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.set(-1, 1, -0.1)
box.castShadow = true
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
})
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
scene.add(plane)

plane.receiveShadow = true

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-1, -0.1, -0.1)
// sphere.castShadow = true

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
scene.add(directionalLight)
directionalLight.position.set(3, 10, 10)
directionalLight.castShadow = true
directionalLight.shadow.camera.bottom = -15

const dlightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(dlightHelper)
let step = 0
let speed = 0.01

const sphere2Material = new THREE.MeshStandardMaterial({
  color: 0xfff,
  wireframe: false,
})

const sphere2 = new THREE.Mesh(sphereGeometry, sphere2Material)
scene.add(sphere2)
sphere2.position.set(2, 10, 10)
sphere2.castShadow = true

const assetsLoader = new GLTFLoader()

assetsLoader.load(
  monkeyUrl.href,
  function (gltf) {
    const model = gltf.scene
    scene.add(model)
    model.position.set(-12, 4, 10)
  },
  undefined,
  function (e) {
    console.error(e)
  },
)

function animate(time) {
  box.rotation.x = time / 1000
  box.rotation.y = time / 1000

  step += speed

  sphere2.position.y = 9 * Math.abs(Math.sin(step))
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
  camera.aspect = this.window.innerWidth / this.window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(this.window.innerWidth / this.window.innerHeight)
})
// renderer.setAnimationLoop(sphere2Animation)
// const gridHelper = new THREE.GridHelper(30)
// scene.add(gridHelper)
