export function pixelsToComplex(clientX,clientY,span,dim){
    


    let x = span*(2*clientX-dim)/dim;
    x += origin[0]
    let y = span*(dim-2*clientY)/dim;
    y+=origin[1]
    return [x.toFixed(3),y.toFixed(3)];
}

export function complexToPixels(x,y,span,dim){
    console.log("coversion!");
    x -=origin[0];
    y-=origin[1];
    
    let px = (dim/2)*(x/span + 1);
    let py = ((y-span)*dim)/(-2*span);
    return [parseInt(px),parseInt(py)];
}
export function NScomplexToPixels(x,y,span,dim){
    let px = (dim/2)*(x/span + 1);
    let py = ((y-span)*dim)/(-2*span);
    return [parseInt(px),parseInt(py)];
}