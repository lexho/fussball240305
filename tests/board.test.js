import {describe, expect, test} from '@jest/globals';
import { Board } from '../dist/board.js';
import { Move } from '../dist/move.js'
import { Player } from '../dist/player.js'
import { Players } from '../dist/players.js'
import { Feld } from '../dist/feld.js'

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
        it('should be greater when closer to the goal x-axis', () => {
            const board = new Board(1);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i = 0; i < board.feld.feld_length; i++) {
                board.ball.removePosition();
                board.ball.setPosition(i, 5) // move ball to the right // o --------> |
                expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore();
            }
        });
        it('should be smaller when distance to the goal greater x-axis inverted', () => {
            const board = new Board(1);
            let prevScore = Number.NEGATIVE_INFINITY;
            let scores = [];
            for(let i = board.feld.feld_length; i >= 0; i--) {
                board.ball.removePosition();
                board.ball.setPosition(i, 5) // move ball to the right // | <---------- o
                console.log(`prev: ${prevScore} score: ${board.getScore()}`)
                scores.push(board.getScore());
                //expect(board.getScore() < prevScore).toBeTruthy();
                prevScore = board.getScore();
            }
            console.log(scores);
        });
        it('should be greater when closer to the goal diagonal', () => {
            const board = new Board(1);
            let prevScore = Number.NEGATIVE_INFINITY;
            for(let i; i < board.feld.feld_length; i++) {
                board.ball.removePosition();
                board.ball.setPosition(i, i/board.feld.feld_length * board.feld.feld_height) // move ball to the right
                expect(board.getScore() > prevScore).toBeTruthy();
                prevScore = board.getScore();
            }
        });
    })

    describe('hashwert', () => {
        it('should be different hashes on different boards', () => {
            let board = new Board();
            //board.players.currentPlayer = board.players.players[0];
            //console.log(board.hashwert());
            //console.log(board);
            //board.print();
            let board1 = new Board();
            //board1.players.currentPlayer = board.players.players[0];
            //board1.players.players[0].makeMove(new Move(1,5));
            board1.makeMove(new Move(1,5));
            //console.log(board1.hashwert());
            //console.log(board1);
            //board1.print();
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
            board.players = playersX;
            return board;
        }

        it('should be different hashes on different boards 2', () => {
            let board1 = buildBoard(0,0);
            let board2 = buildBoard(1,1);
            let board3 = buildBoard(2,2);
            let board4 = buildBoard(3,3);
            /*board1.print();
            board2.print();
            board3.print();
            board4.print();*/
            console.log(`hashwerte: ${board1.hashwert()} ${board2.hashwert()} ${board3.hashwert()} ${board4.hashwert()} `)
            expect(board1.hashwert() != board2.hashwert()).toBeTruthy();
            expect(board2.hashwert() != board3.hashwert()).toBeTruthy();
            expect(board3.hashwert() != board4.hashwert()).toBeTruthy();
            expect(board1.hashwert() != board4.hashwert()).toBeTruthy();
            expect(board1.hashwert() != board3.hashwert()).toBeTruthy();
        });
    })

    describe('copy', () => {
        it('should be different hashes on different boards', () => {
            let board = new Board();
            let hashwert1 = board.hashwert()
            let currentPlayer1 = board.players.currentPlayer;
            board.makeMove(new Move(1,5));
            const copy = board.copy();
            //console.log(board.hashwert());
            //console.log(copy.hashwert());
            expect(hashwert1 != copy.hashwert()).toBeTruthy();
            expect(currentPlayer1.id != copy.players.currentPlayer.id)
        });
        it('should be same hashes on copied board', () => {
            let board = new Board();
            const copy = board.copy();
            expect(board.hashwert() == copy.hashwert()).toBeTruthy();
            expect(board.players.currentPlayer.id == copy.players.currentPlayer.id)
        });
        it('should be different hashes on different boards 2', () => {
            let board = new Board();
            const copy = board.copy();
            copy.makeMove(new Move(1,5));
            //console.log(board.hashwert());
            //console.log(copy.hashwert());
            expect(board.hashwert != copy.hashwert()).toBeTruthy();
            expect(copy.players.currentPlayer.id == copy.players.currentPlayer.id + 1)
        });
        it('should increment currentPlayer id by 1', () => {
            let copy = new Board();
            let id = 1;
            let ids = [];
            for(let i = 0; i < 5; i++) {
                copy = copy.copy();
                copy.makeMove(new Move(1,5));
                let prev_id = id;
                if(prev_id == copy.players.players.length) prev_id = 0;
                //console.log(prev_id + " " + copy.players.currentPlayer.id)
                id = copy.players.currentPlayer.id;
                ids.push(id);
                expect(id).toBe(prev_id+1 % copy.players.players.length);
            }
            console.log(`ids: ${ids}`);
        });
        it('should be makeMove on board should not affect copy board', () => {
            let board = new Board();
            let hashwert1 = board.hashwert();
            board.print()
            const copy = board.copy();
            console.log("copy: " + copy.hashwert());
            let hashwert_copy = copy.hashwert;
            board.makeMove(new Move(1,5)); // change board should not change copy
            copy.print()
            // copy should still be the same
            
            //console.log(board.hashwert());
            //console.log("copy: " + copy.hashwert());
            //console.log("hashwert1: " + hashwert1);
            expect(hashwert1 == copy.hashwert()).toBeTruthy();
        });
    })

    it('should players increment', () => {
        let feld = new Feld();
        let players = [];
        let player1 = new Player(1, feld, 0, 0);
        let player2 = new Player(2, feld, 1, 0);
        let player3 = new Player(3, feld, 2, 0);
        players.push(player1); players.push(player2); players.push(player3);
        let theplayers = new Players(players);
        let ids = [];
        let prev = 0;
        for(let i = 0; i < 15; i++) {
            //theplayers.currentPlayer.id
            //console.log(`id: ${theplayers.currentPlayer.id}`)
            ids.push(theplayers.currentPlayer.id);
            prev = theplayers.currentPlayer.id;
            if(prev == theplayers.players.length) prev = 0;
            theplayers.next();
            let id = theplayers.currentPlayer.id;
            expect(id).toBe(prev+1 % theplayers.players.length);
        }
        console.log(`ids: ${ids}`);
    })


    describe('copy board parameters', () => {
        /*it('should be board parameters', () => {
            let board = new Board();

            let copy = board.copy();
            expect(board.feld).toBe(copy.feld)
            expect(board.ball).toBe(copy.ball)
            expect(board.tick).toBe(copy.tick)
            expect(board.players).toBe(copy.players)
            expect(board.spielstand).toBe(copy.spielstand)
            expect(board.spielstandGegner).toBe(copy.spielstandGegner)
            expect(board.move).toBe(copy.move)
            expect(board.running).toBe(copy.running)
            expect(board.hashwert).toBe(copy.hashwert)
            expect(board.tor).toBe(copy.tor)
        })*/
        it('feld should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.feld).toEqual(copy.feld)
        })
        it('ball should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.ball).toEqual(copy.ball)
        })
        it('tick should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.tick).toEqual(copy.tick)
        })
        it('players should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.players).toEqual(copy.players)
        })
        it('spielstand should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.spielstand).toEqual(copy.spielstand)
        })
        it('spielstandGegner should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.spielstandGegner).toEqual(copy.spielstandGegner)
        })
        it('move should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.move).toEqual(copy.move)
        })
        it('running should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.running).toEqual(copy.running)
        })
        it('hashwert should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.hashwert).toEqual(copy.hashwert)
        })
        it('tor should be the same', () => {
            let board = new Board();
            let copy = board.copy();
            expect(board.tor).toEqual(copy.tor)
        })
    })

    describe('make move', () => {
        it('should have player rotation', () => {
            let board = new Board(3);
            console.log(`anzahl spieler: ${board.players.players.length}`)
            let ids = [];
            for(let i = 0; i < 15; i++) {
                let prev = board.players.currentPlayer.id;
                if(prev == board.players.players.length) prev = 0;
                board.makeMove(board.getPossibleMoves()[0]);
                ids.push(board.players.currentPlayer.id);
                console.log(`ids: ${ids}`)
                expect(board.players.currentPlayer.id).toBe(prev+1 % board.players.players.length);
            }
            
        })
        it('should have tick increment', () => {
            let board = new Board();
            //console.log(`anzahl spieler: ${board.players.players.length}`)
            for(let i = 0; i < 15; i++) {
                let prev = board.tick
                board.makeMove(board.getPossibleMoves()[0]);
                expect(board.tick).toBe(prev+1);
            }
        })
    })
    describe('possible moves', () => {
        it('should exist', () => {
            let board = new Board();
            for(let i = 0; i < 5; i++) {
                let moves = board.getPossibleMoves();
                //console.log(`moves length: ${moves.length}`);
                board.makeMove(moves[0]);
            }
        })
    });

    describe('tick hochfahren makeMove', () => {
        it('should fast and correct', () => {
            let board = new Board();
            let prev_tick = board.tick;
            for(let i = 0; i < 10000; i++) {
                board.makeMove(board.getPossibleMoves()[0])
                let tick = board.tick
                expect(board.tick).toBe(prev_tick+1)
                prev_tick = tick;
            }
        })

        it('should hin und her', () => {
            let board = new Board(1);
            let prev_hash = board.hashwert();
            for(let i = 0; i < 10000; i++) {
                prev_hash = board.hashwert();
                board.makeMove(new Move(1,1));
                //console.log(`hashwert: ${board.hashwert()} prev_hash: ${prev_hash}`)
                expect(board.hashwert() != prev_hash).toBeTruthy()
                board.makeMove(new Move(-1,-1));
                expect(board.hashwert()).toBe(prev_hash)
            }
        })
    })
});