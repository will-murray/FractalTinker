import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
import * as Build from './js/Builds.js'
import selectColor from './fractalLIB/colorSet.js'
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new SceneUtil.getPerpectiveCamera();
const light = new SceneUtil.getSpotlight();
scene.add(light);
camera.position.set(1,0.5,0.8);
camera.lookAt(0,0,0)


let cidx = [0,1,2]
let colorChoice = 2
let color = selectColor(colorChoice)

export function changeColorChoice(newColor){
    console.log(newColor);
    colorChoice = newColor
    color = selectColor(colorChoice)
    clearMesh()
    drawCurve(scene)

}
const renderer = SceneUtil.getRenderer();

renderer.domElement.id = "webgl-output";

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

let display = document.getElementById("ThreeCanvas");

renderer.setSize(800,500);


document.getElementById("ThreeCanvas").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

function addSceneChildren(){
    let spotLight = new SceneUtil.getSpotlight();
    spotLight.position.set(-10,0,0)
    spotLight.lookAt(0,0,0);
    scene.add(spotLight);
    Build.addAxis(scene);

}



animate();
addSceneChildren();
drawCurve(scene);



function render() {
    renderer.render(scene, camera)
    
}

function animate() {
    
    requestAnimationFrame(animate);
    render();
    
    
}


function drawUnitBoundry(){
    let material = new THREE.MeshBasicMaterial({
        wireframe: true

    })
    let geometry = new THREE.BoxGeometry(1,1,1);

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0.5,0.5,0.5);
    return mesh;
}

function drawCurve(scene){
    let max = 40;
    for(let i = 0; i < max;i += 0.2){

        let col = color(i)
        
        let THREErgb = new THREE.Color("rgb("+col[cidx[0]]+", "+col[cidx[1]]+", "+col[cidx[2]]+")");


        let geo = new THREE.SphereGeometry(0.01,20,20);
        let mat = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: THREErgb
        });

        let mesh = new THREE.Mesh(geo, mat);
        mesh.name = "colorball"
        mesh.position.set(col[cidx[0]]/255,col[cidx[1]]/255,col[cidx[2]]/255);
        scene.add(mesh);

    }
}



function shiftCidx(){
    let temp = cidx[0]
    cidx[0] = cidx[1];
    cidx[1] = cidx[2];
    cidx[2] = temp;
}

function clearMesh(){
    scene.children = []
    addSceneChildren()
}

export default function colorWaveInvert(){
    clearMesh()
    shiftCidx()
    drawCurve(scene);
}
