import { Position } from './position.js';
import { Feld } from './feld.js';
import { Ball } from './ball.js'

export class Tor {
    pos : Position;

    constructor(x: number,y: number) { 
        this.pos = new Position(x,y);
    }
    getPosition() {
        return this.pos;
    }

    contains(feld: Feld, ball: Ball) {
        /*feld.setPositionOnBoard("x", feld.feld_length - 4, 8);
        feld.setPositionOnBoard("x", feld.feld_length - 4, 9);
        feld.setPositionOnBoard("x", feld.feld_length - 4, 10);
        feld.setPositionOnBoard("x", feld.feld_length - 4, 11);
        feld.setPositionOnBoard("x", feld.feld_length - 4, 12);*/
        //if(pos.x == feld.feld_length - 4 && pos.y >= 8 && pos.y <= 12)
        if(ball.x > 84 && ball.y > 7 && ball.y < 13)
            return true;
        //if(pos.x == 83 && pos.y == 10)
        //  return true;
        /*if(pos.y > 6 && pos.y < 11 && pos.x >= feld.feld_length) {
            return true;
        }*/
        return false;
    }
}