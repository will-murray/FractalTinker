import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from '../js/SceneUtil.js'
import * as Builds from '../js/Builds.js'
import Complex from '../fractalLIB/Complex.js'
let span = 2.5;
let inc = 0.01;
let MaxSeqLength = 20;



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
document.getElementById("ThreeRender").appendChild(renderer.domElement);



function render() {
    renderer.domElement.id = "webgl-output";
    renderer.render(scene, camera)
}
function animate() {
    requestAnimationFrame(animate);
    render();
    
}

function mandle3Mesh(){
    console.log("here");
    let geometry = new THREE.BufferGeometry();
    let material = new THREE.MeshBasicMaterial({
        color:  0x770d8e,
        side: THREE.DoubleSide
    });
    let vertices = [];
    for(let i = -span;i<span;i+=inc){
        for(let j = -span;j<span;j+=inc){
            let c = new Complex(i,j);
            let length = sequenceLengthIter(new Complex(0,0), c, 0);
            console.log(length);
            if(length != MaxSeqLength){
                vertices.push(i);
                vertices.push(length/5);
                vertices.push(j);


            }


        }    
    }
    geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ));
    let mesh = new THREE.Mesh(geometry,material);
    mesh.castShadow = true;
    mesh.name = "mandle";
    return mesh;

}

function sequenceLengthIter(z,c,iteration){
    while(z.magnitude() < 2 && iteration < MaxSeqLength){
        z.square()
        let next = z;
        next.plus(c);
        iteration++;
    }
    
    if(iteration>= MaxSeqLength || iteration <3){
        return MaxSeqLength;
    }

    return iteration;

}

let mesh = mandle3Mesh();
scene.add(mesh);

animate();
