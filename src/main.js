// //import '/style.css';
// import * as THREE from 'three';
// //import { OrbitControls } from 'three/examples/controls/OrbitControls';
// //import { GLTFLoader } from 'three/examples/loaders/GLTFLoader';
// //import { xor } from 'three/webgpu';
// import { roundedRectangle } from './customShapes.js';
 
// ////// Setup //////

// let root = null;
// const scene = new THREE.Scene();
 
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.z = 100;
// camera.position.x = 0;
// camera.position.y = 0;
 
// const renderer = new THREE.WebGLRenderer({ 
// 	canvas: document.querySelector("#bg") 
// });
 
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize( window.innerWidth, window.innerHeight );


// window.addEventListener( 'resize', onWindowResize );
 
// //function to resize the window
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( window.innerWidth, window.innerHeight );
// }

// renderer.render( scene, camera );
 

// ////// END OF SETUP //////
 
// // Load Image texture for mapping

// // let imageTexture2 = new THREE.TextureLoader().load('images/2.jpg'); //H
// // let imageTexture3 = new THREE.TextureLoader().load('images/3.jpg'); //V
// // let imageTexture4 = new THREE.TextureLoader().load('images/4.jpg'); //H
// // let imageTexture5 = new THREE.TextureLoader().load('images/5.jpg'); //H
// // let imageTexture6 = new THREE.TextureLoader().load('images/6.jpg'); //V
// // let imageTexture7 = new THREE.TextureLoader().load('images/7.jpg'); //V
// // let imageTexture1 = new THREE.TextureLoader().load('images/1.jpg'); //H

// //create a rounded rectangle

// // let roundedMesh = roundedRectangle(imageTexture1, 108, 54);
// // roundedMesh.position.set(-25, 100, 8);
// // scene.add(roundedMesh);

// // let roundedMesh1 = roundedRectangle(imageTexture2, 90, 45);
// // roundedMesh1.position.set(-110, 80, 0);
// // scene.add(roundedMesh1);

// // let roundedMesh2 = roundedRectangle(imageTexture4, 90, 45);
// // roundedMesh2.position.set(-23, 60, 5);
// // scene.add(roundedMesh2);

// // let roundedMesh3 = roundedRectangle(imageTexture5, 90, 45);
// // roundedMesh3.position.set(60, 30, 4);
// // scene.add(roundedMesh3);

// // let VroundedMesh = roundedRectangle(imageTexture3, 54, 84);
// // VroundedMesh.position.set(-165, 30, -4);
// // scene.add(VroundedMesh);


// // let VroundedMesh1 = roundedRectangle(imageTexture6, 54, 84);
// // VroundedMesh1.position.set(90, 30, 6);
// // scene.add(VroundedMesh1); 

// // let VroundedMesh2 = roundedRectangle(imageTexture7, 67.5, 105);
// // VroundedMesh2.position.set(-95, 80, 4);
// // scene.add(VroundedMesh2);


// const travelBg = new THREE.TextureLoader().load('images/bg1.png');
// scene.background = travelBg;

// function moveCamera() {
//     const t = document.body.getBoundingClientRect().top;

//     // t * position to make it scroll up n down 
//     VroundedMesh.position.y = t * 0.18;
//     VroundedMesh1.position.y = t * 0.1;
//     VroundedMesh2.position.y = t * 0.2;
//     roundedMesh.position.y = t *-0.08;
//     roundedMesh1.position.y = t * 0.4;
//     roundedMesh2.position.y = t * 0.2;
//     roundedMesh3.position.y = t * 0.4;
// }

// document.body.onscroll = moveCamera

// function animate() {
//     //load the scene and camera
//     //update the canvas (game loop)
//     requestAnimationFrame(animate);
//     //torus.rotation.x += 0.01;
//     //torus.rotation.y += 0.005;
//     //torus.rotation.z += 0.01;
//     renderer.render(scene, camera);
// }


// // start the three.js loop
// animate();

// const floatingImages = [
//     document.getElementById('image1'),
//     document.getElementById('image2'),
//     document.getElementById('image3'),
//     document.getElementById('image4'),
//     document.getElementById('image5'),
//     document.getElementById('image6'),
//     document.getElementById('image7')
// ];

// // Add scroll event listener to window
// window.addEventListener('scroll', function() {
//     // Get the current scroll position
//     let scrollPosition = window.scrollY;

//     // Loop through each image and apply translateY in the opposite direction of scroll
//     floatingImages.forEach((image, index) => {
//         // Adjust the speed of movement using index + 1 for slight variation
//         let speedMultiplier = -0.2 * (index - 1); // Different speeds for each image

//         // Apply translateY to move images downward as the page is scrolled upward
//         image.style.transform = `translateY(${scrollPosition * speedMultiplier}px)`;
//     });
// });