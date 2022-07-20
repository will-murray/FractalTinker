import Complex from "./Complex.js";
import * as Conversion from "./Conversion.js"
import * as GUI from "./ElementsUtil.js"


let MaxSeqLength = 50;
let span = 3;
origin = [0.3,0];
let inc = span/400;
let state = 0;

let CANVAS = document.getElementById("display");
let ctx = CANVAS.getContext('2d');

let chain = [];
let chainBuffer = [];



document.body.onload = function load(){
    

    document.getElementById("innerGrid").appendChild(GUI.getJuliaSetStatistics());
}
document.getElementById("zoomIN").onclick = function zoomIN(){
    span -=0.2;
    inc = span/400;
    if(state==0){juliaPixelPlot(CANVAS.width/2,CANVAS.width/2);}
    else{pixelPlot()}
}
document.getElementById("zoomOUT").onclick = function zoomOUT(){
    span +=0.2;
    inc = span/400;
    if(state==0){juliaPixelPlot(CANVAS.width/2,CANVAS.width/2);}
    else{pixelPlot()}
}

document.getElementById("toggle").onclick = function toggleFunctionality(){
    let modeLabel = document.getElementById("modeLabel")
    if(state == 1){
        state = 0;
        modeLabel.innerHTML = "Julia Mode";
        document.getElementById("innerGrid").appendChild(GUI.getJuliaSetStatistics());
        juliaPixelPlot(CANVAS.width/2,CANVAS.width/2);
        
    }else{
        state = 1;
        modeLabel.innerHTML = "Mandlebrot Mode";
        document.getElementById("innerGrid").removeChild(document.getElementById("stats"));
        pixelPlot();

    }
};
document.getElementById("display").onmousemove = function executeFunctionality(event){
    if(state == 0){
        let t1 = new Date().getTime();
        let hit = juliaPixelPlot(event.x,event.y);
        let t2 = new Date().getTime();
        t2-=t1;
        document.getElementById("pixelsChecked").innerHTML = "Pixels Checked: "+160000;
        document.getElementById("pixelsHit").innerHTML = "Pixels Hit: "+hit[0];
        document.getElementById("hitRatio").innerHTML = "Hit Ratio: "+(hit[0]/ 160000).toFixed(3);
        document.getElementById("exTime").innerHTML = "RenderTime (ms): "+t2;
        document.getElementById("span").innerHTML = "Span: " +span.toFixed(2);
        document.getElementById("frameRate").innerHTML = "frameRate (fps): " +(1000/t2).toFixed(1);
        document.getElementById("pixelDepth").innerHTML = "Max Depth: "+MaxSeqLength;

    }
    // else{
    //     let click = Conversion.pixelsToComplex(event.x,event.y,span,CANVAS.width);
    //     let clickX = parseFloat(click[0]);
    //     let clickY = parseFloat(click[1]);
    //     let c = new Complex(clickX,clickY);
    //     let imgData = ctx.getImageData(0,0,CANVAS.width,CANVAS.width);

    //     while(chainBuffer.length > 0){
    //         let cur = chainBuffer.pop();
    //         imgData.data[cur[0]] = cur[1];
    //         imgData.data[cur[0] + 1] = cur[2];
    //         imgData.data[cur[0] + 2] = cur[3];
    //         imgData.data[cur[0] + 3] = cur[4];


    //     }

        
    //     getSequence(new Complex(0,0), c ,0);
    //     for(let i=0;i<chain.length;i++){
    //         let px = Conversion.complexToPixels(chain[i].real,chain[i].img,span,CANVAS.width);
    //         let idx = linearIndex(px[0],px[1]);
    //         chainBuffer.push( [ idx, imgData.data[idx], imgData.data[idx+1], imgData.data[idx+2] ,imgData.data[idx+3] ] )
    //     }
    //     //chainBuffer is a list of lists where each inner list is as follows:
    //         // [linearIDX, red, green, blue, alpha]


    //     chain = [];
        
    // }
};




function juliaPixelPlot(x,y){
    ctx.clearRect(0,0 ,CANVAS.width, CANVAS.width);
    let imgData = ctx.getImageData(0,0,CANVAS.width,CANVAS.width);


    let click = Conversion.pixelsToComplex(x,y,span,CANVAS.width);
    let clickX = parseFloat(click[0]);
    let clickY = parseFloat(click[1]);
    let c = new Complex(clickX,clickY);

    let iBound = span + Math.abs(origin[0]);
    let jBound = span + Math.abs(origin[1]);

    let avgMagnitude = 0;
    let pixelsHit = 0;
    for(let i =-1*(span + Math.abs(origin[0]));i<iBound;i+=inc + inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<jBound;j+= inc+inc){
        
            let z = new Complex(i,j);
            let result = sequenceLengthIter(z, c, 0);
            avgMagnitude+=result;
            if(result != MaxSeqLength){
                pixelsHit++;
                

                let px = Conversion.complexToPixels(i,j,span,CANVAS.width);
                let l1 = linearIndex(px[0],px[1]);      //upper left
                let l2 = linearIndex(px[0] + 1, px[1])  //upper right
                let l3 = linearIndex(px[0], px[1]+1)    //lower left
                let l4 = linearIndex(px[0] + 1, px[1]+1)  //lower right

                let col = result*8;
                let a = 255;
                if(col > 255){
                    a=0;
                }
                

                imgData.data[l1] = col;
                imgData.data[l1+1] = col;
                imgData.data[l1+2] = 0;
                imgData.data[l1+3] = a;

                imgData.data[l2] = col;
                imgData.data[l2+1] = col;
                imgData.data[l2+2] = 0;
                imgData.data[l2+3] = a;

                imgData.data[l3] = col;
                imgData.data[l3+1] = col;
                imgData.data[l3+2] = 0;
                imgData.data[l3+3] = a;

                imgData.data[l4] = col;
                imgData.data[l4+1] = col;
                imgData.data[l4+2] = 0;
                imgData.data[l4+3] = a;
            
            }  
        }   
           
    }
    ctx.putImageData(imgData,1,1);

    return [pixelsHit,avgMagnitude/160000];
    
}


function pixelPlot(){
    ctx.clearRect(0,0 ,CANVAS.width, CANVAS.width);
    let imgData = ctx.getImageData(0,0,CANVAS.width,CANVAS.width);

    let iBound = span + Math.abs(origin[0]);
    let jBound = span + Math.abs(origin[1]);
    for(let i =-1*(span + Math.abs(origin[0]));i<iBound;i+=inc){
        for(let j =-1*(span + Math.abs(origin[1]));j<jBound;j+=inc){
        
            let c = new Complex(i,j);
            let result = sequenceLengthIter(new Complex(0,0), c, 0);

            
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
function getSequence(z,c,iteration){
    
    if(z.magnitude() > 2){
        return;
    }
    if(iteration > MaxSeqLength){
        return;
    }

    chain.push(new Complex(z.real,z.img));
    z.square()
    let next = z;
    next.plus(c);
    getSequence(next,c,iteration+1)

    
}



function linearIndex(x,y){
    let rowIdx = (y*CANVAS.width*4)
    let colIdx = 4*x
    return rowIdx+colIdx;
}


function colour(n){
    if(n*15 > 255){
        return [255,n*9,n*2];
    }else if(n*9 > 255){
        return [255,255,n*2];
    }
    return [n*15, n*9, n*2];
}

