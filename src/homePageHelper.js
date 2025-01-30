import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Function to add background to the scene
export function addBackground(scene) {
    const rgbeLoader = new RGBELoader();
    rgbeLoader.setPath('/HDR/'); // Specify the folder containing your HDR files
    rgbeLoader.load('HDR_multi_nebulae.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    // scene.environment = texture;
    });
}

////for adding arcade machine////
export function addArcadeMachine(scene) {
//create a loader    
const loader = new GLTFLoader();
//load the model
loader.load('/models/diablo_arcade_machine/scene.gltf', (gltf) => {
        const model =  gltf.scene;
        model.scale.set(50, 50, 50);
        scene.add(gltf.scene);
    },
    (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
        console.error('Error loading model:', error);
    });
}

// Helper function to interpolate the scale smoothly
export function animateScale(object, targetScale) {
    const startScale = object.scale.x; // Assuming uniform scaling (x, y, z are the same)
    const duration = 300; // Duration in milliseconds
    const startTime = performance.now();

    function scaleStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1

        // Interpolate scale
        const newScale = startScale + (targetScale - startScale) * progress;
        object.scale.set(newScale, newScale, newScale);

        // Continue animating until complete
        if (progress < 1) {
            requestAnimationFrame(scaleStep);
        }
    }
    requestAnimationFrame(scaleStep);
}


////Code for making a cube that we use for buttons////
function makeCube(imagePath, width, height, depth) {
    let imageTexture = new THREE.TextureLoader().load(imagePath);
    imageTexture.colorSpace = THREE.SRGBColorSpace;
    let geometry = new THREE.BoxGeometry(width, height, depth);
    let material = new THREE.MeshBasicMaterial({ map: imageTexture});
    //make green mesh
    // let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    return cube;
}

// Function to add buttons to the scene
export function addButtonsToScene(scene) {
    // Create an array to store the cubes
    let cubeList = [];
    
    let contact = makeCube("images/theJoyOfGaming.jpg", 0, 4, 20);
    contact.position.set(5.1, 11, 0);
    contact.rotation.set(0, 0, 0.25);
    contact.name = "contact";
    cubeList.push(contact);
    scene.add(contact);
    
    //add interactive HOBBIES cube
    let hobbies = makeCube("images/theJoyOfGaming.jpg", 0, 4, 6);
    hobbies.position.set(3.8, 16, 0);
    hobbies.rotation.set(0, 0, 0.25);
    hobbies.name = "hobbies";
    cubeList.push(hobbies);
    scene.add(hobbies);
    
    //add interactive NETWORKING cube
    let networking = makeCube("images/mainPage/NETWORKING.png", 0, 4, 6);
    networking.position.set(3.8, 16, 7);
    networking.rotation.set(0, 0, 0.25);
    networking.name = "network";
    cubeList.push(networking);
    scene.add(networking);
    
    //add interactive onlineWorld cube
    let onlineWorld = makeCube("images/mainPage/ONLINE_WORLD.png", 0, 4, 6);
    onlineWorld.position.set(3.8, 16, -7);
    onlineWorld.rotation.set(0, 0, 0.25);
    onlineWorld.name = "onlineWorld";
    cubeList.push(onlineWorld);
    scene.add(onlineWorld);
    
    //add interactive graphics cube
    let graphics = makeCube("images/mainPage/Graphics.png", 0, 4, 6);
    graphics.position.set(2.5, 21, 0);
    graphics.rotation.set(0, 0, 0.25);
    graphics.name = "graphics";
    cubeList.push(graphics);
    scene.add(graphics);
    
    //add interactive techSystems cube
    let techSystems = makeCube("images/theJoyOfGaming.jpg", 0, 4, 6);
    techSystems.position.set(2.5, 21, 7);
    techSystems.rotation.set(0, 0, 0.25);
    techSystems.name = "techSystems";
    cubeList.push(techSystems);
    scene.add(techSystems);
    
    //add interactive webdevelopment cube
    let webdevelopment = makeCube("images/theJoyOfGaming.jpg", 0, 4, 6);
    webdevelopment.position.set(2.5, 21, -7);
    webdevelopment.rotation.set(0, 0, 0.25);
    webdevelopment.name = "webdevelopment";
    cubeList.push(webdevelopment);
    scene.add(webdevelopment);
    
    // Add a backplate to the cubes so you can't click through the arcade machine
    let backplate = makeCube("images/theJoyOfGaming.jpg", 0, 30, 30);
    backplate.position.set(3.7, 15, 0);
    backplate.rotation.set(0, 0, 0.25);
    backplate.name = "backplate";
    cubeList.push(backplate);
    backplate.material.transparent = true;
    backplate.material.opacity = 0;
    scene.add(backplate);

    return cubeList;
}