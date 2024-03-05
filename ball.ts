import { Feld } from './feld';
import { Position } from './position';

export class Ball {
    pos : Position;
    momentum_x : number = 0;
    momentum_y : number = 0;
    feld : Feld;
    constructor(feld : Feld, x: number,y: number) { 
        this.feld = feld;
        this.pos = new Position(x,y);
        //this.setPosition(x,y)
    }

    //position x/y
    getPosition() {
        return this.pos;
    }
    setPosition(x: number,y: number) {
        //this.pos = new Position(x,y);
        // validate

        //if(this.pos.x == this.feld.feld_length - 4 && this.pos.y >= 8 && this.pos.y <= 12) return; // im tor
        if(this.pos.x > 84 && this.pos.y > 7 && this.pos.y < 13) return; // im tor

        this.pos.x = x; this.pos.y = y;
    }
    removePosition() {
        let p = this.pos.y * this.feld.feld_length + this.pos.x;
        this.feld.setPositionOnBoard(this.feld.getInitial(p), this.pos.x, this.pos.y);
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
            this.setPosition(this.pos.x + 2,this.pos.y + 0);
            this.momentum_x--;
        }
        if(this.momentum_x < 0) {
            this.removePosition();
            this.setPosition(this.pos.x - 2,this.pos.y + 0);
            this.momentum_x--;
        }
        if(this.momentum_y > 0) {
            this.removePosition();
            this.setPosition(this.pos.x,this.pos.y + 2);
            this.momentum_y--;
        }
        if(this.momentum_y < 0) {
            this.removePosition();
            this.setPosition(this.pos.x,this.pos.y - 2);
            this.momentum_y--;
        }
    }

    draw() {
        this.feld.setPositionOnBoard('o', this.pos.x, this.pos.y);
    }
}