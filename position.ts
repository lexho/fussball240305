import { Move } from './move.js';

export class Position {
    x;
    y;
    constructor(x: number,y: number) { this.x = x; this.y = y;}

    plus(m : Move) {
        let x = this.x + m.x
        let y = this.y + m.y
        return new Position(x,y);
    }
}