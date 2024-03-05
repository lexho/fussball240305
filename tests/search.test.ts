import {describe, expect, test} from '@jest/globals';
import { Board } from '../board';
import { Move } from '../move';
import { pseudoRandom } from '../utils';
import { minmax } from '../minmax';

describe('Search', () => {
    let board = new Board();
    let generator;
    beforeEach(()=>{
        board = new Board();
        generator = pseudoRandom(Date.now());
    });

    /*describe('random search', () => {
        it('should be random', () => {
            for(let i = 0; i < 100; i++) {
                let move = new Move(0, 0); // nullmove
                
                let moves = board.getPossibleMoves();
                move = getRandomMove(moves);
                //board.makeMove(moves.at(0));
                board.makeMove(move);
                //board.makeMove(moves[generator(moves.length)]);
                board.print();
                //expect(board.tick).toBe(0);
            }
        })
        /*it('should be 1', () => {
            let board = new Board();
            board.nextTick();
            expect(board.tick).toBe(1);
        })*/
    /*});*/
    function getRandomMove(moves) {
        let move = new Move(0,0);
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

    let count = 0;
function nextTick() {
    //if(count == 50) return;
    if(!board.isRunning()) return;
    count++;
    let moves = board.getPossibleMoves();
    //console.log(moves);

    // search for bestmove
    let max_score = -100000;
    let bestMove = new Move(0,0);
    for(let i = 0; i < moves.length; i++) {
        let m = moves[i];
        let copy = board.copy();
        copy.makeMove(m);
        //if(!copy.isRunning()) return; //TODO should be on main board
        let score = copy.getScore();

        //console.log(`score:${score}`)
        if(score > max_score) { max_score = score; bestMove = m; }      
    } // for

    //board.getScore();
    board.makeMove(bestMove);
    //if(!board.isRunning()) return;
    //console.log(bestMove)
    //board.print();
    nextTick();

}
    /*describe('search', () => {
        it('should be Tor!!!', () => {
            nextTick();
            board.print();
            expect(board.isRunning()).toBeFalsy();
            expect(board.spielstand).toBe(1);
            expect(board.spielstandGegner).toBe(0);
        })
    });*/

    describe('search minmax', () => {
        it('should be Tor!!!', () => {
            let count = 0;
            while(!board.tor && count < 200) {
                count++;
                let movescore = minmax(board.copy(), 0);
                let bmove = movescore.move
                //console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);
            
                board.makeMove(bmove);
                //board.print();
            }
            //if(board.tor) return;
            board.print();
            console.log("limit reached!")
            expect(count < 200).toBeTruthy();
            expect(board.spielstand).toBe(1);
            expect(board.spielstandGegner).toBe(0);
        })
    });
});

