import {describe, expect, test} from '@jest/globals';
import { Feld } from '../feld';
import { Ball } from '../ball';
import { Board } from '../board';
import { Move } from '../move';
import { Rectangle } from '../rectangle';
import { Position } from '../position';

describe('Spielfeld', () => {
    beforeEach(()=>{
        // Fußballfeld erzeugen
    });

    describe('Ball position', () => {
        it('should be im Eck links oben', () => {
            const feld = new Feld();
            let ball = new Ball(feld, 0,0);
            ball.draw();
            console.log(feld.feld);
            expect(feld.get(0)).toBe('o');
        })
        it('there should be line \'#\'', () => {
            const feld = new Feld();
            let ball = new Ball(feld, 2,0);
            ball.draw();
            console.log(feld.feld);
            //console.log('"' + feld.feld[feld.feld_length*1 + 9] + "  " + feld.feld[feld.feld_length*1 + 10] + "  " + feld.feld[feld.feld_length*1 + 11] + '"')
            //console.log('"' + feld.feld[feld.feld_length*2 + 9] + "  " + feld.feld[feld.feld_length*2 + 10] + "  " + feld.feld[feld.feld_length*2 + 11] + '"')
            //console.log('"' + feld.feld[feld.feld_length*3 + 9] + " [" + feld.feld[feld.feld_length*3 + 10] + "] " + feld.feld[feld.feld_length*3 + 11] + '"')
            //console.log('"' + feld.feld[feld.feld_length*4 + 9] + "  " + feld.feld[feld.feld_length*4 + 10] + "  " + feld.feld[feld.feld_length*4 + 11] + '"')
            
            //expect(feld.get(feld.feld_length*2 + 10)).toBe('#');
        })
        it('should be four in a row', () => {
            const feld = new Feld();
            let ball1 = new Ball(feld, 43,0); // row 1
            let ball2 = new Ball(feld, 43,1); // row 2
            let ball3 = new Ball(feld, 43,2);
            let ball4 = new Ball(feld, 43,3);
            ball1.draw();
            ball2.draw();
            ball3.draw();
            ball4.draw();
            console.log(feld.feld);
            expect(feld.get(0+43)).toBe('o');
            expect(feld.get(feld.feld_length*1+43)).toBe('o');
            expect(feld.get(feld.feld_length*2+43)).toBe('o');
            expect(feld.get(feld.feld_length*3+43)).toBe('o');
        })
        it('should be in the center of the field', () => {
            let board = new Board();
            console.log(board.feld.feld);
            //for(let i = 0; i < board.feld.feld.length; i++) {
            //    if(board.feld.feld[i] == 'o') console.log(`${i} '${board.feld.feld[i]}'`);
            //}
            //console.log(board.feld.feld_length*board.feld.feld_height/2+board.feld.feld_length/2-1)
            expect(board.feld.get(board.feld.feld_length*board.feld.feld_height/2+board.feld.feld_length/2-1)).toBe('o');
            //expect(feld.get(feld.feld_length/2-1,feld.feld_height/2)).toBe('o');
        })

        it('should be in', () => {
            let feld = new Feld();
            // ball positionieren
            let board = new Board();
            //board.ball.kick(43,0);
            board.ball.removePosition()
            board.ball.setPosition(42,3)
            board.ball.draw();
            board.print();
            //feld.isOut();
            expect(board.feld.isOut(board.ball.pos)).toBeFalsy();
        })

        it('should be out 1', () => {
            // ball positionieren
            let board = new Board();
            board.ball.removePosition()
            board.ball.setPosition(15,0)
            board.ball.draw();
            board.print();
            expect(board.feld.isOut(board.ball.pos)).toBeTruthy();
        })

        it('should be in 1', () => {
            // ball positionieren
            let board = new Board();
            board.ball.removePosition()
            board.ball.setPosition(15,3)
            board.ball.draw();
            board.print();
            expect(board.feld.isOut(board.ball.pos)).toBeFalsy();
        })

        it('should be out 2', () => {
            // ball positionieren
            let board = new Board();
            board.ball.removePosition()
            board.ball.setPosition(1,5)
            board.ball.draw();
            board.print();
            expect(board.feld.isOut(board.ball.pos)).toBeTruthy();
        })

        it('should be in 2', () => {
            // ball positionieren
            let board = new Board();
            board.ball.removePosition()
            board.ball.setPosition(3,5)
            board.ball.draw();
            board.print();
            expect(board.feld.isOut(board.ball.pos)).toBeFalsy();
        })

        it('should be out 3', () => {
            // ball positionieren
            let board = new Board();
            board.ball.removePosition()
            board.ball.setPosition(88,17)
            board.ball.draw();
            board.print();
            expect(board.feld.isOut(board.ball.pos)).toBeTruthy();
        })

        it('should be in 3', () => {
            // ball positionieren
            let board = new Board();
            board.ball.removePosition()
            board.ball.setPosition(83,17)
            board.ball.draw();
            board.print();
            expect(board.feld.isOut(board.ball.pos)).toBeFalsy();
        })
    });

    describe('Rectangle', () => {
        it('should be out', () => {
            let rectangle = new Rectangle(100, 75);
            expect(rectangle.ausserhalb(new Position(-1, 49))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(-1, 20))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(-1, 33))).toBeTruthy();

            expect(rectangle.ausserhalb(new Position(101, 20))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(101, 34))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(101, 51))).toBeTruthy();

            expect(rectangle.ausserhalb(new Position(10, -1))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(16, -1))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(27, -1))).toBeTruthy();

            expect(rectangle.ausserhalb(new Position(10, 78))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(17, 78))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(85, 78))).toBeTruthy();
            
            expect(rectangle.ausserhalb(new Position(-10, -10))).toBeTruthy();
            expect(rectangle.ausserhalb(new Position(102, 77))).toBeTruthy();
            //expect(rectangle.ausserhalb(new Position(-1,-1))).toBeTruthy();
            //expect(rectangle.ausserhalb(new Position(100,-1))).toBeTruthy();
            //expect(rectangle.ausserhalb(new Position(0,-1))).toBeTruthy();
            //expect(rectangle.innerhalb(new Position(-1,-1))).toBeFalsy();
            //let board_out = new Board();
            //board_out.ball.removePosition()
            //board_out.ball.setPosition(42,1)
            //board_out.ball.draw();
            //board_out.print();
            //expect(board_out.feld.isOut(board_out.ball.pos)).toBeTruthy();
        })
        it('should be in', () => {
            let rectangle = new Rectangle(100, 75);
            expect(rectangle.innerhalb(new Position(1, 49))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(10, 49))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(16, 49))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(24, 49))).toBeTruthy();

            expect(rectangle.innerhalb(new Position(52, 11))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(52, 23))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(52, 31))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(52, 78))).toBeTruthy();

            expect(rectangle.innerhalb(new Position(90, 95))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(5, 99))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(50, 75/2))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(1,1))).toBeTruthy();
            expect(rectangle.innerhalb(new Position(99, 1))).toBeTruthy();
        })
    })
})