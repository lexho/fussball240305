import { Feld } from './feld.js';
import { Player } from './player.js';
import { Tor } from './tor.js';
import { Ball } from './ball.js';
import { Move } from './move.js';
import { Players } from './players.js';
export class Board {
    /*constructor(){
        //console.log("board constr")
        this.feld = new Feld();
        this.tor_links = new Tor(this.feld.feld_length, this.feld.feld_height/2);
        this.tor_rechts = new Tor(this.feld.feld_length, this.feld.feld_height/2);
        //this.initPlayers();
        //this.players = [];
        let players  : Player[]= [];
        let player;
        player = new Player(1, this.feld, 22,4);  players.push(player);
        player = new Player(2, this.feld, 22,8);  players.push(player);
        player = new Player(3, this.feld, 22,12);  players.push(player);
        //player = new Player(4, this.feld, 22,16);  players.push(player);
    
        //player = new Player(5, this.feld, 3,10);  players.push(player); // Torfrau
        //player = new Player(6, this.feld, 10,7);  players.push(player);
        //player = new Player(7, this.feld, 10,13);  players.push(player);
        this.players = new Players(players);
        this.ball = new Ball(this.feld, this.feld.feld_length/2-1,this.feld.feld_height/2)
        this.ball.draw();
        //console.log(this.feld);
    }*/
    constructor(anzahlSpieler = 2) {
        this.statuszeile = "";
        this.tick = 0;
        this.score = 0;
        this.message = "";
        this.spielstand = 0;
        this.spielstandGegner = 0;
        this.move = new Move(0, 0);
        this.running = true;
        this.tor = false;
        //console.log("board constr")
        this.feld = new Feld();
        this.tor_links = new Tor(this.feld.feld_length, this.feld.feld_height / 2);
        this.tor_rechts = new Tor(this.feld.feld_length, this.feld.feld_height / 2);
        //this.initPlayers();
        //this.players = [];
        let players = [];
        for (let i = 0; i < anzahlSpieler; i++) {
            let player = new Player(i + 1, this.feld, 22, 4 + i * 2);
            players.push(player);
        }
        /*player = new Player(1, this.feld, 22,4);  players.push(player);
        player = new Player(2, this.feld, 22,8);  players.push(player);
        player = new Player(3, this.feld, 22,12);  players.push(player);
        //player = new Player(4, this.feld, 22,16);  players.push(player);
    
        //player = new Player(5, this.feld, 3,10);  players.push(player); // Torfrau
        //player = new Player(6, this.feld, 10,7);  players.push(player);
        //player = new Player(7, this.feld, 10,13);  players.push(player);*/
        this.players = new Players(players);
        this.ball = new Ball(this.feld, this.feld.feld_length / 2 - 1, this.feld.feld_height / 2);
        this.ball.draw();
        //console.log(this.feld);
    }
    init(feld, tor_links, tor_rechts, players, ball) {
        this.feld = feld;
        this.tor_links = tor_links;
        this.tor_rechts = tor_rechts;
        this.players = players;
        this.ball = ball;
        this.ball.draw();
        //console.log(this.feld);
    }
    getScore() {
        this.evaluate();
        return this.score;
    }
    spielstandErhoehen() {
        this.spielstand++;
    }
    spielstandGegnerErhoehen() {
        this.spielstandGegner++;
    }
    buildSpielstand() {
        let spielstandzeile = "                                          "; //0:0";
        spielstandzeile += this.spielstand + ":" + this.spielstandGegner;
        return spielstandzeile;
    }
    getPossibleMoves() {
        if (this.running)
            return this.players.currentPlayer.getPossibleMoves();
        else
            return [];
        //return this.ball.getPossibleMoves();
    }
    makeMove(move) {
        //console.log("makeMove")
        this.move = move;
        let player = this.players.currentPlayer;
        this.ball.move();
        //console.log("current player: "+player.id+" makes move:"+move.x+"/"+move.y);
        player.makeMove(move); //TODO activate 
        //this.ball.removePosition();
        //this.ball.setPosition(this.ball.x + move.x, this.ball.y + move.y);
        this.ball.draw();
        let message = "";
        //this.ball.kick(50,0);
        //
        // 0o
        //
        // player shoots ball
        // ------>0
        //console.log(player.getPosition().x+1 + "/" + player.getPosition().y + " " + this.ball.x + "/" + this.ball.y);
        if (player.getPosition().x + 1 == this.ball.x
            && player.getPosition().y == this.ball.y) {
            message += 'player touched ball!';
            this.ball.kick(10, 0);
            //return;
            //while(1);
        }
        if (player.getPosition().x - 1 == this.ball.x
            && player.getPosition().y == this.ball.y) {
            //console.log("player touched ball!");
            message += 'player touched ball!';
            this.ball.kick(-10, 0);
        }
        if (player.getPosition().x == this.ball.x
            && player.getPosition().y + 1 == this.ball.y) {
            //console.log("player touched ball!");
            message += 'player touched ball!';
            this.ball.kick(0, 10);
        }
        if (player.getPosition().x == this.ball.x
            && player.getPosition().y - 1 == this.ball.y) {
            //console.log("player touched ball!");
            message += 'player touched ball!';
            this.ball.kick(0, -10);
        }
        if (this.tor_rechts.contains(this.feld, this.ball)) {
            message += "Tooor!!!";
            this.spielstandErhoehen();
            //return;
            //while(1);
            this.tor = true;
            this.running = false;
            //if(!this.isRunning()) console.log("Game ended.")
            //while(1);
        }
        this.statuszeile = message;
        this.players.next();
        this.tick++;
    }
    print() {
        this.statuszeile = `hash: ${this.hashwert()} tick: ${this.tick} move: ${this.move.x}/${this.move.y} score: ${this.getScore()} player: ${this.players.currentPlayer.getPosition().x}/${this.players.currentPlayer.getPosition().y} ball: ${this.ball.x}/${this.ball.y} momentum ${this.ball.momentum_x} currentPlayer: ${this.players.currentPlayer.id} ${this.statuszeile} running: ${this.running}`;
        //this.printMessage(this.message);
        //this.ball.draw();
        //this.feld.feld_length/2-2;
        let spielstand = this.buildSpielstand();
        console.log(spielstand + "\n" + this.feld.feld + "\n" + this.statuszeile);
    }
    evaluate() {
        let score = 0;
        //let player = this.players.prevPlayer
        const player = this.players.currentPlayer;
        //console.log("currentPlayer: " + player.id)
        let min_distancceToBall = Number.POSITIVE_INFINITY;
        for (let player of this.players.players) {
            let distancceToBall = Math.abs(this.ball.x - player.pos.x) + Math.abs(this.ball.y - player.pos.y);
            if (distancceToBall < min_distancceToBall)
                min_distancceToBall = distancceToBall;
        }
        let distancceToBall = Math.abs(this.ball.x - player.pos.x) + Math.abs(this.ball.y - player.pos.y);
        let distanceToGoal = Math.abs(this.ball.x - this.tor_rechts.pos.x) + Math.abs(this.ball.y - this.tor_rechts.pos.y);
        let distanceToCenter = Math.abs(this.players.currentPlayer.pos.x - this.feld.feld_length / 2) + Math.abs(this.players.currentPlayer.pos.y - this.feld.feld_height / 2);
        score += -1 * distancceToBall;
        score += -1 * distanceToGoal * 10;
        //score += -1 * min_distancceToBall;
        //score += -1 * distanceToCenter;
        // ball is in Tor!
        if (this.tor_rechts.contains(this.feld, this.ball)) {
            score += 1000000;
            this.running = false;
        }
        this.score = score;
        return score;
    }
    copy() {
        let board = new Board();
        //let board1 = {...board};
        //let board2 = {...this};
        //let board = {...this};
        board.tick = this.tick;
        //board.hashwert = this.hashwert; // TODO neu berechnen?
        let feld = new Feld();
        let players = [];
        feld.feld = this.feld.feld;
        let ball = new Ball(feld, this.ball.x, this.ball.y);
        ball.momentum_x = this.ball.momentum_x;
        for (let player of this.players.players) {
            let p = new Player(player.id, feld, player.getPosition().x, player.getPosition().y);
            players.push(p);
        }
        //console.log("players.length: " + players.length);
        let playersX = new Players(players); // currentPlayer players.at(0)
        playersX.index = this.players.index;
        //playersX.currentPlayer = playersX.players.at(this.players.index); //TODO workaround
        playersX.setCurrentPlayer(playersX.players[this.players.index % this.players.players.length]);
        //playersX.next();
        //playersX.currentPlayer = this.players.currentPlayer.pos.x;
        //this.players.currentPlayer.pos.y;
        let tor_links = new Tor(this.feld.feld_length, this.feld.feld_height / 2);
        let tor_rechts = new Tor(this.feld.feld_length, this.feld.feld_height / 2);
        //this.players = new Players(players);
        board.init(feld, tor_links, tor_rechts, playersX, ball);
        board.running = this.running;
        return board;
    }
    isRunning() {
        return this.running;
    }
    hashwert() {
        let hash = 1;
        // player positions
        // ball positions
        //return this.feld.hashwert();
        hash *= 3 * this.ball.x + 7 * this.ball.y;
        //console.log(`hash: ${hash}`)
        let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
        let i = 0;
        for (let player of this.players.players) {
            //console.log(`player ${player.id}: hash ${player.hashwert()}`);
            hash += primes[i] * player.hashwert();
            i++;
        }
        //hash = Math.floor(hash/1000000);
        //console.log(`board hash: ${hash}`)
        return hash;
    }
    getMove() {
        return this.move;
    }
    draw() {
        this.ball.draw();
    }
    toString() {
        this.statuszeile = `tick: ${this.tick} move: ${this.move.x}/${this.move.y} score: ${this.getScore()} player: ${this.players.currentPlayer.getPosition().x}/${this.players.currentPlayer.getPosition().y} ball: ${this.ball.x}/${this.ball.y} momentum ${this.ball.momentum_x} currentPlayer: ${this.players.currentPlayer.id} ${this.statuszeile} running: ${this.running}`;
        let spielstand = this.buildSpielstand();
        return spielstand + "\n" + this.feld.feld + "\n" + this.statuszeile;
    }
}
