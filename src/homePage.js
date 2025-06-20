import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { addButtonsToScene, addArcadeMachine, animateScale, addBackground } from './homePageHelper.js';


////// Setup //////

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0;
camera.position.x = 50
camera.position.y = 40;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ 
	canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

//add model to scene
addArcadeMachine(scene);

// Add ambient light to scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color and intensity (0.5 is a moderate brightness)
scene.add(ambientLight);

// Add controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 15, 0);

// Load HDR environment map
addBackground(scene);

////// Event Listeners //////

// Add buttons to scene. we get a cubelist to check for intersections
let cubeList = addButtonsToScene(scene);

// make raycase and mouse to detect the intersection
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// Event listener for mouse move
window.addEventListener('mousemove', (event) => {
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    let intersects = raycaster.intersectObjects(cubeList);

    if (intersects.length > 0) {
        const hoveredCube = intersects[0].object;

        // Animate scale only if necessary
        if (hoveredCube.scale.x !== 1.1) {
            animateScale(hoveredCube, 1.1);
        }
    }
    // Reset scale of other cubes
    cubeList.forEach(cube => {
        if (!intersects.length || cube !== intersects[0].object) {
            if (cube.scale.x !== 1) {
                animateScale(cube, 1);
            }
        }
    });
});

// Event listener for mouse click
window.addEventListener('mousedown', (event) => {
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    let intersects = raycaster.intersectObjects(cubeList);

    if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        // Load different HTML pages based on the clicked cube's name
        switch (clickedCube.name) {
            case 'backplate':
                break;
            case 'contact':
                window.location.href = 'contact.html';
                break;
            case 'hobbies':
                window.location.href = 'hobbies.html';
                break;
            case 'network':
                window.location.href = 'networking.html';
                break;
            case 'webDev':
                window.location.href = 'webdev.html';
                break;
            case 'graphics':
                window.location.href = 'graphics.html';
                break;
            case 'techSystems':
                window.location.href = 'techsys.html';
                break;
            case 'aboutMe':
                window.location.href = 'aboutme.html';
                break;
            default:
                console.log('Unknown cube clicked');
        }
    }
});

//function to resize the window
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize );


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();
