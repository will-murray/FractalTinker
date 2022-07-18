import Complex from "./Complex.js";
import * as Conversion from "./Conversion.js"
console.log("here");
let MaxSeqLength = 40;
let span = 0.5;
origin = [0,0.5]
let inc = span/60;

let state = 0;


document.getElementById("toggle").onclick = toggleFunctionality;
document.getElementById("display").onmousemove = executeFunctionality;

let CANVAS = document.getElementById("display");




function executeFunctionality(event){
    if(state == 0){
        drawJulia(event);
    }
}

function toggleFunctionality(){
    console.log("toggle")
    let modeLabel = document.getElementById("modeLabel")
    if(state == 1){
        state = 0;
        modeLabel.innerHTML = "Mode: Julia";
    }else{
        state = 1;
        modeLabel.innerHTML = "Mode: Mandlebrot";
        drawMandlebrot()

    }
}



function drawMandlebrot(){
    let ctx = CANVAS.getContext('2d');

    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight)

    for(let i =-1*(span + Math.abs(origin[0]));i<span + Math.abs(origin[0]);i+=inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<span + Math.abs(origin[1]);j+=inc){

            let c = new Complex(i,j);
            let result = sequenceLength(new Complex(0,0), c, 0);

            if(result != MaxSeqLength){
                ctx.fillStyle = getCol(result);
                let px = Conversion.complexToPixels(i,j,span,CANVAS.width);
                ctx.fillRect(px[0],px[1],3,3);


            }
        }
    }
    let orgPOINT = Conversion.complexToPixels(0,0,span,CANVAS.width);
    ctx.fillStyle = "Black";
    ctx.fillRect(orgPOINT[0],orgPOINT[1],15,15);

}

function drawJulia(event){
    let ctx = CANVAS.getContext('2d');

    //clear the canvas
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)

    //covert the clicked point to Complex, with 2 decimals of accuracy
    let click = Conversion.pixelsToComplex(event.x,event.y,span,CANVAS.width);
    let clickX = parseFloat(click[0]);
    let clickY = parseFloat(click[1]);
    document.getElementById("xpos").innerHTML = "Cursor: "+ click[0] + ", ";
    document.getElementById("ypos").innerHTML = click[1];

    let c = new Complex(clickX,clickY);


    for(let i =-1*(span + Math.abs(origin[0]));i<span + Math.abs(origin[0]);i+=inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<span + Math.abs(origin[1]);j+=inc){

            let z = new Complex(i,j);
            let result = sequenceLength(z,c,0);

            if(result != MaxSeqLength){
                ctx.fillStyle = getCol(result);
                let px = Conversion.NScomplexToPixels(i,j,span,CANVAS.width);
                ctx.fillRect(px[0],px[1],3,3);


            }
        }
    }

    let orgPOINT = Conversion.complexToPixels(0,0,span,CANVAS.width);
    ctx.fillStyle = "Black";
    ctx.fillRect(orgPOINT[0],orgPOINT[1],15,15);

}


//returns length of complex sequence rooted at c = (a+bi)
    //if sequence length is not in [3,MaxSeqLength], return MaxSeqLength
    //to indicate that the point wont be plotted

function sequenceLength(z,c,iteration){

    if(z.magnitude() > 2){
        if(iteration < 3){
            return MaxSeqLength;
        }
        return iteration;
    }
    else if(iteration >= MaxSeqLength){
        return MaxSeqLength;
    }
    else{
        z.square()
        let next = z;
        next.plus(c);
        return sequenceLength(next,c,iteration+1)
    }
}

//pushes the complex sequence rooted at c = (a+bi) onto list
function getSequence(z,c,iteration,list){
    list.push(new Complex(z.real, z.img));
    if(z.magnitude() > 2){
        return;
    }
    else if(iteration >= MaxSeqLength){
        return;
    }
    else{

        z.square()
        let next = z;
        next.plus(c);
        return getSequence(next,c,iteration+1,list);
    }
}


function getCol(result){
    if(result <=2){
        return null;
    }
    if(result <4){
        return "black";
    }
    if(result <5){
        return "purple";
    }
    if(result <= 6){
        return "red";
    }
    if(result <= 7){
        return "darkorange";
    }
    if(result <= 8){
        return "orange";
    }
    if(result <= 10){
        return "yellow";
    }
    if(result <= 12){
        return "blue";
    }
    if(result <= 14){
        return "darkblue";
    }
    if(result <= 16){
        return "green";
    }
    if(result <= 18){
        return "lime";
    }
    if(result <= 19){
        return "turquoise";
    }
    if(result <21){
        return "purple";
    }
    if(result <= 23){
        return "red";
    }
    if(result <= 25){
        return "darkorange";
    }
    if(result <= 27){
        return "orange";
    }
    if(result <= 29){
        return "yellow";
    }
    if(result <= 31){
        return "blue";
    }
    if(result <= 33){
        return "darkblue";
    }
    if(result <= 35){
        return "green";
    }
    if(result <= 37){
        return "lime";
    }

    else{
        return null;
    }


}








