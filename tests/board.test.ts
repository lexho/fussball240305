import {describe, expect, test} from '@jest/globals';
import { Board } from '../board';
import { Move } from '../move'
import { Player } from '../player'
import { Players } from '../players'

describe('Board', () => {
    beforeEach(()=>{
        // Fußballfeld erzeugen
    });

    /*describe('tick count', () => {
        it('should be 0', () => {
            let board = new Board();
            expect(board.tick).toBe(0);
        })
        it('should be 1', () => {
            let board = new Board();
            board.nextTick();
            expect(board.tick).toBe(1);
        })
    });*/

    /*describe('scoreboard', () => {
        // high score when ball in goal
        it('should have good score', () => {
            let board = new Board();
            board.ball.setPosition(board.feld, 84, 10);
            board.nextTick();
            board.print();
            expect(board.getScore() == 100).toBeTruthy();
        })
        it('should have bad score', () => {
            let board = new Board();
            board.print();
            expect(board.getScore() < 50).toBeTruthy();
        })
    })*/

    describe('score', () => {
        it('should be', () => {
            expect(false).toBeTruthy();
        });
    })

    describe('hashwert', () => {
        it('should be different hashes on different boards', () => {
            let board = new Board();
            console.log(board.hashwert());
            let board1 = new Board();
            board1.makeMove(new Move(1,1));
            console.log(board1.hashwert());
            expect(board.hashwert() != board1.hashwert()).toBeTruthy();
        });

        function buildBoard(x, y) {
        //init(feld: Feld, tor_links : Tor, tor_rechts : Tor, players : Players, ball : Ball) {
            let board = new Board();
            let players = [];
            //let x = 0; let y = 0;
            for(let i = 0; i < 11; i++) {
                let player = new Player(i, board.feld, x, y);
                players.push(player);
                y++;
            }
            let playersX = new Players(players);
            playersX.index = 0;
            playersX.setCurrentPlayer(playersX.players.at(0));
            //board.init(feld, playersX, );
            //board.players = playersX;
            return board;
        }

        it('should be different hashes on different boards 2', () => {
            let board1 = buildBoard(0,0);
            let board2 = buildBoard(1,1);
            let board3 = buildBoard(2,2);
            let board4 = buildBoard(3,3);
            board1.print();
            board2.print();
            board3.print();
            board4.print();
            console.log(board1.hashwert());
            console.log(board2.hashwert());
            console.log(board3.hashwert());
            console.log(board4.hashwert());
            expect(board1.hashwert() != board2.hashwert()).toBeTruthy();
            expect(board2.hashwert() != board3.hashwert()).toBeTruthy();
            expect(board3.hashwert() != board4.hashwert()).toBeTruthy();
            expect(board1.hashwert() != board4.hashwert()).toBeTruthy();
            expect(board1.hashwert() != board3.hashwert()).toBeTruthy();
        });
    })
});