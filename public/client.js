import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
import * as Builds from './js/Builds.js'

//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = SceneUtil.getPerpectiveCamera();
const renderer = SceneUtil.getRenderer();
const controls = new OrbitControls(camera, renderer.domElement)


//Add Lighting
let spotLight = new SceneUtil.getSpotlight();
scene.add(spotLight);
var ambienLight = new THREE.AmbientLight( 0x404040 );
scene.add(ambienLight);

let floorLights = SceneUtil.floorLights();
addMeshList(floorLights);


window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)


Builds.addGround(scene);
Builds.addOrigon(scene);


let serp = new Builds.Serpinski3d([0,0,0],10);
serp.render(scene);


function subDivide(){
    console.log("in subdivide");
    serp.recurse(scene);
}

function addMeshList(arr){
    for(let i=0;i<arr.length;i++){
        scene.add(arr[i]);
    }
}

function render() {
    renderer.domElement.id = "webgl-output";
    document.getElementById("ThreeRender").appendChild(renderer.domElement);
    renderer.render(scene, camera)
}
function animate() {
    requestAnimationFrame(animate)

    render();
    
    
}


animate()

let clicks = 0;


if(clicks <7){
    document.getElementById("trigger").onclick = subDivide;
    clicks++;
    console.log(clicks);
}


document.getElementById("TexButton").onclick = openDetails;


//todo: make this fns open the Tex PDF
function openDetails(){
    window.open("./misc/3D_Serpinski_Triangle (1).pdf")
}
