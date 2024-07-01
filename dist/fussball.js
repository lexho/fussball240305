import { Board } from './board.js';
import { RandomSearch } from './search/randomSearch.js';
let board;
let randomSearch;
let count = 0;
function nextTick() {
    //if(count == 100) return;
    count++;
    let movescore = randomSearch.search(board.copy());
    let bmove = movescore[0];
    console.log(`randomsearch bestmove: ${bmove.x}/${bmove.y}`);
    board.makeMove(bmove);
    board.print();
    if (board.tor)
        return;
    if (board.tick == 7)
        return;
    setTimeout(() => {
        nextTick();
    }, 100);
}
//let depth = 0;
/*let max_depth = 1;
function getBestMove(moves : Move[], depth : number) {
    let currentDepth = depth++;
    let max_score = -100000;
    let bestMove : Move = new Move(0, 0); ;
    for(let i = 0; i < moves.length; i++) {
        //let index  = generator(moves.length);
        //console.log(index)
        let m = moves[i];
        let copy = board.copy();
        copy.makeMove(m);
        //board.makeMove(m);
        if(depth < max_depth) return getBestMove(copy.getPossibleMoves(), currentDepth);

        let score = copy.getScore();
        //console.log(`score:${score}`)
        if(score > max_score) { max_score = score; bestMove = m; }
    } // for
    return bestMove;
}*/
/*let movescore = minmax(board, 0);
let bmove = movescore.move
board = new Board();
board.print();
board.makeMove(bmove);
board.print();
console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);*/
board = new Board();
randomSearch = new RandomSearch(Date.now());
nextTick();
