import { pseudoRandom } from '../utils.js';
import { Search } from './search.js';
export class RandomSearch extends Search {
    constructor(seed) {
        super(0);
        this.generator = pseudoRandom(seed);
    }
    search(board) {
        let moves = board.getPossibleMoves();
        let move = moves[this.generator(moves.length)];
        let result = [move, 0];
        return result;
    }
}
