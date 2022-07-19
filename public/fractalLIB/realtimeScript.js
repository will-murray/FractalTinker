import Complex from "./Complex.js";
import * as Conversion from "./Conversion.js"

let MaxSeqLength = 30;
let span = 0.5;
origin = [0,0];
let inc = span/400;
let state = 0;



document.getElementById("toggle").onclick = function toggleFunctionality(){
    let modeLabel = document.getElementById("modeLabel")
    if(state == 1){
        state = 0;
        modeLabel.innerHTML = "Mode: Julia";
    }else{
        state = 1;
        modeLabel.innerHTML = "Mode: Mandlebrot";
        pixelPlot();

    }
};
document.getElementById("display").onmousemove = function executeFunctionality(event){
    if(state == 0){
        fastJuliaPixelPlot(event);
    }
};
let CANVAS = document.getElementById("display");
let ctx = CANVAS.getContext('2d');


function juliaPixelPlot(event){
    ctx.clearRect(0,0 ,CANVAS.width, CANVAS.width);
    let imgData = ctx.getImageData(0,0,CANVAS.width,CANVAS.width);


    let click = Conversion.pixelsToComplex(event.x,event.y,span,CANVAS.width);
    let clickX = parseFloat(click[0]);
    let clickY = parseFloat(click[1]);
    let c = new Complex(clickX,clickY);

    let iBound = span + Math.abs(origin[0]);
    let jBound = span + Math.abs(origin[1])
    for(let i =-1*(span + Math.abs(origin[0]));i<iBound;i+=inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<jBound;j+=inc){
        
            let z = new Complex(i,j);
            let result = sequenceLengthIter(z, c, 0);

            if(result != MaxSeqLength){
                let px = Conversion.complexToPixels(i,j,span,CANVAS.width);
                let k = linearIndex(px[0],px[1]);
                let col = colour(result);

                imgData.data[k] = col[0];
                imgData.data[k+1] = col[1];
                imgData.data[k+2] = col[2];
                imgData.data[k+3] = 255;
            
            }  
        }   
           
    }
    ctx.putImageData(imgData,1,1);
    
}

function fastJuliaPixelPlot(event){
    ctx.clearRect(0,0 ,CANVAS.width, CANVAS.width);
    let imgData = ctx.getImageData(0,0,CANVAS.width,CANVAS.width);


    let click = Conversion.pixelsToComplex(event.x,event.y,span,CANVAS.width);
    let clickX = parseFloat(click[0]);
    let clickY = parseFloat(click[1]);
    let c = new Complex(clickX,clickY);

    let iBound = span + Math.abs(origin[0]);
    let jBound = span + Math.abs(origin[1])
    for(let i =-1*(span + Math.abs(origin[0]));i<iBound;i+=inc + inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<jBound;j+= inc+inc){
        
            let z = new Complex(i,j);
            let result = sequenceLengthIter(z, c, 0);

            if(result != MaxSeqLength){
                let px = Conversion.complexToPixels(i,j,span,CANVAS.width);
                let l1 = linearIndex(px[0],px[1]);      //upper left
                let l2 = linearIndex(px[0] + 1, px[1])  //upper right
                let l3 = linearIndex(px[0], px[1]+1)    //lower left
                let l4 = linearIndex(px[0] + 1, px[1]+1)  //lower right

                
                let col = colour(result);

                imgData.data[l1] = col[0];
                imgData.data[l1+1] = col[1];
                imgData.data[l1+2] = col[2];
                imgData.data[l1+3] = 255;

                imgData.data[l2] = col[0];
                imgData.data[l2+1] = col[1];
                imgData.data[l2+2] = col[2];
                imgData.data[l2+3] = 255;

                imgData.data[l3] = col[0];
                imgData.data[l3+1] = col[1];
                imgData.data[l3+2] = col[2];
                imgData.data[l3+3] = 255;

                imgData.data[l4] = col[0];
                imgData.data[l4+1] = col[1];
                imgData.data[l4+2] = col[2];
                imgData.data[l4+3] = 255;
            
            }  
        }   
           
    }
    ctx.putImageData(imgData,1,1);
    
}


function pixelPlot(){
    ctx.clearRect(0,0 ,CANVAS.width, CANVAS.width);
    let imgData = ctx.getImageData(0,0,CANVAS.width,CANVAS.width);

    let iBound = span + Math.abs(origin[0]);
    let jBound = span + Math.abs(origin[1])
    for(let i =-1*(span + Math.abs(origin[0]));i<iBound;i+=inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<jBound;j+=inc){
        
            let c = new Complex(i,j);
            let result = sequenceLength(new Complex(0,0), c, 0);

            
            if(result != MaxSeqLength){
                let px = Conversion.complexToPixels(i,j,span,CANVAS.width);
                let k = linearIndex(px[0],px[1]);
                let col = colour(result);

                imgData.data[k] = col[0];
                imgData.data[k+1] = col[1];
                imgData.data[k+2] = col[2];
                imgData.data[k+3] = 255;
            
            }  
        }   
           
    }
    ctx.putImageData(imgData,10,10);


}
 

function sequenceLengthIter(z,c,iteration){
    while(z.magnitude() < 2 && iteration < MaxSeqLength){
        z.square()
        let next = z;
        next.plus(c);
        iteration++;
    }
    
    if(iteration>= MaxSeqLength || iteration <3){
        return MaxSeqLength;
    }

    return iteration;

}
function sequenceLength(z,c,iteration){

    if(z.magnitude() > 2){
        if(iteration < 6){
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


function linearIndex(x,y){
    let rowIdx = (y*CANVAS.width*4)
    let colIdx = 4*x
    return rowIdx+colIdx;
}


function colour(n){
    
    let a = n*30;
    let b = 0;
    let c = 0;
    if(a > 510){
        c = a - 510;
        b = a - 255;
        return [a,b,c];

    }else if(a > 255){
        b = a-255;
        return [a,b,0]
    }
    return [a,0,0];
}



console.log(sequenceLengthIter(new Complex(0,0), new Complex(0.3,0.3),0 ))
console.log(sequenceLength(new Complex(0,0), new Complex(0.3,0.3),0 ))
