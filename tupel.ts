import { Move } from './move'

export class Tupel {
    move : Move;
    score : number;
    constructor(m,s) {
        this.move = m;
        this.score = s;
    }
}