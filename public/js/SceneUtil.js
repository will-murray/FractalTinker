import * as THREE from 'three'

export function getPerpectiveCamera(){
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.x = 30;
    camera.position.y = 40;
    camera.position.z = 30;
    
    camera.lookAt(100,100,100);
    return camera;
}

export function getRenderer(){
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

export function getSpotlight(){
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(10, 100, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    spotLight.lookAt(10,0,0);
    return spotLight;
}

export function floorLights(){
    let intensity = 1
    let color = '0x620dff';

    var l1 = new THREE.SpotLight(color,intensity);
    l1.position.set(15,0,15);
    l1.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l1.shadow.camera.far = 130;
    l1.shadow.camera.near = 40;
    l1.lookAt(0,5,0);

    var l2 = new THREE.SpotLight(color,intensity);
    l2.position.set(-15,0,15);
    l2.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l2.shadow.camera.far = 130;
    l2.shadow.camera.near = 40;
    l2.lookAt(0,5,0);

    var l3 = new THREE.SpotLight(color,intensity);
    l3.position.set(15,0,-15);
    l3.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l3.shadow.camera.far = 130;
    l3.shadow.camera.near = 40;
    l3.lookAt(0,5,0);

    var l4 = new THREE.SpotLight(color,intensity);
    l4.position.set(-15,0,-15);
    l4.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l4.shadow.camera.far = 130;
    l4.shadow.camera.near = 40;
    l4.lookAt(0,5,0);

    var l5 = new THREE.AmbientLight(color);
    l5.position.set(0,1,0);

    var l6 = new THREE.AmbientLight(color);
    l6.position.set(-5,0,-5);
    var l7 = new THREE.AmbientLight(color);
    l7.position.set(5,0,5);
    var l8 = new THREE.AmbientLight(color);
    l8.position.set(5,0,-5);
    var l9 = new THREE.AmbientLight(color);
    l9.position.set(-5,0,5);

    return [l1,l2,l3,l4,l5,l6,l7,l8,l9];
}

export function topLights(){
    let intensity = 1
    let color = '0x620dff';

    var l1 = new THREE.SpotLight(color,intensity);
    l1.position.set(15,15,15);
    l1.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l1.shadow.camera.far = 130;
    l1.shadow.camera.near = 40;
    l1.lookAt(0,5,0);

    var l2 = new THREE.SpotLight(color,intensity);
    l2.position.set(-15,15,15);
    l2.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l2.shadow.camera.far = 130;
    l2.shadow.camera.near = 40;
    l2.lookAt(0,5,0);

    var l3 = new THREE.SpotLight(color,intensity);
    l3.position.set(-15,15,-15);
    l3.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l3.shadow.camera.far = 130;
    l3.shadow.camera.near = 40;
    l3.lookAt(0,5,0);

    var l4 = new THREE.SpotLight(color,intensity);
    l4.position.set(15,15,-15);
    l4.shadow.mapSize = new THREE.Vector2(1024, 1024);
    l4.shadow.camera.far = 130;
    l4.shadow.camera.near = 40;
    l4.lookAt(0,5,0);

    return [l1,l2,l3,l4];
    
}