import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
import * as Builds from './js/Builds.js'
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new SceneUtil.getPerpectiveCamera();
const light = new SceneUtil.getSpotlight();
scene.add(light);
camera.position.set(0,4,4);
camera.lookAt(0,0,0)





const renderer = SceneUtil.getRenderer();

renderer.domElement.id = "webgl-output";

document.getElementById("ThreeCanvas").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)



//Add Lighting
let spotLight = new SceneUtil.getSpotlight();
spotLight.position.set(-10,0,0)
spotLight.lookAt(0,0,0);
scene.add(spotLight);
Builds.addAxis(scene);

function parabaloid(){
    let resolution = 0.05
    let count = 0;
    for(let r=0;r<=3;r+= resolution){
        for(let theta = 0;theta<=6;theta+=resolution){
            let geo = new THREE.BoxGeometry(resolution,resolution,resolution);
            let mat = new THREE.MeshBasicMaterial({
                color: 0xafabef,
                side: THREE.DoubleSide
            })
            let point = new THREE.Mesh(geo,mat);
            let p = positionVector(r, theta);
            point.position.set(p[0],p[1],p[2]);
            scene.add(point);
                
            
            count+=1;
        }
    }
    console.log(count);
}

function positionVector(r, theta){
    /*
    return the components in x, z, y order
    */
    
    return [
        
        Math.sin(r*theta), 
        Math.cos(r),
        Math.sin(r)
        
        
    ]
        
}

parabaloid();


animate();
function render() {
    renderer.render(scene, camera)
    
}

function animate() {
    requestAnimationFrame(animate);
    render();
    
    
}

