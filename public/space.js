import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
import * as Builds from './js/Builds.js'
import Complex from './fractalLIB/Complex.js'
import { CameraHelper } from 'three'
let span = 2.5;
let inc = 0.01;
let MaxSeqLength = 20;




//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = SceneUtil.getPerpectiveCamera();
const renderer = SceneUtil.getRenderer();
const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0,0,10)
camera.lookAt(0,0,10)

let cPos = camera.position;
//Add Lighting
let spotLight = new SceneUtil.getSpotlight();
scene.add(spotLight);
var ambienLight = new THREE.AmbientLight( 0x404040 );
scene.add(ambienLight);

let floorLights = SceneUtil.floorLights();



Builds.addGround(scene);
Builds.addOrigon(scene);
document.getElementById("ThreeRender").appendChild(renderer.domElement);



function render() {
    renderer.domElement.id = "webgl-output";
    renderer.render(scene, camera)
}
function animate() {
    
    console.log("animate")
    render();
    
}

/*
    w = 87
    a = 65
    s = 83
    d = 68
*/
document.onkeydown = (event) => {
    if(event.keyCode == 87){
        console.log(camera.)
        requestAnimationFrame(animate)
    }
}


animate()

