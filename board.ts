import { Feld } from './feld.js';
import { Player } from './player.js';
import { Tor } from './tor.js';
import { Ball } from './ball.js';
import { Move } from './move.js';
import { Players } from './players.js';

export class Board {

feld : Feld;
statuszeile : string = "";
ball : Ball;

constructor(){
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
    player = new Player(4, this.feld, 22,16);  players.push(player);

    player = new Player(5, this.feld, 3,10);  //players.push(player); // Torfrau
    player = new Player(6, this.feld, 10,7);  players.push(player);
    player = new Player(7, this.feld, 10,13);  players.push(player);
    this.players = new Players(players);
    this.ball = new Ball(this.feld, this.feld.feld_length/2-1,this.feld.feld_height/2)
    this.ball.draw();
    //console.log(this.feld);
}

init(feld: Feld, tor_links : Tor, tor_rechts : Tor, players : Players, ball : Ball) {
    this.feld = feld;
    this.tor_links = tor_links;
    this.tor_rechts = tor_rechts;
    this.players = players;
    this.ball = ball;
    this.ball.draw();
    //console.log(this.feld);
}

tick : number = 0;
players : Players;

/*initPlayers() {
    //this.players = [];
    let players  : Player[]= [];
    let player;
    player = new Player(1, this.feld, 22,4);  players.push(player);
    /*player = new Player(2, this.feld, 22,8);  players.push(player);
    player = new Player(3, this.feld, 22,12);  players.push(player);
    player = new Player(4, this.feld, 22,16);  players.push(player);

    player = new Player(5, this.feld, 3,10);  //players.push(player); // Torfrau
    player = new Player(6, this.feld, 10,7);  players.push(player);
    player = new Player(7, this.feld, 10,13);  players.push(player);*/
    //this.players = new Players(players);
//}*/

tor_links;
tor_rechts;
private score : number = 0;
message = "";
spielstand = 0;
spielstandGegner = 0;

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
    if(this.running)
        return this.players.currentPlayer.getPossibleMoves();
    else
        return [];
}

move : Move = new Move(0,0);

makeMove(move : Move) {
    this.move = move;
    let player = this.players.currentPlayer;
    this.ball.move();
    this.ball.draw();
    //console.log("current player: "+player.id+" makes move:"+move.x+"/"+move.y);
    player.makeMove(move);
    
    let message = "";
    //this.ball.kick(50,0);
    //
    // 0o
    //
    // player shoots ball
    // ------>0
    //console.log(player.getPosition().x+1 + "/" + player.getPosition().y + " " + this.ball.x + "/" + this.ball.y);
    if(player.getPosition().x+1 == this.ball.x
            && player.getPosition().y == this.ball.y
    ) {
        message += 'player touched ball!';

        this.ball.kick(10,0);
        //return;
        //while(1);
    }
    if(player.getPosition().x-1 == this.ball.x
        && player.getPosition().y == this.ball.y
    ) {
        //console.log("player touched ball!");
        message += 'player touched ball!';
        this.ball.kick(-10,0);
    }
    if(player.getPosition().x == this.ball.x
        && player.getPosition().y+1 == this.ball.y
    ) {
        //console.log("player touched ball!");
        message += 'player touched ball!';
        this.ball.kick(0,10);
    }    
    if(player.getPosition().x == this.ball.x
        && player.getPosition().y-1 == this.ball.y
    ) {
        //console.log("player touched ball!");
        message += 'player touched ball!';
        this.ball.kick(0,-10);
    }
    if(this.tor_rechts.contains(this.feld, this.ball)) {
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
    this.statuszeile =`hash: ${this.hashwert()} tick: ${this.tick} move: ${this.move.x}/${this.move.y} score: ${this.getScore()} player: ${this.players.currentPlayer.getPosition().x}/${this.players.currentPlayer.getPosition().y} ball: ${this.ball.x}/${this.ball.y} momentum ${this.ball.momentum_x} currentPlayer: ${this.players.currentPlayer.id} ${this.statuszeile} running: ${this.running}`;
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
    
    let distancceToBall = Math.abs((this.ball.x)-(player.pos.x)) + Math.abs((this.ball.y)-(player.pos.y));
    let distanceToGoal = Math.abs((this.ball.x-this.tor_rechts.pos.x) + (this.ball.y-this.tor_rechts.pos.y));

    score += -1 * distancceToBall;
    score += -1 * distanceToGoal * 10;

    // ball is in Tor!
    if(this.tor_rechts.contains(this.feld, this.ball)) {
        score += 1000000;
        this.running = false;
    }
    this.score = score;
    return score;
}

copy() {
    let board = new Board();
    /*let board1 = {...board};
    let board2 = {...this};*/
    //let board = {...this};
    //board.tick = this.tick;
    let feld = new Feld();
    let players : Player[] = [];
    feld.feld = this.feld.feld;
    let ball = new Ball(feld, this.ball.x, this.ball.y)
    ball.momentum_x = this.ball.momentum_x;
    for(let player of this.players.players) {
        let p = new Player(player.id, feld, player.getPosition().x, player.getPosition().y);
        players.push(p);
    }
    //console.log("players.length: " + players.length);
    let playersX  : Players = new Players(players); // currentPlayer players.at(0)
    playersX.index = this.players.index;
    //playersX.currentPlayer = playersX.players.at(this.players.index); //TODO workaround
    playersX.setCurrentPlayer(playersX.players[this.players.index % this.players.players.length]);
    //playersX.next();
    //playersX.currentPlayer = this.players.currentPlayer.pos.x;
    //this.players.currentPlayer.pos.y;
    let tor_links = new Tor(this.feld.feld_length, this.feld.feld_height/2);
    let tor_rechts = new Tor(this.feld.feld_length, this.feld.feld_height/2);

    //this.players = new Players(players);
    board.init(feld, tor_links, tor_rechts, playersX, ball);
    board.running = this.running;
    return board;
}

running = true;
 isRunning() {
    return this.running;
 }

 tor = false;
 hashwert() {
    let hash = 1;
    // player positions
    // ball positions
    //return this.feld.hashwert();
    hash *= 3 * this.ball.x + 7 * this.ball.y
    //console.log(`hash: ${hash}`)
    let primes = [2,3,5,7,11,13,17,19,23,29,31];
    let i = 0;
    for(let player of this.players.players) {
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
    this.statuszeile =`tick: ${this.tick} move: ${this.move.x}/${this.move.y} score: ${this.getScore()} player: ${this.players.currentPlayer.getPosition().x}/${this.players.currentPlayer.getPosition().y} ball: ${this.ball.x}/${this.ball.y} momentum ${this.ball.momentum_x} currentPlayer: ${this.players.currentPlayer.id} ${this.statuszeile} running: ${this.running}`;
    let spielstand = this.buildSpielstand();
    return spielstand + "\n" + this.feld.feld + "\n" + this.statuszeile;
}
}
