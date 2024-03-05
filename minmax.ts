import { Move } from './move'
import { Board } from './board'
import { Tupel } from './tupel'

let depth_limit = 4;
export function minmax_search(algorithm, limit : number) {
    depth_limit = limit;
    //algorithm(board, 0);
    return algorithm();
}
function identation(msg, depth) {
    let str = ""
    for(let d = 0; d < depth; d++) { str += " " }
    console.log(str + msg)
}
export function minmax(board : Board, depth: number) {
    depth++;
    //console.log(`board.isRunning() ${board.isRunning()} depth ${depth} depth_limit ${depth_limit}`);
    if(!board.isRunning() || depth == depth_limit) { // game ended or we have reached depth limit
        //console.log(`leaf node score: ${board.getMove().x}/${board.getMove().y} ${board.getScore()}`)
        return new Tupel(board.getMove(),board.getScore());
    } // --> score
    else { 
        let bestMove : Move = new Move(0,0);
        let max_score = -1000000; //NegativInfinitiy;
        for(let m of board.getPossibleMoves()) { // explore child nodes
            let copy = board.copy();
            copy.makeMove(m); // child
            let movescore = minmax(copy, depth); // run minmax on child nodes
            //console.log(`child node: ${movescore.move.x}/${movescore.move.y} depth ${depth} score: ${movescore.score}`);
            if(copy.getScore() > max_score) { 
                max_score = copy.getScore(); bestMove = m;// get best scored child node
            }
        } // for
        return new Tupel(bestMove,max_score); // we ran minmax on all child nodes and return the best scored
    } // if / else

}



/*function lambda(value, func) {
    let value1 = 1;
    let a = value1 + 2;
    let b = 3;
    return func(a,b);
}

//let a = 2;
//let b = 3;

let result = lambda(1, (a,b) => { let sum = a + b; console.log(sum); return sum; })
console.log(result)
*/
/*export function search(algorithm, limit : number) {
    depth_limit = limit;
    return algorithm();
}*/

//search(() => {minmax(new Board(), 0)}, 4);
