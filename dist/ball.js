import { Move } from './move.js';
import { Position } from './position.js';
export class Ball {
    constructor(feld, x, y) {
        this.momentum_x = 0;
        this.momentum_y = 0;
        this.feld = feld;
        //this.pos = new Position(x,y);
        this.x = x;
        this.y = y;
        //this.setPosition(x,y)
    }
    //position x/y
    /*getPosition() {
        return this.pos;
    }*/
    get x() {
        return this.x1;
    }
    get y() {
        return this.y1;
    }
    set x(x) {
        this.x1 = x;
    }
    set y(y) {
        this.y1 = y;
    }
    setPosition(x, y) {
        //this.pos = new Position(x,y);
        // validate
        //if(this.pos.x == this.feld.feld_length - 4 && this.pos.y >= 8 && this.pos.y <= 12) return; // im tor
        //if(this.pos.x > 84 && this.pos.y > 7 && this.pos.y < 13) return; // im tor
        if (this.x > 84 && this.y > 7 && this.y < 13)
            return;
        this.x = x;
        this.y = y;
    }
    removePosition() {
        let p = this.y * this.feld.feld_length + this.x;
        this.feld.setPositionOnBoard(this.feld.getInitial(p), this.x, this.y);
    }
    kick(x, y) {
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
        if (this.momentum_x > 0) {
            this.removePosition();
            this.setPosition(this.x + 2, this.y + 0);
            this.momentum_x--;
        }
        if (this.momentum_x < 0) {
            this.removePosition();
            this.setPosition(this.x - 2, this.y + 0);
            this.momentum_x--;
        }
        if (this.momentum_y > 0) {
            this.removePosition();
            this.setPosition(this.x, this.y + 2);
            this.momentum_y--;
        }
        if (this.momentum_y < 0) {
            this.removePosition();
            this.setPosition(this.x, this.y - 2);
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
        return { "name": "ball", "x": this.x, "y": this.y };
    }
    getPossibleMoves() {
        let coord = [new Move(-1, -1), new Move(0, -1), new Move(1, -1), new Move(-1, 0), new Move(0, 0), new Move(1, 0), new Move(-1, 1), new Move(0, 1), new Move(1, 1)];
        // valid moves
        let movesValid = [];
        for (let m of coord) {
            //let p = this.pos.plus(m);
            let p = new Position(this.x + m.x, this.y + m.y);
            if (this.feld.isOnBoard(p) && this.feld.isFree(p)) {
                movesValid.push(m);
            }
        }
        movesValid.push(new Move(0, 0)); // stay
        return movesValid;
    }
}
