
export default class Complex {
    
    constructor(real,img) {  // Constructor
      this.real = real;
      this.img = img;

      

    }

    square(){
        let real = this.real;

        //this.real = Math.sin(real**2 * real**5) % 23;// modular form
        //this.real = Math.E**(Math.tan(this.real)) - Math.E**(Math.tan(this.img));
        this.real = (Math.cos(this.real**2) - Math.sin(this.img**2)) % 3;
        //this.real = Math.sqrt((this.real**2)) - Math.sqrt((this.img**2)) % 11;
        //this.real = Math.E**(Math.sqrt((this.real**2))) - Math.E**(Math.sqrt((this.img**2)));
        //this.real = Math.tanh(Math.sqrt(this.real**2)) %3 - (Math.sin(Math.sqrt(this.img**2)) %7
        //
        //this.real = this.img *(this.img*this.real % 7 + this.real*this.img %11) % 3
        

        this.img = 2*(real*this.img)

    }

    pow2(){
        this.real = (this.real**2) - (this.img**2);
        this.img = 2*this.real*this.img;
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


