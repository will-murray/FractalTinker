let fSet = {
    0 : function mandlebrot(z){
        let real = z.real
        z.real = real**2 - z.img**2
        z.img = 2*real*z.img
        

    },
    1 : function modular(z){
        let real = z.real
        z.real = Math.sin(real**2 * real**5) % 23
        z.img = 2*(real*z.img)

    },

    2: function shart(z){
        let real = z.real
        z.real = Math.cos(z.real*6)
        z.img = Math.sin(z.img*6)
    }
}

export default function selectFunction(idx){
    return fSet[idx];
}




