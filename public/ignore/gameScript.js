import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as SceneUtil from '../js/SceneUtil.js'
import * as Builds from '../js/Builds.js'
import { Vector2 } from 'three';

let inc = 0.5;
class Complex {
    
    constructor(real,img) {  // Constructor
      this.MaxSeqLength = 20;
      this.real = real;
      this.img = img;
      

    }

    square(){
        let real = this.real**2 - this.img**2;
        let img = 2*this.real*this.img
        return new Complex(real, img)
    }

    magnitude(){
        return Math.sqrt( this.real**2 + this.img**2 )
    }


}

function findSequenceLength(z,c,iteration){
    
    if(z.magnitude() > 2){
        return iteration;
    }else if(iteration > 20){
        return iteration;
    }else{
        z = z.square()
        z.real += c.real;
        z.img += c.img;
        return findSequenceLength(z,c,iteration+1)
    }
}



let arclist = [];
//Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new SceneUtil.getPerpectiveCamera();
camera.position.set(0,20,0);
camera.lookAt(0,0,0)





const renderer = SceneUtil.getRenderer();

renderer.domElement.id = "webgl-output";
document.getElementById("ThreeCanvas").appendChild(renderer.domElement);





//Add Lighting
let spotLight = new SceneUtil.getSpotlight();
spotLight.position.set(0,10,0)
spotLight.lookAt(0,0,0);
scene.add(spotLight);









function animate(){
    
    
}

animate();

function renderMandle(scene,inc){
    
    let span = 20;
    for(let i = -span;i<span;i+=inc){
        for(let j=-span;j<span;j+=inc){
            let len = findSequenceLength(new Complex(0,0), new Complex(i/10,j/10),0);
            let color = getCol(len)
            getMandlePoint(scene,color,i,j,inc);
            
        }

        
    }
}


function getCol(len){
    if(len <= 2){
        return 0xFFFFFF;
    }else if(len <= 4){
        return 0xE9FF00;
    }else if(len <= 6){
        return 0xFF9B00;
    }else if(len <= 8){
        return 0xFF2E00;
    }else if(len <= 10){
        return 0xBF00FF;
    }else if(len <= 12){
        return 0xFF00F6;
    }else if(len <= 14){
        return 0x00FFF6;
    }else if(len <= 16){
        return 0x00FF09;
    }
    
}

function getMandlePoint(scene,color,i,j,inc){
    let material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    material.color.set(color);
    let geometry = new THREE.PlaneGeometry(2*inc,2*inc);
    let mesh = new THREE.Mesh(geometry,material);
    mesh.rotation.x = -0.5*Math.PI;
    mesh.position.set(i,0,j);
    
    scene.add(mesh)

}





function getCharacterMesh(){
    let mag =10;
    let mat = new THREE.MeshBasicMaterial({
        wireframe:true
    })
    let geo = new THREE.BoxGeometry(mag,mag,mag);
    return new THREE.Mesh(geo,mat);
}

document.onkeydown = handleKeyPress;

function updateCharacter(){
    camera.lookAt(character.position.x,character.position.y,character.position.z,)
    if(arclist.length > 0){
        character.position.y = arclist.pop()
    }
}
function handleKeyPress(event){
    let inc = 0.5;
    console.log(event.key);
    //up
    if(event.key =='w'){
        character.position.z += inc
    }
    //down
    else if(event.key == 's'){
        character.position.z -= inc
    }
    //left
    else if(event.key == 'a'){
        character.position.x -= inc
    }
    //right
    else if(event.key == 'd'){
        character.position.x += inc
        
    }
    else if(event.key == ' '){
        arclist = []
        for(let i=-1;i<1;i+=0.1){
            arclist.push(2 * Math.sqrt(1- (i*i) ))
        }
        console.log(arclist);
    }
}

