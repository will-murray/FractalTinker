

class Serpinski3D{
    
    constructor(midpoint,span,height){
        this.subElements = 0;
    }

    
    next(newSubElements){
        
        if(this.subElements[0] instanceof Pyramid){
            for(let i =0;i<this.subElements.length;i++){
                this.subElements[i].subDivide(newSubElements);
                
            }
            return newSubElements;
        }else{
            for(let i =0;i<this.subElements.length;i++){
                this.subElements[i].next(newSubElements);
            }
        }
        
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
            meshStack.push(this.meshData[i]);
        }
    }

    subDivide(buffer){
        
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




let serp = new Serpinski3D([0,0,0],10,10);
let newSubElements = serp.next([]);
console.log(newSubElements);