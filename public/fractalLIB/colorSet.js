let cSet = {
    0 : function Watermelon(t){
        return [    
            parseInt(t*6),
            parseInt(100*Math.abs(Math.cos((6*t)))),
            parseInt((t*6))
        ]
        

    },

    1 : function shart(t){
        return [
            parseInt(Math.abs(100*Math.sin(50*t))),
            parseInt(Math.abs(100*Math.cos(10*t))),
            parseInt(Math.abs(50*Math.sin(10*t)))


        ]
    }
}

export default function selectColor(idx){
    return cSet[idx];
}
