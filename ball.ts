import { Feld } from './feld.js'
import { Position } from './position.js';

export class Ball {
    //pos : Position;
    x1 : number;
    y1 : number;
    momentum_x : number = 0;
    momentum_y : number = 0;
    feld : Feld;
    constructor(feld : Feld, x: number,y: number) { 
        this.feld = feld;
        //this.pos = new Position(x,y);
        this.x = x; this.y = y;
        //this.setPosition(x,y)
    }

    //position x/y
    /*getPosition() {
        return this.pos;
    }*/
    get x(): number {
        return this.x1;
    }
    get y(): number {
        return this.y1;
    }

    set x(x: number) {
        this.x1 = x;
    }
    set y(y: number) {
        this.y1 = y;
    }
    setPosition(x: number,y: number) {
        //this.pos = new Position(x,y);
        // validate

        //if(this.pos.x == this.feld.feld_length - 4 && this.pos.y >= 8 && this.pos.y <= 12) return; // im tor
        //if(this.pos.x > 84 && this.pos.y > 7 && this.pos.y < 13) return; // im tor
        if(this.x > 84 && this.y > 7 && this.y < 13) return;

        this.x = x; this.y = y;
    }
    removePosition() {
        let p = this.y * this.feld.feld_length + this.x;
        this.feld.setPositionOnBoard(this.feld.getInitial(p), this.x, this.y);
    }

    kick(x: number,y: number) {
        //console.log("ball moves!")
        this.momentum_x += x;
        this.momentum_y += y;
        // validation
        /*console.log("x: " + x);
        console.log("y: " + y);*/
        //if(this.pos.x + x < 0 || this.pos.x + x > this.feld.feld_length) return;
        //if(this.pos.y + y < 0 || this.pos.y + y > this.feld.feld_height) return;
        //this.removePosition();
        //this.setPosition(this.pos.x + 1,this.pos.y + y);
        //this.move2();
    }

    move() {
        if(this.momentum_x > 0) {
            this.removePosition();
            this.setPosition(this.x + 2,this.y + 0);
            this.momentum_x--;
        }
        if(this.momentum_x < 0) {
            this.removePosition();
            this.setPosition(this.x - 2,this.y + 0);
            this.momentum_x--;
        }
        if(this.momentum_y > 0) {
            this.removePosition();
            this.setPosition(this.x,this.y + 2);
            this.momentum_y--;
        }
        if(this.momentum_y < 0) {
            this.removePosition();
            this.setPosition(this.x,this.y - 2);
            this.momentum_y--;
        }
    }

    draw() {
        this.feld.setPositionOnBoard('o', this.x, this.y);
    }

    
    toString() {
        return `{"name": "ball", "x" : ${this.x}, "y": ${this.y}"}`;
    }
    valueOf() {
        return `{"name": "ball", "x" : ${this.x}, "y": ${this.y}"}`;
    }
    getObject() {
        return {"name": "ball", "x" : this.x, "y": this.y};
    }
}