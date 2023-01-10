import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
import * as Builds from './js/Builds.js'
import { Vector3 } from 'three';
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
const light = new SceneUtil.getSpotlight();
const ambi = new SceneUtil.topLights();
scene.add(light);
scene.add(ambi[0])
camera.position.set(100,100,100);
camera.lookAt(0,0,0)
let time = 0;
let state = 0;
const inc = 0.01;



const renderer = SceneUtil.getRenderer();

renderer.domElement.id = "webgl-output";

document.getElementById("ThreeCanvas").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)



//Add Lighting
// let spotLight = new SceneUtil.getSpotlight();
// spotLight.position.set(-10,0,0)
// spotLight.lookAt(0,0,0);
// scene.add(spotLight);

// Builds.buildCharacterMesh(scene)

Builds.daddyK(scene);

Builds.createDome(scene);
animate();
function render() {
    renderer.render(scene, camera)
    
}

function animate() {
    if(camera.position.y > 500){
        state = 1
    }
    if(camera.position.y<-500){
        state = 0;
    }
    requestAnimationFrame(animate);
    if(state = 0){
        let pos = unitPositionVector(time)
        camera.position.set(pos[0],5*pos[1],pos[2]);
        camera.lookAt(new Vector3(0,0,0));
        time+=inc
    }else{
        let pos = unitPositionVector(time)
        camera.position.set(time*pos[0],5*pos[1],pos[2]);
        camera.lookAt(new Vector3(0,0,0));
        time-=inc
    }
    render();
    
    
}


function unitPositionVector(t){
    /*
    return the components in x, z, y order
    */
    
    return [
        
        Math.sin(t),
        t,
        Math.cos(t)
        
    ]
        
}
