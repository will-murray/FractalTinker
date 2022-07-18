import * as THREE from 'three'
import { Texture } from 'three';


export class Serpinski3d{
    constructor(position,size){
        this.pyramidData = []
        let basisPyramid = new Pyramid(position,size,size);
        this.pyramidData.push(basisPyramid);
    }
    remove(scene){
        for(let i=0;i<this.pyramidData.length;i++){
            for(let j=0;j<this.pyramidData[i].meshData.length;j++){
                scene.remove(this.pyramidData[i].meshData[j]);
            }
        }
    }

    render(scene){
        for(let i=0;i<this.pyramidData.length;i++){
            this.pyramidData[i].render(scene);
        }
    }

    recurse(scene){
        this.remove(scene);
        let newPyramidData = []
        while(this.pyramidData.length > 0){
            let py = this.pyramidData.pop();
            py.subPyramidsToBuffer(newPyramidData);
        }
        this.pyramidData = newPyramidData;
        this.render(scene);
    }
}

class Pyramid{
    constructor(midpoint,span,height){
        this.midpoint = midpoint;
        this.span = span;
        this.height = height;
        this.meshData = createPyramid(midpoint,span,height);
        
    }

    toPyramidStack(){
        pyramidStack.push(this);
    }

    render(scene){
        for(let i=0;i<this.meshData.length;i++){
            scene.add(this.meshData[i]);
            
        }
    }

    subPyramidsToBuffer(buffer){
        
        let a = new Pyramid(
            [this.midpoint[0] - (this.span/4),this.midpoint[1],this.midpoint[2]-(this.span/4)],
            this.span/2,
            this.height/2
        )
        let b = new Pyramid(
            [this.midpoint[0] + (this.span/4),this.midpoint[1],this.midpoint[2]-(this.span/4)],
            this.span/2,
            this.height/2
        )
        let c = new Pyramid(
            [this.midpoint[0] + (this.span/4),this.midpoint[1],this.midpoint[2]+(this.span/4)],
            this.span/2,
            this.height/2
        )
        let d = new Pyramid(
            [this.midpoint[0] - (this.span/4),this.midpoint[1],this.midpoint[2]+(this.span/4)],
            this.span/2,
            this.height/2
        )
        let e = new Pyramid(
            [this.midpoint[0],this.midpoint[1] +(this.height/2),this.midpoint[2]],
            this.span/2,
            this.height/2
        )
        buffer.push(a);
        buffer.push(b);
        buffer.push(c);
        buffer.push(d);
        buffer.push(e);
        
    }

    
    
}



function createPyramid(mid,span,height){
    
    var baseMaterial = new THREE.MeshLambertMaterial({
        color:0x770d8e,
        side: THREE.DoubleSide
    });
    
    
    var baseGeo = new THREE.PlaneGeometry(span,span);
    var baseMesh = new THREE.Mesh(baseGeo,baseMaterial);
    baseMesh.rotation.x = -0.5*Math.PI;
    baseMesh.position.x = mid[0];
    baseMesh.position.y = mid[1];
    baseMesh.position.z = mid[2];
    baseMesh.name = "pyramidFace";

    //Face 1
    var F1v1 = new THREE.Vector3(mid[0]+span/2,mid[1],mid[2]+span/2);
    var F1v2 = new THREE.Vector3(mid[0]+span/2,mid[1],mid[2]-span/2);
    var F1v3 = new THREE.Vector3(mid[0],mid[1]+height,mid[2]);
    let f1 =createFace(F1v1,F1v2,F1v3);
    //Face 2
    var F2v1 = new THREE.Vector3(mid[0]+span/2,mid[1],mid[2]-span/2);
    var F2v2 = new THREE.Vector3(mid[0]-span/2,mid[1],mid[2]-span/2);
    var F2v3 = new THREE.Vector3(mid[0],mid[1]+height,mid[2]);
    let f2 = createFace(F2v1,F2v2,F2v3);
    //Face 3
    var F3v1 = new THREE.Vector3(mid[0]-span/2,mid[1],mid[2]+span/2);
    var F3v2 = new THREE.Vector3(mid[0]-span/2,mid[1],mid[2]-span/2);
    var F3v3 = new THREE.Vector3(mid[0],mid[1]+height,mid[2]);
    let f3 = createFace(F3v1,F3v2,F3v3);
    //Face 4
    var F4v1 = new THREE.Vector3(mid[0]-span/2,mid[1],mid[2]+span/2);
    var F4v2 = new THREE.Vector3(mid[0]+span/2,mid[1],mid[2]+span/2);
    var F4v3 = new THREE.Vector3(mid[0],mid[1]+height,mid[2]);
    let f4 = createFace(F4v1,F4v2,F4v3);

    return [baseMesh,f1,f2,f3,f4];
    
}
function createFace(v1,v2,v3){
    var geometry = new THREE.BufferGeometry();
    var vertices = [
        v1.x,v1.y,v1.z,
        v2.x,v2.y,v2.z,
        v3.x,v3.y,v3.z,
    ];
    geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ));
    var material = new THREE.MeshBasicMaterial( {
        color: 0x770d8e,
        side: THREE.DoubleSide,

     });
     

    var faceMesh = new THREE.Mesh(geometry,material);
    faceMesh.castShadow = true;
    faceMesh.name = "pyramidFace";
    return faceMesh;


}


export function addOrigon(scene){
    var orgGeometry = new THREE.CircleGeometry(1, 32)
    var orgMaterial = new THREE.MeshBasicMaterial({
        color: 0xEDDFFF,
        side: THREE.DoubleSide
    })

    var orgMesh = new THREE.Mesh(orgGeometry,orgMaterial);
    orgMesh.position.set(0,0.1,0);
    orgMesh.rotation.x = -0.5 * Math.PI;

    scene.add(orgMesh);
}

export function addGround(scene){
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0a8045,
    side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, -5, 0);
    plane.receiveShadow = true;

    // add the objects

    scene.add(plane);
}


