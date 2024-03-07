import { Move } from '../move.js'
import { Board } from '../board.js'
import { Search } from '../search/search.js'

export class MinMaxSearch extends Search implements Search {
    
    constructor(limit : number) {
        super(limit);
        this.depth_limit = limit;
    }
    
    search(board : Board, depth_limit : number) {
        this.depth_limit = depth_limit;
        return this.search0(board, 0);
    }

    private search0(board : Board, depth: number) {
        depth++;
        //console.log(`board.isRunning() ${board.isRunning()} depth ${depth} depth_limit ${depth_limit}`);
        if(!board.isRunning() || depth == this.depth_limit) { // game ended or we have reached depth limit
            //console.log(`leaf node score: ${board.getMove().x}/${board.getMove().y} ${board.getScore()}`)
            let result: [Move, number] = [board.getMove(),board.getScore()]
            return result
        } // --> score
        else { 
            let bestMove : Move = new Move(0,0);
            let max_score = -1000000; //NegativInfinitiy;
            for(let m of board.getPossibleMoves()) { // explore child nodes
                let copy = board.copy();
                copy.makeMove(m); // child
                let movescore = this.search0(copy, depth); // run minmax on child nodes
                //console.log(`child node: ${movescore.move.x}/${movescore.move.y} depth ${depth} score: ${movescore.score}`);
                if(copy.getScore() > max_score) { 
                    max_score = copy.getScore(); bestMove = m;// get best scored child node
                }
            } // for
            let result: [Move, number] = [bestMove,max_score] // we ran minmax on all child nodes and return the best scored
            return result;
        } // if / else

    }

}

/*export function search(algorithm, limit : number) {
    depth_limit = limit;
    return algorithm();
}*/

//search(() => {minmax(new Board(), 0)}, 4);
