import { Feld } from './feld';
import { Player } from './player';
import { Tor } from './tor';
import { Ball } from './ball';

let feld = new Feld();
let statuszeile : string = "Statuszeile";

//let feld = "                ";
//console.log(feld);

let tick : number = 0;

let players : Player[] = [];

function initPlayers() {
    players = [];
    let player;
    player = new Player(feld, 22,4);  players.push(player);
    player = new Player(feld, 22,8);  players.push(player);
    player = new Player(feld, 22,12);  players.push(player);
    player = new Player(feld, 22,16);  players.push(player);

    player = new Player(feld, 3,10);  //players.push(player); // Torfrau
    player = new Player(feld, 10,7);  players.push(player);
    player = new Player(feld, 10,13);  players.push(player);
}
initPlayers();

let ball : Ball;

//ball = new Ball(feld, 41,8);
ball = new Ball(feld, feld.feld_length/2-1,feld.feld_height/2)

let tor_links = new Tor(feld.feld_length, feld.feld_height/2);
let tor_rechts = new Tor(feld.feld_length, feld.feld_height/2);

function drawBall() {
    ball.draw(feld);
    feld.setPositionOnBoard('o', ball.getPosition().x, ball.getPosition().y);
}
drawBall();

console.log(feld);

let count = 30;
let c = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let ballcounter = 0;
function render() {
    if(false && c == count) return; // run infinitely
    setTimeout(() => {
        for(let player of players) {
            let rnd_x = getRandomInt(3) - 1; // -1 0 1
            let rnd_y = getRandomInt(3) - 1; // -1 0 1
            //console.log(`rnd: ${rnd}`);
            let max_distancceToBall = 0; // TODO Integer Max value
            let next_x = 0; let next_y = 0;
            let max_distanceToGoal = 0;
            for(let i = 0; i < 10; i++) {
                let rnd_x = getRandomInt(3) - 1; // -1 0 1
                let rnd_y = getRandomInt(3) - 1; // -1 0 1
                let distancceToBall = Math.abs(ball.getPosition().x - player.getPosition().x+rnd_x)+
                Math.abs(ball.getPosition().y - player.getPosition().y+rnd_y);
                let distanceToGoal = Math.abs(tor_rechts.getPosition().x - ball.getPosition().x+rnd_x)+
                Math.abs(tor_rechts.getPosition().y - ball.getPosition().y+rnd_y);
                if(distancceToBall > max_distancceToBall && distanceToGoal > max_distanceToGoal) { 
                    max_distancceToBall = distancceToBall; 
                    max_distanceToGoal = distanceToGoal; next_x = rnd_x; next_y = rnd_y; 
                }
            }
            //player.move(feld,rnd_x,rnd_y)
            player.move(feld,next_x,next_y);
            //console.log(`ball: ${ball.getPosition().x}/${ball.getPosition().y}`)
            //
            // 0o
            //
            // player shoots ball
            if(player.getPosition().x-1 == ball.getPosition().x
                    && player.getPosition().y == ball.getPosition().y
            ) {
                //console.log("player touched ball!");
                ballcounter++;
                let message = `player touched ball! ${ballcounter} ball: ${ball.getPosition().x}/${ball.getPosition().y}`;
                statuszeile = message;

                ball.move(feld, 10,0);
                //return;
            }
            if(player.getPosition().x+1 == ball.getPosition().x
                && player.getPosition().y == ball.getPosition().y
            ) {
                //console.log("player touched ball!");
                ballcounter++;
                let message = `player touched ball! ${ballcounter} ball: ${ball.getPosition().x}/${ball.getPosition().y}`;
                statuszeile = message;

                ball.move(feld, -10,0);
                //return;
            }
            // ball is in Tor!
            if(tor_rechts.contains(feld, ball.getPosition())) {
                console.log("Tooor!!!");
                feld = new Feld();
                ball = new Ball(feld, feld.feld_length/2-1,feld.feld_height/2)
                initPlayers();
                //while(1);
            }
        }
        let message = `tick: ${tick} ball: ${ball.getPosition().x}/${ball.getPosition().y}`;
        statuszeile = message;
        //statuszeile = statuszeile.concat(" " + tick);
        //statuszeile = " tick: " + tick;
        tick++;
        drawBall();
        console.log(feld.feld + "\n" + statuszeile);
        //console.log(statuszeile)
        if(true || c < 15) render(); // next tick
        //else moveBackward();
    }, 100);
    c++;
}

//ball.move(feld, 50,0);
render();