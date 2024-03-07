import { pseudoRandom } from '../utils.js';
import { Board } from '../board.js';
import { Search } from './search.js'
import { Move } from '../move.js'

export class RandomSearch extends Search {
    generator;

    constructor(seed : number) {
        super(0);
        this.generator = pseudoRandom(seed);
    }
    
    search(board : Board) {
        let moves = board.getPossibleMoves();
        let move = moves[this.generator(moves.length)];
        let result: [Move, number] = [move, 0]
        return result;
    }
}