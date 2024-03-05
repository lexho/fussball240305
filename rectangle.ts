import { Position } from './position'
/*
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
x                            x
x                            x
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

*/
export class Rectangle {
    length: number
    height : number
    constructor(length, height) {
        this.length = length;
        this.height = height;
    }

    ausserhalb(pos) {
        let value = false;
        if(pos.x > this.length) value = true;
        if(pos.y > this.height) value = true;
        if(pos.x < 0) value = true;
        if(pos.y < 0) value = true;
        let str = ""
        if(!value) str = "nicht"
        console.log(`${pos.x}/${pos.y} ${str} außerhalb von ${this.length}/${this.height}`);
        return value;
        /*if(pos.x > this.length) return true;
        if(pos.y > this.height) return true;
        if(pos.x < 0) return true;
        if(pos.y < 0) return true;*/
        return false;
    }

    innerhalb(pos) {
        if(pos.x < this.length) return true;
        if(pos.y < this.height) return true;
        if(pos.x > 0) return true;
        if(pos.y > 0) return true;
        return false;
    }
}