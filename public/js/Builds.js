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


export function addAxis(scene){
    let xmat = new THREE.LineBasicMaterial( {color:0x0000ff});
    let xpoints = [new THREE.Vector3(0,0,0), new THREE.Vector3(1,0,0)]
    let xgeo = new THREE.BufferGeometry().setFromPoints(xpoints);
    let xline = new THREE.Line(xgeo,xmat);

    let ymat = new THREE.LineBasicMaterial( {color:0x00ff00});
    let ypoints = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,1)]
    let ygeo = new THREE.BufferGeometry().setFromPoints(ypoints);
    let yline = new THREE.Line(ygeo,ymat);



    let zmat = new THREE.LineBasicMaterial( {color:0xff0000});
    let zpoints = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0)]
    let zgeo = new THREE.BufferGeometry().setFromPoints(zpoints);
    let zline = new THREE.Line(zgeo,zmat);

    scene.add(xline);
    scene.add(yline);
    scene.add(zline);

}
const loader = new THREE.TextureLoader();

export function growMeadow(scene){
    let material = new THREE.MeshBasicMaterial({
        map: loader.load('./misc/grass.jpg'),
        side:THREE.DoubleSide
    })
    let geometry = new THREE.CircleGeometry(700)
    let mesh = new THREE.Mesh(geometry,material);
    mesh.rotation.x = -0.5 * Math.PI;
    scene.add(mesh)
}

export function buildCharacterMesh(scene){
    return new Character(scene)

}

class Character{
    constructor(scene){
        this.offset = 0;    
        this.bodyMesh = this.buildBodyMesh()
        this.render(scene)
    }

    render(scene){
        for(let i=0;i<this.bodyMesh.length;i+=1){
            scene.add(this.bodyMesh[i])
        }
    }

    buildBodyMesh(){
        let meshList = [];
        for(let i=1;i<10;i+=1){
            meshList.push(this.getBodySegment(0.2*i))
        }
        return meshList;

    }
    getBodySegment(radius){
        let material = new THREE.MeshBasicMaterial({
            color: 0x324534,
            side: THREE.DoubleSide
        })
        let geometry = new THREE.SphereGeometry(radius,20,20)
        let mesh = new THREE.Mesh(geometry,material)
        mesh.position.set(0,5,this.offset+radius/2);
        this.offset += radius;
        return mesh;

    }

    
}


export function buildTree(scene){
    let tree = new recursiveTree([5,0,5])
    for(let i=0;i<tree.branchList.length;i++){
        scene.add(tree.branchList[i])
    }
}
class recursiveTree{

    constructor(pos){
        this.branchList = [];
        this.quad = 0;
        this.buildTree(pos,this.quad,2)
    }

    buildTree(pos,quad,offset){
        for(let i=0;i<4;i++){
            let dead = Math.floor(Math.random() * 4);

            if(!dead){
                let newpos = this.getNewPosition(pos,i,offset)
                let branch = this.buildBranch(pos,newpos);
                this.branchList.push(branch)
                this.buildTree()

            }
            
        }
    }

    getNewPosition(pos,i,offset){
        let result = [];
        if(i == 0){
            result.push(pos[0] + offset)
            result.push(pos[1] + offset)
            result.push(pos[2] + offset)

        }
        else if(i == 2){
            result.push(pos[0] - offset)
            result.push(pos[1] + offset)
            result.push(pos[2] + offset)
        }
        else if(i == 3){
            result.push(pos[0] - offset)
            result.push(pos[1] + offset)
            result.push(pos[2] - offset)
        }
        else{
            result.push(pos[0] + offset)
            result.push(pos[1] + offset)
            result.push(pos[2] - offset)
        }
        return result
    }

    buildBranch(pos,newpos){
        let v1 = new THREE.Vector3(pos[0], pos[1], pos[2])
        let v2 = new THREE.Vector3(newpos[0], newpos[1], newpos[2])
        let curve =  new THREE.LineCurve3(v1,v2)
        return curve


    }

}

export function createDome(scene){
    let material = new THREE.MeshBasicMaterial({
        map: loader.load("./misc/starrynight.jpg"),
        side: THREE.DoubleSide
    })
    let geometry = new THREE.SphereGeometry(1200,50,50);
    let mesh = new THREE.Mesh(geometry,material);

    scene.add(mesh);
}

export function directionalLight(scene){
    let light = new THREE.PointLight(0xffffff,1)
    let dlight = new THREE.DirectionalLight(0xffffff, 0.5 )
    light.position.set(0,1000,0)
    light.castShadow = true;
    scene.add(light)
}

export function bigPlane(scene){
    let material = new THREE.MeshBasicMaterial({
        color: 0xee0000,
        side: THREE.DoubleSide
    })
    let geometry = new THREE.PlaneGeometry(4000,4000);
    let mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(0,-700,0)
    mesh.rotation.x = -0.5* Math.PI;
    scene.add(mesh)
}

export function keiriousGorge(pos,rad){
    let photoChoice = Math.floor(Math.random() * 6)
    console.log(photoChoice)
    let material = new THREE.MeshBasicMaterial({
        map: loader.load(photoDictionary[photoChoice]),
        side: THREE.DoubleSide
    })
    // let geometry = new THREE.SphereGeometry(rad,20,20);
    let geometry = new THREE.BoxGeometry(rad,rad,rad);
    let mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(pos[0], pos[1], pos[2])
    return mesh;
}

export function daddyK(scene){
    for(let i=0;i< 500;i+=1){
        let pos = [rand(),rand(),rand()];
        let rad = Math.floor(Math.random() *30);
        scene.add(keiriousGorge(pos,rad));

    }
}

function rand(){
    let result =3*Math.floor(Math.random() * 200);
    let flip = Math.floor(Math.random()*10)%2 == 0
    if(flip){
        result*=-1;
    }
    return result;

}


let photoDictionary = {
    0 : "./misc/simon.png",
    1 : "./misc/aidan.png",
    2 : "./misc/keir.jpg",
    3 : "./misc/matthew.png",
    4 : "./misc/alex.png",
    5 : "./misc/will.png" 

}

export function whiteBackground(scene){
    let material = new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide});
    let geometry = new THREE.BoxGeometry(5,5,5)

    let mesh = new THREE.Mesh(geometry,material);

    scene.add(mesh);


}

