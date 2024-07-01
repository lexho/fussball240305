import { Board } from './board.js';
import { MinMaxSearch } from './search/minmax.js';
//import { search } from './search';
let board;
let minmaxsearch;
let count = 0;
function nextTick() {
    const start = Date.now();
    //if(count == 100) return;
    count++;
    //let movescore = minmax(board.copy(), 0);
    //let movescore = minmax_search(new Board(), 2);
    //let movescore = minmax_search(() => { return minmax(board, 0)}, 4);
    let movescore = minmaxsearch.search(board.copy(), 12); // suchtiefe ist abhängig von der anzahl der spieler
    let bmove = movescore[0]; //.move
    console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore[1]}`);
    board.makeMove(bmove);
    board.print();
    if (board.tor)
        return;
    if (board.tick == 200)
        return;
    const end = Date.now();
    let dur = end - start;
    if (dur > 100)
        dur = 100;
    //console.log(dur);
    setTimeout(() => {
        nextTick();
    }, 100 - dur);
    //for(let i = 0; i < 1000; i++) {} // sleep
}
board = new Board(11);
/*board.makeMove(board.getPossibleMoves()[0]);
board.makeMove(board.getPossibleMoves()[0]); // player 3 scores
board.makeMove(board.getPossibleMoves()[0]); // player 3 scores
board.makeMove(board.getPossibleMoves()[0]);
board.makeMove(board.getPossibleMoves()[0]);*/
minmaxsearch = new MinMaxSearch(4);
nextTick();
/*
//board = new Board();
let movescore = minmax(board, 0);
let bmove = movescore.move
board = new Board();
board.print();
board.makeMove(bmove);
board.print();
console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);*/ 
