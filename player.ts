import { Feld } from './feld.js';
import { Ball } from './ball.js';
import { Tor } from './tor.js';
import { Position } from './position.js';
import { Move } from './move.js';

let nextPlayerID = 1;
export class Player {
    id : number;
    pos : Position;
    feld: Feld;

    constructor(id: number, feld: Feld, x: number,y: number) {
        this.feld = feld;
        this.id = id; // nextPlayerID;
        nextPlayerID++;
        this.pos = new Position(x,y);
        this.setPosition(x,y)
    }

    //position x/y
    getPosition() {
        return this.pos;
    }
    setPosition(x: number,y: number) {
        this.pos = new Position(x,y);
        let sign : unknown = (this.id % 10);
        this.feld.setPositionOnBoard(sign as string, x, y);
    }
    removePosition() {
        let p = this.pos.y * this.feld.feld_length + this.pos.x;
        this.feld.setPositionOnBoard(this.feld.getInitial(p), this.pos.x, this.pos.y);
    }
    move(x: number,y: number) {
        // validation
        /*console.log("x: " + x);
        console.log("y: " + y);*/
        if(this.pos.x + x < 0 || this.pos.x + x > this.feld.feld_length) {console.log("außerhalb des Bereichs x");return;}
        if(this.pos.y + y < 0 || this.pos.y + y > this.feld.feld_height) {console.log("außerhalb des Bereichs x");return;}
        if(this.feld.isFree(new Position(this.pos.x + x,this.pos.y + y)) || (x == 0 && y == 0)) { // <-- stay
        this.removePosition();
        //console.log(`player moves from ${this.pos.x}/${this.pos.y} to ${this.pos.x + x}/${this.pos.y + y}`)
        this.setPosition(this.pos.x + x,this.pos.y + y);
        } else {
            console.log(x + "/" + y)
            console.log("feld ist nicht frei!")
        }
    }
    makeMove(move : Move) {
        this.move(move.x,move.y);
    }

    getPossibleMoves() {
        let coord = [new Move(-1,-1), new Move(0,-1), new Move(1,-1), new Move(-1,0), new Move(0,0), new Move(1,0),new Move(-1,1), new Move(0,1), new Move(1,1)];
        // valid moves
        let movesValid = [];
        for(let m of coord) {
            let p = this.pos.plus(m);
            if(this.feld.isOnBoard(p) && this.feld.isFree(p)) {
                movesValid.push(m);
            }
        }
        movesValid.push(new Move(0,0)); // stay
        return movesValid;
    }

    /*getNextMove(ball : Ball, tor_rechts : Tor) {
        let min_distancceToBall = 1000; // TODO Integer Max value
        let min_distanceToGoal = 1000;
        let next_x = 0; let next_y = 0;
    
        // 0 0 0
        // 0 0 0
        // 0 0 0

        // move score
        //    0    0   0
        // -100    p 100
        //    0    0   0
        let moves = this.getPossibleMoves();
        for(let i = 0; i < 3; i++) {
            let m = moves[getRandomInt(moves.length)];
            let rnd_x = m.x;
            let rnd_y = m.y;
            //let rnd_x = getRandomInt(3) - 1; // -1 0 1
            //let rnd_y = getRandomInt(3) - 1; // -1 0 1
            //let rnd_x = coord[i].x;
            //let rnd_y = coord[i].y;

            //next_x = rnd_x; next_y = rnd_y;

            //console.log(`next_x ${rnd_x} next_y ${rnd_y}`);
            let distancceToBall = Math.abs((ball.getPosition().x)-(this.pos.x+rnd_x)) + Math.abs((ball.getPosition().y)-(this.pos.y+rnd_y));
            //console.log(`ball: ${ball.getPosition().x} / ${ball.getPosition().y} player: ${this.pos.x+rnd_x} / ${this.pos.y+rnd_y} distancceToBall ${distancceToBall} next_x ${next_x} next_y ${next_y}`);
            let distanceToGoal = -1;
            //let distanceToGoal = Math.abs(tor_rechts.getPosition().x - ball.getPosition().x+rnd_x)+
            //Math.abs(tor_rechts.getPosition().y - ball.getPosition().y+rnd_y);
            if(distancceToBall < min_distancceToBall /*&& distanceToGoal < min_distanceToGoal*//*) { 
                //min_distancceToBall = distancceToBall; 
                //console.log(`id: ${this.id} ball: ${ball.getPosition().x} / ${ball.getPosition().y} player: ${this.pos.x+rnd_x} / ${this.pos.y+rnd_y} distancceToBall ${distancceToBall} next: ${next_x} / ${next_y}`);
            //    min_distanceToGoal = distanceToGoal; 
                //next_x = rnd_x; next_y = rnd_y; 
            }
            //console.log(`distancceToBall ${distancceToBall} distanceToGoal ${distanceToGoal} next_x ${next_x} next_y ${next_y}`)
        } // for
        //console.log(`min_distancceToBall ${min_distancceToBall} min_distanceToGoal ${min_distanceToGoal}`)
        //console.log(`next_x ${next_x} next_y ${next_y}`);
        // search for next best move

        // make best move
        //this.move(next_x,next_y);
    }*/
    hashwert() {
        let hash = 11 * this.pos.x + 13 * this.pos.y;
        return hash;
    }

    draw() {

    }
}