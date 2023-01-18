
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
    },

    2: function foo(t){
        return [
            10*parseInt(t*Math.abs(Math.sin(3*t) + Math.cos(4*t))) + 20,
            10*parseInt(t*Math.abs(Math.sin(3*t) + Math.cos(4*t)))+ 100,
            parseInt(6*t) + 100
        ]
    }
}

export default function selectColor(idx){
    return cSet[idx];
}
