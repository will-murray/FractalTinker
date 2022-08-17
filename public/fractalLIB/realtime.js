import FractalCanvas from './FractalCanvas.js'

let complexPlane = new FractalCanvas();
document.body.onload = function initCanvas(){
    complexPlane.init();
}

document.getElementById("toggle").onclick = function toggleFunctionality(){
    complexPlane.toggle();
};

complexPlane.canvas.onmousemove = function getJuliaFrame(event){
    if(complexPlane.state == 0){
        complexPlane.juliaSet(event.x,event.y);

    }
}




