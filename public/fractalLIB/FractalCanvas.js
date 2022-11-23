
import Complex from "./Complex.js";
import * as Conversion from "./Conversion.js"

export default class FractalCanvas{
    

    constructor(){
        
        this.MAXSEQLENGTH = 300;
        this.size = 700;
        this.span = 3;
        this.origon = [0,0]
        this.inc = this.span/366;
        this.state = 0;
        this.stateMap = {
            0 : "Julia",
            1 : "Mandlebrot",
            2 : "Depth"
        }
        this.borderData = []
        this.cidx = [0,1,2]
        this.cursX = 0;
        this.cursY = 0;

        this.canvas = document.getElementById("display");
        this.ctx = this.canvas.getContext('2d');


    }

    init(){
        this.canvas.height = this.size;
        this.canvas.width = this.size;
        let inverterBTN = document.createElement("button");
            inverterBTN.innerHTML = "Invert";
            inverterBTN.addEventListener("click", () =>{
                this.colorInvert();
            })
        document.getElementById("BtnBox").appendChild(inverterBTN);
        this.changeMode()
        
    }

    changeMode(){
        if(this.state == 2){
            this.disableDepthMode();
            this.state = 0;

        }else{
            this.state += 1;
        }
        document.getElementById("modeLabel").innerHTML = this.stateMap[this.state];
        if(this.state == 0){
             this.juliaSet(this.size/2,this.size/2);
        }
        else if(this.state == 1){
            this.mandlebrotSet()
            this.borderData = this.getRawGridData(4);
             
            let borderBTN = document.createElement("button");
            borderBTN.innerHTML = "Display Border (Not working)";
            borderBTN.addEventListener("click", () =>{
                this.getBorder();
            })

            
            document.getElementById("BtnBox").appendChild(borderBTN);
            
        }
        else{
            let btnbox = document.getElementById("BtnBox");
            btnbox.removeChild(btnbox.lastChild);

            this.enableDepthMode();
        }


    }


    enableDepthMode(){
        
        this.MAXSEQLENGTH = 10;
        this.mandlebrotSet()
        let zoomBTN = document.createElement("button");
        zoomBTN.innerHTML = "ZOOM";
        zoomBTN.id = "zoomBTN";

        let depthGage = document.createElement("h2");
        depthGage.id = "depthGage";
        depthGage.innerHTML = "Maximum Depth = " +this.MAXSEQLENGTH;
        

        document.getElementById("BtnBox").appendChild(zoomBTN);
        document.getElementById("BtnBox").appendChild(depthGage);

        zoomBTN.addEventListener("click", () =>{
            this.MAXSEQLENGTH+=10;
            this.mandlebrotSet();
            document.getElementById("depthGage").innerHTML = "Maximum Depth = " +this.MAXSEQLENGTH;
        });
    }

    


    disableDepthMode(){
        let BtnBox = document.getElementById("BtnBox");
        BtnBox.removeChild(BtnBox.lastChild);
        BtnBox.removeChild(BtnBox.lastChild);


        this.MAXSEQLENGTH = 150;
    }

    getBorder(){
        console.log("-------------------\nBORDER FNS\n-------------------");
        this.ctx.clearRect(0,0 ,this.size, this.size);
        let imgData = this.ctx.getImageData(0,0,this.size,this.size);

        for(let i =0;i<this.borderData.length;i++){
            for(let j =0;j<this.borderData.length;j++){
                if(this.borderData[i][j] == 0){
                    let index = this.linearIndex(i,j);
                    console.log();

                    imgData.data[index] = 100;
                    imgData.data[index+1] = 100;
                    imgData.data[index+2] = 100;
                    imgData.data[index+3] = 1;

                }
            }   
        }
        this.ctx.putImageData(imgData,1,1);

    }


    juliaSet(x,y){
        this.cursX = x
        this.cursY = y
        this.ctx.clearRect(0,0 ,this.size, this.size);
        let imgData = this.ctx.getImageData(0,0,this.size,this.size);


        let click = Conversion.pixelsToComplex(x,y,this.span,this.size,this.origon);
        let clickX = parseFloat(click[0]);
        let clickY = parseFloat(click[1]);
        let c = new Complex(clickX,clickY);

        let iBound = this.span + Math.abs(this.origon[0]);
        let jBound = this.span + Math.abs(this.origon[1]);
        

        for(let i =-1*iBound;i<iBound;i+= (this.inc + this.inc) ){
           

            for(let j =-1*jBound;j<jBound;j+= (this.inc+this.inc)){
                
                let z = new Complex(i,j);
                let result = this.sequenceLengthIter(z, c, 0);
                let px = Conversion.complexToPixels(i,j,this.span,this.size,this.origon);
                if(result < this.MAXSEQLENGTH){
                    

                    // let px = Conversion.complexToPixels(i,j,this.span,this.size,this.origon);
                    let l1 = this.linearIndex(px[0],px[1]);      //upper left
                    let l2 = this.linearIndex(px[0] + 1, px[1])  //upper right
                    let l3 = this.linearIndex(px[0], px[1]+1)    //lower left
                    let l4 = this.linearIndex(px[0] + 1, px[1]+1)  //lower right

                    let col = this.colour(result);
                    let a = 255;
                    
                    

                    imgData.data[l1] = col[this.cidx[0]];
                    imgData.data[l1+1] = col[this.cidx[1]];
                    imgData.data[l1+2] = col[this.cidx[2]];
                    imgData.data[l1+3] = a;

                    imgData.data[l2] = col[this.cidx[0]];
                    imgData.data[l2+1] = col[this.cidx[1]];
                    imgData.data[l2+2] = col[this.cidx[2]];
                    imgData.data[l2+3] = a;

                    imgData.data[l3] = col[this.cidx[0]];
                    imgData.data[l3+1] = col[this.cidx[1]];
                    imgData.data[l3+2] = col[this.cidx[2]];
                    imgData.data[l3+3] = a;

                    imgData.data[l4] = col[this.cidx[0]];
                    imgData.data[l4+1] = col[this.cidx[1]];
                    imgData.data[l4+2] = col[this.cidx[2]];
                    imgData.data[l4+3] = a;
                
                }  

            }   
            
        }
        this.ctx.putImageData(imgData,1,1);

        
        
    }

    

    getRawGridData(limit){
        let result = []
        let alpha = 1;

        let iBound = this.span + Math.abs(this.origon[0]);
        let jBound = this.span + Math.abs(this.origon[1]);
        for(let i =-1*iBound;i<iBound;i+=alpha*this.inc){
            let currentrow = []
            for(let j =-1*jBound;j<jBound;j+=alpha*this.inc){
            
                let c = new Complex(i,j);
                let result = this.DFSsequenceLength(new Complex(0,0), c, 0);

                
                if(result == limit){
                    
                    currentrow.push(1)

                }else{
                    currentrow.push(0)
                }
            }
            result.push(currentrow);   
            
        }
        return result;
    }

    mandlebrotSet(){

        this.ctx.clearRect(0,0 ,this.size, this.size);
        let imgData = this.ctx.getImageData(0,0,this.size,this.size);

        let iBound = this.span + Math.abs(this.origon[0]);
        let jBound = this.span + Math.abs(this.origon[1]);
        for(let i =-1*iBound;i<iBound;i+=this.inc){
            for(let j =-1*jBound;j<jBound;j+=this.inc){
            
                let c = new Complex(i,j);
                let result = this.sequenceLengthIter(new Complex(0,0), c, 0);

                
                if(result != this.MAXSEQLENGTH){
                    let px = Conversion.complexToPixels(i,j,this.span,this.size,this.origon);
                    let k = this.linearIndex(px[0],px[1]);
                    
                    let col = this.colour(result);
                    
                    imgData.data[k] = col[this.cidx[0]];
                    imgData.data[k+1] = col[this.cidx[1]];
                    imgData.data[k+2] = col[this.cidx[2]];
                    imgData.data[k+3] = 255;
                }
            }   
            
        }
        this.ctx.putImageData(imgData,10,10);



    }

    colorInvert(){
        let temp = this.cidx[0];
        this.cidx[0] = this.cidx[1];
        this.cidx[1] = this.cidx[2];
        this.cidx[2] = temp;

        if(this.state == 1){
            this.mandlebrotSet()

        }else{
            this.juliaSet(this.cursX,this.cursY)
        }


    }

   
    sequenceLengthIter(z,c,iteration){
        while(z.magnitude() < 2 && iteration < this.MAXSEQLENGTH){
            z.square()
            let next = z;
            next.plus(c);
            iteration++;
        }
        
        if(iteration > this.MAXSEQLENGTH || iteration <3){
            return this.MAXSEQLENGTH;
        }
    
        return iteration;
    
    }

    DFSsequenceLength(z,c,iteration){
        while(z.magnitude() < 2 && iteration < this.MAXSEQLENGTH){
            z.square()
            let next = z;
            next.plus(c);
            iteration++;
        }
        
        if(iteration > this.MAXSEQLENGTH){
            return this.MAXSEQLENGTH;
        }
    
        return iteration;
    
    }

    
    linearIndex(x,y){
        
        let rowIdx = (y*this.size*4)
        let colIdx = 4*x
        
        return rowIdx+colIdx;
    }



    swap(){
        this.juliaSet(0,0)
    }
    
    colour(t){
        return [    
                    12*parseInt(t)*Math.sin(11*t),
                    15*parseInt(4*t)*Math.cos(12*t),
                    8*parseInt(2*(t))

                ];
            }
    //     return [    
    //     (6*parseInt(t)),
    //     150*Math.abs(Math.cos((6*parseInt(t)))),
    //     150*Math.abs(Math.sin(((6*parseInt(t)))))
    // ];

    // return [    
    //         (6*parseInt(t)),
    //         150*Math.abs( Math.cos((6*parseInt(t))) **2 ),
    //         150*Math.abs( Math.sin((6*parseInt(t))) **2 )



    //     ];
    // }


};