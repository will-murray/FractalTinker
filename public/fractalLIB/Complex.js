
export default class Complex {
    
    constructor(real,img) {  // Constructor
      this.real = real;
      this.img = img;

      

    }

    square(){
        let real = this.real;
        
        //this.real = Math.E**(Math.tan(this.real)) - Math.E**(Math.tan(this.img));
        this.real = (this.real**2) - (this.img**2);
        //this.real = Math.sqrt((this.real**2)) - Math.sqrt((this.img**2));
        //this.real = Math.E**(Math.sqrt((this.real**2))) - Math.E**(Math.sqrt((this.img**2)));
        //this.real = Math.tanh(Math.sqrt(this.real**2)) - Math.sin(Math.sqrt(this.img**2))
        //this.real = Math.asinh(this.real) - Math.asinh(this.img);
        //this.real = (this.real/this.img) - (this.img/this.real);
        
        
        //this.img = 2*real*this.img;
        //this.img = Math.tanh(2*real*this.img);
        this.img = Math.sin(real)**2 *Math.sin(this.img)**2;
    }

    plus(other){
        this.real += other.real;
        this.img +=  other.img;

    }

    magnitude(){
        return Math.sqrt( this.real**2 + this.img**2 )
    }

    toString(){
        return this.real+ ", " +this.img+"i";
    }
}


