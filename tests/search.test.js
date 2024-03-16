import {describe, expect, test} from '@jest/globals';
import { Board } from '../dist/board.js';
import { MinMaxSearch } from '../dist/search/minmax.js';
import { RandomSearch } from '../dist/search/randomSearch.js';

describe('Search', () => {
    let board = new Board();
    let randomSearch;
    beforeEach(()=>{
        board = new Board(3);
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
        /*it('should be random 100000', () => {
            let stdabw = getStdabw(new Board(), 100000);
            console.log(`iterations: ${100000} stdabw: ${stdabw} erwartet: <${0.025}`);
            expect(stdabw < 0.025).toBeTruthy();
        })*/
    });

    describe('search minmax', () => {
        let minmax = new MinMaxSearch(4);
        it('should be Tor!!!', () => {
            let count = 0;
            while(!board.tor && count < 200*board.players.players.length) {
                count++;
                //let movescore = minmax(board.copy(), 0);
                let movescore = minmax.search(board.copy(), 4);
                //randomSearch.search(board.copy(), 0);

                let bmove = movescore[0]
                //console.log(`minmax bestmove: ${bmove.x}/${bmove.y} score: ${movescore.score}`);
            
                board.makeMove(bmove);
                //board.print();
            }
            //if(board.tor) return;
            board.print();
            if(count == 200*board.players.players.length) console.log("limit reached!")
            expect(count < 200*board.players.players.length).toBeTruthy();
            expect(board.spielstand).toBe(1);
            expect(board.spielstandGegner).toBe(0);
        })
    });

    function getStdabw(board, iterations) {
        let moves = [];
        //const iterations = 10000
        for(let i = 0; i < iterations; i++) {
            let move = randomSearch.search(board.copy())[0];
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
        //console.log(`iterations: ${iterations}`);
        return stdabw;
    }
    
    describe('minmax: unabhängigkeit von anzahl der spieler und suchtiefe', () => {
        /*it('should anzahl spieler: 2, suchtiefe: 3', () => {
            let board = new Board(2);
            let minmax = new MinMaxSearch(3);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < 150; i++) { // sollte ins Tor finden
                let move = minmax.search(board, 3);
                //bestmovescore: [Move, number]
                board.makeMove(move[0]);
                board.print();
                console.log(`${board.getScore()} ${prevScore}`)
                expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore()
                if(!board.isRunning) break;
            }
        })
        it('should anzahl spieler: 3, suchtiefe: 2', () => {
            let board = new Board(3);
            let minmax = new MinMaxSearch(2);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < 150; i++) { // sollte ins Tor finden
                let move = minmax.search(board, 2);
                //bestmovescore: [Move, number]
                board.makeMove(move[0]);
                board.print();
                console.log(`${board.getScore()} ${prevScore}`)
                expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore()
                if(!board.isRunning) break;
            }
        })
        it('should anzahl spieler: 3, suchtiefe: 3', () => {
            let board = new Board(3);
            const suchtiefe = 3;
            let minmax = new MinMaxSearch(suchtiefe);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < 150; i++) { // sollte ins Tor finden
                let move = minmax.search(board, suchtiefe);
                //bestmovescore: [Move, number]
                board.makeMove(move[0]);
                board.print();
                console.log(`${board.getScore()} ${prevScore}`)
                expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore()
                if(!board.isRunning) break;
            }
        })*/
        it('should anzahl spieler: 3, suchtiefe: 4', () => {
            let board = new Board(3);
            const suchtiefe = 4;
            let minmax = new MinMaxSearch(suchtiefe);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < 250; i++) { // sollte ins Tor finden
                let move = minmax.search(board, suchtiefe);
                //bestmovescore: [Move, number]
                board.makeMove(move[0]);
                board.print();
                console.log(`${board.getScore()} ${prevScore}`)
                //expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore()
                if(!board.isRunning) break;
            }
            //expect(!board.isRunning).toBeTruthy()
            expect(board.tor_rechts.contains(board.feld, board.ball)).toBeTruthy()
            expect(board.getScore() > 1000).toBeTruthy();
        })
        it('should anzahl spieler: 3, suchtiefe: 3', () => {
            let board = new Board(3);
            const suchtiefe = 3;
            let minmax = new MinMaxSearch(suchtiefe);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < 250; i++) { // sollte ins Tor finden
                let move = minmax.search(board);
                //bestmovescore: [Move, number]
                board.makeMove(move[0]);
                board.print();
                console.log(`${board.getScore()} ${prevScore}`)
                //expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore()
                if(!board.isRunning) break;
            }
            //expect(!board.isRunning).toBeTruthy()
            expect(board.tor_rechts.contains(board.feld, board.ball)).toBeTruthy()
            expect(board.getScore() > 1000).toBeTruthy();
        })
        it('should anzahl spieler: 2, suchtiefe: 3', () => {
            let board = new Board(2);
            const suchtiefe = 3;
            let minmax = new MinMaxSearch(suchtiefe);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < 250; i++) { // sollte ins Tor finden
                let move = minmax.search(board);
                //bestmovescore: [Move, number]
                board.makeMove(move[0]);
                board.print();
                console.log(`${board.getScore()} ${prevScore}`)
                //expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore()
                if(!board.isRunning) break;
            }
            //expect(!board.isRunning).toBeTruthy()
            expect(board.tor_rechts.contains(board.feld, board.ball)).toBeTruthy()
            expect(board.getScore() > 1000).toBeTruthy();
        })
    })
});