import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from '../js/SceneUtil.js'
import * as Builds from '../js/Builds.js'
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new SceneUtil.getPerpectiveCamera();
camera.position.set(15,15,15);





const renderer = SceneUtil.getRenderer();

renderer.domElement.id = "webgl-output";
document.getElementById("ThreeCanvas").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)


let ambiLight = new THREE.AmbientLight( 0xffffff );
scene.add(ambiLight);
//Add Lighting
let spotLight = new SceneUtil.getSpotlight();
spotLight.position.set(-10,0,0)
spotLight.lookAt(0,0,0);
scene.add(spotLight);
Builds.addGround(scene);
let span = 10
let inc = 0.5;
multiVar(span,inc/8);

function render() {
    renderer.render(scene, camera)
    
}

function animate() {
    requestAnimationFrame(animate);
    render();
    
    
}

animate();


// function multiVar(span, inc){
//     for(let i =-span;i<span;i+=inc){
//         for(let j =-span;j<span;j+=inc){
            
//             let k =f(i,j);
            
//             let color = perc2color(k*75);
//             let Mat = new THREE.MeshLambertMaterial({
//                 color:color,
//                 side: THREE.DoubleSide
//             }); 
//             // let boxGeo = new THREE.BoxGeometry(inc/2,k,inc/2);
//             let circleGeo = new THREE.CircleGeometry(inc/2,8);
            
//             let Mesh = new THREE.Mesh(circleGeo,Mat);
//             Mesh.rotation.x = -0.5 * Math.PI;
//             Mesh.position.set(i,k,j);
//             scene.add(Mesh);
//         }
//     }
// }

function multiVar(span,inc){
    for(let i =-span;i<span;i+=inc){
        let material = new THREE.MeshBasicMaterial({
            wireframe:true
        })
        let geometry = new THREE.BufferGeometry();
        let rawVertices = []
        for(let j =-span;j<span;j+=inc){
            let k = f(i,j);
            rawVertices.push(i);
            rawVertices.push(k);
            rawVertices.push(j);
        
        }
        geometry.setAttribute('position',new THREE.BufferAttribute( new Float32Array(rawVertices), 3 ))
        let mesh = new THREE.Mesh(geometry,material);
        mesh.position.set(0,0,0);
        scene.add(mesh);
        
    }
    

}

function f(x,z){
    
    return (Math.sin(x))**2 + (Math.cos(z))**3;
}


function updateSunRise(){
    let increment= 0.01
    if(spotLight.position.x > 9.8){
        increment*=-1;
    }
    spotLight.position.x += increment;
    spotLight.position.y = Math.sqrt(100 - (spotLight.position.x)**2);
    spotLight.lookAt(0,0,0);
    bulb.position.x = spotLight.position.x;
    bulb.position.y = spotLight.position.y;

    console.log("light = ",spotLight.position.y,", ",spotLight.position.y,", ",spotLight.position.z);
    console.log("shape = ",bulb.position.y,", ",bulb.position.y,", ",bulb.position.z);

}

function setupSunrise(scene){
    let wallMat = new THREE.MeshLambertMaterial({
        color:0x097c1b,
        side: THREE.DoubleSide
    }); 
    let wallGeo = new THREE.BoxGeometry(10,10,10)
    let wallMesh = new THREE.Mesh(wallGeo,wallMat);
    wallMesh.rotation.x = -0.5 * Math.PI;
    wallMesh.position.set(0,0,0);
    scene.add(wallMesh);
    
    
    let bulbMat = new THREE.MeshLambertMaterial({
        color:0xf8ff02,
        side: THREE.DoubleSide
    }); 
    let bulbGeo = new THREE.SphereGeometry(2,8,6);
    let bulb = new THREE.Mesh(bulbGeo,bulbMat);
    bulb.position.set(-10,0,0)
    scene.add(bulb);
    return bulb;
}


function perc2color(perc) {
    if(perc > 100){
        perc = 100
    }else if(perc < 0){
        perc = 0;
    }
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}






