import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from './js/SceneUtil.js'
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new SceneUtil.getPerpectiveCamera();
const light = new SceneUtil.getSpotlight();
scene.add(light);
camera.position.set(1,1,1);
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

animate();
scene.add(drawUnitBoundry());
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

        /*****************************/
        let col = color(i)
        console.log(col);
        
        let THREErgb = new THREE.Color("rgb("+col[0]+", "+col[1]+", "+col[2]+")");


        let geo = new THREE.SphereGeometry(0.01,20,20);
        let mat = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: THREErgb
        });

        let mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(col[0]/255,col[1]/255,col[2]/255);
        scene.add(mesh);

    }
}

function color(t){
    return [    
        parseInt(t*6),
        parseInt(100*Math.abs(Math.cos((6*t)))),
        parseInt((t*6))
        
    ];
}
    
//UNCOMMENT FROM HERE DOWN TO RESTORE SAUL





////////////////////////////////////////////////////////









// //create a cube with saul on it
// let saulMesh = createSaul(3);
// scene.add(saulMesh);


// let boundrySize = 20
// let velocityArr = []
// velocityArr.push(Math.random()/12, Math.random()/12, Math.random()/12);
// console.log("v arr = ",velocityArr);






// function createSaul(size){
//     let texture = new THREE.TextureLoader().load( './misc/saul.jfif' );
//     let saulMaterial = new THREE.MeshBasicMaterial({
//         map: texture
//     })
//     let saulGeo = new THREE.BoxGeometry(size,size,size);

//     let saulMesh = new THREE.Mesh(saulGeo,saulMaterial);
    
//     saulMesh.position.set(0,0,0);
//     return saulMesh;
// }

// function updateSaul(){
//     if(Math.abs(saulMesh.position.x) > boundrySize/2){
//         velocityArr[0]*=-1;
//     }else if(Math.abs(saulMesh.position.y) > boundrySize/2){
//         velocityArr[1]*=-1;

//     }else if(Math.abs(saulMesh.position.z) > boundrySize/2){
//         velocityArr[2]*=-1;

//     }
//     saulMesh.rotation.x += 0.01
//     saulMesh.rotation.y += 0.02;
//     saulMesh.rotation.z += 0.05;

//     saulMesh.position.x += velocityArr[0]
//     saulMesh.position.y += velocityArr[1]
//     saulMesh.position.z += velocityArr[2]

    
// }



// function render() {
//     renderer.render(scene, camera)
    
// }

// function animate() {
//     requestAnimationFrame(animate);
//     updateSaul();
//     render();
    
    
// }




// animate();


// document.getElementById("playBTN").onclick = checkAudio;



// function checkAudio(){
//     if(!isPlaying){
//         isPlaying = true;
//         playAudio();
//     }else{
//         alert("audio is already playing");
//     }
// }



// function playAudio(){
//     var listener = new THREE.AudioListener();
//     camera.add( listener );

//     // create a global audio source
//     var sound = new THREE.Audio( listener );

//     var audioLoader = new THREE.AudioLoader();

//     //Load a sound and set it as the Audio object's buffer
//     audioLoader.load( './misc/saul.mp3', function( buffer ) {
//         sound.setBuffer( buffer );
//         sound.setLoop(true);
//         sound.setVolume(0.5);
//         sound.play();
//     });

// }
// var isPlaying = false;