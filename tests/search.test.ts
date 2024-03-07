import {describe, expect, test} from '@jest/globals';
import { Board } from '../board';
import { MinMaxSearch } from '../search/minmax';
import { RandomSearch } from '../search/randomSearch';

describe('Search', () => {
    let board = new Board();
    let randomSearch;
    beforeEach(()=>{
        board = new Board();
        randomSearch = new RandomSearch(Date.now());
    });

    describe('random search', () => {
        it('should be random 1000', () => {
            let stdabw = getStdabw(new Board(), 1000);
            console.log(`iterations: ${1000} stdabw: ${stdabw} erwartet: <${0.30}`);
            expect(stdabw < 0.30).toBeTruthy();
        })
        it('should be random 10000', () => {
            let stdabw = getStdabw(new Board(), 10000);
            console.log(`iterations: ${10000} stdabw: ${stdabw} erwartet: <${0.07}`);
            expect(stdabw < 0.07).toBeTruthy();
        })
        it('should be random 100000', () => {
            let stdabw = getStdabw(new Board(), 100000);
            console.log(`iterations: ${100000} stdabw: ${stdabw} erwartet: <${0.025}`);
            expect(stdabw < 0.025).toBeTruthy();
        })
    });

    describe('search minmax', () => {
        let minmax = new MinMaxSearch(4);
        it('should be Tor!!!', () => {
            let count = 0;
            while(!board.tor && count < 200) {
                count++;
                //let movescore = minmax(board.copy(), 0);
                let movescore = minmax.search(board.copy(), 4);
                //randomSearch.search(board.copy(), 0);

                let bmove = movescore.move
                //console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);
            
                board.makeMove(bmove);
                //board.print();
            }
            //if(board.tor) return;
            board.print();
            if(count == 200) console.log("limit reached!")
            expect(count < 200).toBeTruthy();
            expect(board.spielstand).toBe(1);
            expect(board.spielstandGegner).toBe(0);
        })
    });

    function getStdabw(board, iterations) {
        let moves = [];
        //const iterations = 10000
        for(let i = 0; i < iterations; i++) {
            let move = randomSearch.search(board.copy());
            moves.push(move);
        }
        //console.log(moves);
    
        let count = [board.getPossibleMoves().length];
        for(let i = 0; i < board.getPossibleMoves().length; i++) {
            count[i] = 0;
        }
        for(let m = 0; m < moves.length; m++) {
            for(let m1 = 0; m1 < board.getPossibleMoves().length; m1++) {
                if(moves[m].x == board.getPossibleMoves()[m1].x &&
                moves[m].y == board.getPossibleMoves()[m1].y
                ) {
                    count[m1]++;
                }
                
            }
        }
        //console.log("count: ");
        let gesamtzahl = 0;
        for(let i = 0; i < count.length; i++) { gesamtzahl += count[i]; }
        for(let i = 0; i < count.length; i++) {
            //console.log(`${board.getPossibleMoves()[i]}: ${count[i]} ${count[i]/gesamtzahl}`);
        }
        let freq_average = 0;
        for(let m1 = 0; m1 < board.getPossibleMoves().length; m1++) {
            freq_average+=count[m1];
        }
        freq_average/=count.length;
        let stdabw = 0;
        for(let m1 = 0; m1 < board.getPossibleMoves().length; m1++) {
            let diff = Math.abs(freq_average - count[m1]);
            if(diff > stdabw) stdabw = diff;
            //console.log(`${m1}: ${count[m1]}`);
        }
        stdabw = stdabw/freq_average
        const faktor = 100;
        let grenzw = board.getPossibleMoves().length/iterations*faktor;
        //console.log(`iterations: ${iterations}`);
        return stdabw;
    }
});