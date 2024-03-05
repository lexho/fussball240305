import { Board } from './board';
import { Move } from './move';
import { pseudoRandom } from './utils';
import { Ball } from './ball';

//while(1) {
let board = new Board();
//board.nextTick();
/*board.nextTick();*/
//board.render();
// TODO tick für tick
//}

let generator = pseudoRandom(Date.now());

class Tupel {
    move : Move;
    score : number;
    constructor(m,s) {
        this.move = m;
        this.score = s;
    }
}

/*function nextTick() {
    //if(count == 100) return;
    count++;
    let move : Move = new Move(0, 0); // nullmove
    let moves = board.getPossibleMoves();

    //board.makeMove(moves.at(0));
    //move = getRandomMove(moves);
    //board.makeMove(move);
    //board.makeMove(moves[generator(moves.length)]);

    //console.log(moves);

    /*let max_score = -100000;
    let bestMove : Move = new Move(0,0);
    for(let i = 0; i < moves.length; i++) {
        //let index  = generator(moves.length);
        //console.log(index)
        let m = moves[i];
        let copy = board.copy();
        //copy.print();
        copy.makeMove(m);
        let score = copy.getScore();
        //copy.print();
        //console.log(`score:${score}`)
        if(score > max_score) { max_score = score; bestMove = m; }      
    } // for*/

    /*let movescore = minmax(board.copy(), 0);
    let bmove = movescore.move
    //let board = new Board();
    //executorBoard.print();
    //board.makeMove(bmove);
    //board.print();
    console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);

    //move = getBestMove(moves, 0);

    //board.getScore();
    //board.makeMove(bestMove);
    board.makeMove(bmove);
    //console.log(bestMove)
    //board.makeMove(moves[0]);
    board.print();
    if(board.tor) return;
    if(board.tick == 1) return;

    setTimeout(() => {
        nextTick();
    }, 100/7);
}*/

let count = 0;
function nextTick() {
    //if(count == 100) return;
    count++;
    let movescore = minmax(board.copy(), 0);
    let bmove = movescore.move
    console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);

    board.makeMove(bmove);
    board.print();
    if(board.tor) return;
    if(board.tick == 7) return;

    setTimeout(() => {
        nextTick();
    }, 100/7);
}

function getRandomMove(moves : Move[]) {
    let move : Move = new Move(0,0);
    let min_distancceToBall = 1000; // TODO Integer Max value
    let min_distanceToGoal = 1000;
    for(let i = 0; i < 3; i++) {
        //let index  = generator(moves.length);
        //console.log(index)
        let m = moves[generator(moves.length)];

        let distancceToBall = Math.abs((board.ball.getPosition().x)-(board.players.currentPlayer.pos.x+m.x)) + Math.abs((board.ball.getPosition().y)-(board.players.currentPlayer.pos.y+m.y));
        
        let distanceToGoal = -1;

        if(distancceToBall < min_distancceToBall /*&& distanceToGoal < min_distanceToGoal*/) { 
            min_distancceToBall = distancceToBall; 
            move = m;
        }
    } // for
    return move;
}

//let depth = 0;
let max_depth = 1;
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
}

board = new Board();
nextTick();

board = new Board();
let depth = 0;
function minmax(board : Board, depth: number) {
    //let moves = board.getPossibleMoves();
    let bestMove : Move = new Move(0,0);
    let max_score = -1000000; //NegativInfinitiy;
    depth++;
    console.log(`depth: ${depth}`);
    for(let m of board.getPossibleMoves()) { // child nodes
        //console.log(m.x + "/" + m.y)
        let copy = board.copy();
        copy.makeMove(m); // child
        if(depth < 2) {
            //console.log("depth < 6");
            let movescore = minmax(copy, depth);
            if(movescore.score > max_score) { 
                max_score = movescore.score; bestMove = m;// movescore.move; 
            }
            //console.log(movescore);
            /*if(movescore.score > max_score) { 
                //console.log("score > max_score")
                //console.log(movescore.score);
                max_score = movescore.score; bestMove = movescore.move; 
            }*/
        } else { // depth limit reached
            //console.log("leaf: ");
            //copy.print();
            //if(depth != 2) console.log("problem")
            console.log(`leaf: ${m.x}/${m.y} ${copy.getScore()} depth: ${depth}`);
            return new Tupel(m,copy.getScore());
            //let movescore = new Tupel(m,copy.getScore());
            //return new Tupel(m,copy.getScore());
        }
    } // for
    return new Tupel(bestMove,max_score);;
}

/*let movescore = minmax(board, 0);
let bmove = movescore.move
board = new Board();
board.print();
board.makeMove(bmove);
board.print();
console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);*/