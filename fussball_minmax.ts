import { Board } from './board';
import { Move } from './move';
import { pseudoRandom } from './utils';
import { Ball } from './ball';
import { MinMaxSearch } from './search/minmax';
//import { search } from './search';

let board : Board;
let minmaxsearch : MinMaxSearch;

let count = 0;
function nextTick() {
    const start = Date.now();
    //if(count == 100) return;
    count++;
    //let movescore = minmax(board.copy(), 0);
    //let movescore = minmax_search(new Board(), 2);
    //let movescore = minmax_search(() => { return minmax(board, 0)}, 4);
    let movescore = minmaxsearch.search(board, 4);
    let bmove = movescore.move
    //console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);

    board.makeMove(bmove);
    board.print();
    if(board.tor) return;
    if(board.tick == 100) return;
    
    const end = Date.now();
    let dur = end - start;
    if(dur > 100) dur = 100;
    //console.log(dur);

    setTimeout(() => {
        nextTick();
    }, 100-dur);
    //for(let i = 0; i < 1000; i++) {} // sleep
}


board = new Board();
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