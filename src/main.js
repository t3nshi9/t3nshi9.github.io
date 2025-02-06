import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { roundedRectangle } from './customShapes.js';
 
////// Setup //////
// Load arcadeModel
const glftLoader = new GLTFLoader();
glftLoader.load('./models/arcadeMachine/arcadeMachine.gltf', function(gltf) {
    root = gltf.scene;
    root.scale.set(0.05, 0.05, 0.05);
    root.position.set(0, 0, 0);

    scene.add(root); 

    }, function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '%  loaded');
}, function(error) {
    console.log(error)
});

let root = null;
const scene = new THREE.Scene();
//initial top position
let t = document.body.getBoundingClientRect().top;
 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 100;
camera.position.x = 0;
camera.position.y = 0;
 
const renderer = new THREE.WebGLRenderer({ 
	canvas: document.querySelector("#bg") 
});
 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
 
renderer.render( scene, camera );
 
const gridHelper = new THREE.GridHelper(200, 50);
//light cone to help center stuff!!!!!!!!!
const light = new THREE.PointLight(0xfffff);
const lightHelper = new THREE.PointLightHelper(light);
const axesHelper = new THREE.AxesHelper;
scene.add(gridHelper, lightHelper, axesHelper);

 
// const controls = new OrbitControls(camera, renderer.domElement);
 
 
////// END OF SETUP //////
 
// Load Image texture for mapping

let imageTexture2 = new THREE.TextureLoader().load('images/2.jpg'); //H
let imageTexture3 = new THREE.TextureLoader().load('images/3.jpg'); //V
let imageTexture4 = new THREE.TextureLoader().load('images/4.jpg'); //H
let imageTexture5 = new THREE.TextureLoader().load('images/5.jpg'); //H
let imageTexture6 = new THREE.TextureLoader().load('images/6.jpg'); //V
let imageTexture7 = new THREE.TextureLoader().load('images/7.jpg'); //V
let imageTexture1 = new THREE.TextureLoader().load('images/1.jpg'); //H

//quality
//imageTexture1.minFilter = THREE.NearestFilter;
//imageTexture2.minFilter = THREE.NearestFilter;
//imageTexture3.minFilter = THREE.NearestFilter;
//imageTexture4.generateMipmaps = false;

//create a rounded rectangle
let roundedMesh = roundedRectangle(imageTexture1, 90, 45);
roundedMesh.position.set(0, 0, -2);
scene.add(roundedMesh);

let roundedMesh1 = roundedRectangle(imageTexture2, 90, 45);
roundedMesh1.position.set(-30, 30, 0);
scene.add(roundedMesh1);

let roundedMesh2 = roundedRectangle(imageTexture4, 90, 45);
roundedMesh2.position.set(-15, 110, 5);
scene.add(roundedMesh2);

let roundedMesh3 = roundedRectangle(imageTexture5, 90, 45);
roundedMesh3.position.set(-60, -30, 4);
scene.add(roundedMesh3);

let VroundedMesh = roundedRectangle(imageTexture3, 54, 84);
VroundedMesh.position.set(-90, 30, -4);
scene.add(VroundedMesh);


let VroundedMesh1 = roundedRectangle(imageTexture6, 54, 84);
VroundedMesh1.position.set(35, 30, 6);
scene.add(VroundedMesh1); 

let VroundedMesh2 = roundedRectangle(imageTexture7, 54, 84);
VroundedMesh2.position.set(-30, 80, 4);
scene.add(VroundedMesh2);

const travelBg = new THREE.TextureLoader().load('images/bg1.jpg');
scene.background = travelBg;

function moveCamera() {
}

// Scroll event listener for pictures
window.addEventListener('scroll', () => {
    const currentT = document.body.getBoundingClientRect().top; // Get the current 't' value
    const deltaT = currentT - t; // Difference between the current and last 't'

    if(currentT < -2400 || currentT > -4800) {
        VroundedMesh.position.y += 0.01 * deltaT;
    

    // Update the mesh's position based on scroll direction (deltaT)

    // Update lastT for the next scroll event
    t = currentT;
}});


document.body.onscroll = moveCamera

window.addEventListener( 'resize', onWindowResize );

function resizeImages(width, height) {
    //resize the images
    roundedMesh.scale.set(width/1920, height/911, 1);
    roundedMesh1.scale.set(width/1920, height/911, 1);
    roundedMesh2.scale.set(width/1920, height/911, 1);
    roundedMesh3.scale.set(width/1920, height/911, 1);
    VroundedMesh.scale.set(width/1920, height/911, 1);
    VroundedMesh1.scale.set(width/1920, height/911, 1);
    VroundedMesh2.scale.set(width/1920, height/911, 1);
    //console.log(width, height);
}
resizeImages(window.innerWidth, window.innerHeight);


//function to resize the window
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}



function animate() {

    //load the scene and camera
    //update the canvas (game loop)
    requestAnimationFrame(animate);
    //torus.rotation.x += 0.01;
    //torus.rotation.y += 0.005;
    //torus.rotation.z += 0.01;
    renderer.render(scene, camera);
}
 
// start the three.js loop
animate();