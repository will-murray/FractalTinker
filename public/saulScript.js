import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
import * as Builds from './js/Builds.js'
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new SceneUtil.getPerpectiveCamera();
camera.position.set(0,0,20);
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





//create a cube with saul on it
let saulMesh = createSaul(3);
scene.add(saulMesh);


let boundrySize = 20
let velocityArr = []
velocityArr.push(Math.random()/12, Math.random()/12, Math.random()/12);
console.log("v arr = ",velocityArr);






function createSaul(size){
    let texture = new THREE.TextureLoader().load( './misc/saul.jfif' );
    let saulMaterial = new THREE.MeshBasicMaterial({
        map: texture
    })
    let saulGeo = new THREE.BoxGeometry(size,size,size);

    let saulMesh = new THREE.Mesh(saulGeo,saulMaterial);
    
    saulMesh.position.set(0,0,0);
    return saulMesh;
}

function updateSaul(){
    if(Math.abs(saulMesh.position.x) > boundrySize/2){
        velocityArr[0]*=-1;
    }else if(Math.abs(saulMesh.position.y) > boundrySize/2){
        velocityArr[1]*=-1;

    }else if(Math.abs(saulMesh.position.z) > boundrySize/2){
        velocityArr[2]*=-1;

    }
    saulMesh.rotation.x += 0.01
    saulMesh.rotation.y += 0.02;
    saulMesh.rotation.z += 0.05;

    saulMesh.position.x += velocityArr[0]
    saulMesh.position.y += velocityArr[1]
    saulMesh.position.z += velocityArr[2]

    
}



function render() {
    renderer.render(scene, camera)
    
}

function animate() {
    requestAnimationFrame(animate);
    updateSaul();
    render();
    
    
}




animate();


document.getElementById("playBTN").onclick = checkAudio;



function checkAudio(){
    if(!isPlaying){
        isPlaying = true;
        playAudio();
    }else{
        alert("audio is already playing");
    }
}



function playAudio(){
    var listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    var sound = new THREE.Audio( listener );

    var audioLoader = new THREE.AudioLoader();

    //Load a sound and set it as the Audio object's buffer
    audioLoader.load( './misc/saul.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });

}
var isPlaying = false;