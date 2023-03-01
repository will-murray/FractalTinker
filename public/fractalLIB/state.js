export function dict(self,key){
    let fns= {
        0: function juliaState(){
            self.juliaSet(0,0)
        },
        1 : function mandlebrotState(){
            self.mandlebrotSet();
        },
        2: function depthState(){
            self.mandlebrotSet()
        }
    }
    return fns[key]


}