import FractalCanvas from './FractalCanvas.js'
import colorWaveInvert from '../colorwave.js';
import selectFunction from './functionSet.js';
import selectColor from './colorSet.js';
import { changeColorChoice } from '../colorwave.js';


let complexPlane = new FractalCanvas();
document.body.onload = function initCanvas(){
    complexPlane.init();
}

document.getElementById("changeModeBtn").onclick = function toggleFunctionality(){
    complexPlane.changeMode();
};
document.getElementById("inverter").onclick = function invertColors(){
    complexPlane.colorInvert()
    colorWaveInvert()
}

document.getElementById("goBTN").onclick = function updateDisplay(){
    let z = parseFloat(document.getElementById("zoomInput").value)
    if(!Number.isNaN(z)){
        complexPlane.span = z;
        complexPlane.inc = z/366
    }
    

    let newFchoice = document.getElementById("functionChoice").value
    newFchoice = parseInt(newFchoice.slice(0,1))

    complexPlane.fchoice = newFchoice
    complexPlane.fns = selectFunction(newFchoice);

    let newCchoice = document.getElementById("colorChoice").value;
    newCchoice = parseInt(newCchoice.slice(0,1))

    complexPlane.colorChoice = newCchoice
    complexPlane.color = selectColor(newCchoice);

    changeColorChoice(newCchoice)


    

}

complexPlane.canvas.onmousemove = function getJuliaFrame(event){
    if(complexPlane.state == 0){
        complexPlane.juliaSet(event.x,event.y);
    }
}






