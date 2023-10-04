import FractalCanvas from './FractalCanvas.js'
import colorWaveInvert from '../colorwave.js';
import selectFunction from './functionSet.js';
import selectColor from './colorSet.js';
import { changeColorChoice } from '../colorwave.js';


let complexPlane = new FractalCanvas();


document.getElementById("changeModeBtn").onclick = function toggleFunctionality(){
    complexPlane.changeMode();
};
document.getElementById("inverter").onclick = function invertColors(){
    complexPlane.colorInvert()
    colorWaveInvert()
}



function updateDisplay(){
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
document.getElementById("goBTN").onclick = updateDisplay()
document.body.onload = function initCanvas(){
    let message = document.createElement("h1");
    message.innerHTML = "move your cursor around this ^ canvas"
    message.style.color = "White"
    document.getElementById("lowerDisplay").appendChild(message);
    complexPlane.init();
    complexPlane.fchoice = 0;
    complexPlane.colorChoice=3;
    updateDisplay();
}
complexPlane.canvas.onmouseenter = function fadeMessage(){
    let lowerDisplay = document.getElementById("lowerDisplay");
    lowerDisplay.removeChild(lowerDisplay.lastChild);
}
complexPlane.canvas.onmousemove = function getJuliaFrame(event){
    if(complexPlane.state == 0){
        complexPlane.juliaSet(event.x,event.y);
    }
}






