import brain from 'brain.js';
import { Move } from '../move.js';
import { Board } from '../board.js';
import { Search } from '../search/search.js';
export class NeuralNetworkSearch extends Search {
    constructor(limit) {
        super(limit);
        this.board = new Board();
        this.SCALING = 10;
        this.IN = this.board.feld.feld_length * this.board.feld.feld_height * 2 / this.SCALING; // *2
        this.HIDDEN = Math.round(this.board.feld.feld_length * this.board.feld.feld_height / this.SCALING / 3);
        // provide optional config object (or undefined). Defaults shown.
        this.config = {
            binaryThresh: 0.5, // ¯\_(ツ)_/¯
            hiddenLayers: [this.HIDDEN], // array of ints for the sizes of the hidden layers in the network
            activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
        };
        // create a simple feed forward neural network with backpropagation
        this.net = new brain.NeuralNetwork(this.config);
        this.depth_limit = limit;
        console.log("neural network search");
        console.log(`input neurons: ${this.IN}\nhidden layer: ${this.HIDDEN}\noutput neurons: 9`);
        console.log();
    }
    search(board, depth_limit = this.depth_limit) {
        this.depth_limit = depth_limit;
        return this.search0(board, 0);
    }
    train() {
        // generate training data
        console.log("train neural net with generated training data");
        this.board = new Board();
        let input = [];
        for (let i = 1; i <= this.IN; i++) {
            input.push(0);
        }
        let samples = [];
        let bx = 0;
        let by = 0;
        //let p = 0; let b = 0;
        /*for(let i = 0; i < 20; i++) {
            let player = { x: 0, y:0 };
            let ball = { x: 0, y:0 };
            ball.x = Math.round(Math.random()*this.board.feld.feld_length/this.SCALING);
            ball.y = Math.round(Math.random()*this.board.feld.feld_length/this.SCALING);
            player.x = Math.round(Math.random()*this.board.feld.feld_height/this.SCALING);
            player.y = Math.round(Math.random()*this.board.feld.feld_height/this.SCALING);
            b = ball.y  * this.board.feld.feld_length/this.SCALING + ball.x; // ball in random position
            p = player.y  * this.board.feld.feld_length/this.SCALING + player.x; // player in random position
            let distancceToBall = Math.abs(ball.x - player.x) + Math.abs(player.x - ball.x);
            let inputi = input;
            inputi[b] = 1;
            inputi[p] = 1;
            let output = [];
            if(distancceToBall < 5) {
                output = [
                    0, 1 // good
                ]
            } else {
                output = [
                    1, 0 // bad
                ]
            }
            let sample = { input: inputi, output: output }
            samples.push(sample);
        }*/
        let player = { x: 0, y: 0 };
        let ball = { x: this.board.ball.x / this.SCALING, y: this.board.ball.y / this.SCALING };
        let feld = { length: this.board.feld.feld_length / this.SCALING, height: this.board.feld.feld_height / this.SCALING };
        //let b = ball.y * feld.length + ball.x; // ball in the center
        for (let y = 0; y < feld.height; y++) { // rows
            for (let x = 0; x < feld.length / 2; x++) { // linke spielfeldhälfte
                let xi = Math.round(Math.random() * feld.length / 2);
                let p = y * feld.length + x;
                let b = ball.y * feld.length + ball.x;
                //let p = [];
                //p.push(y * feld.length + x);
                //p.push(y * feld.length + x-1);
                //p.push(y * feld.length + x+1);
                /*p.push((y + 1) * feld.length + x);
                p.push((y + 1) * feld.length + x-1);
                p.push((y + 1) * feld.length + x+1);
                p.push((y - 1) * feld.length + x);
                p.push((y - 1) * feld.length + x-1);
                p.push((y - 1) * feld.length + x+1);*/
                //let b = [];
                //b.push(ball.y * feld.length + ball.x);
                //b.push(ball.y * feld.length + ball.x-1);
                //b.push(ball.y * feld.length + ball.x+1);
                /*b.push((ball.y + 1) * feld.length + ball.x);
                b.push((ball.y + 1)  * feld.length + ball.x-1);
                b.push((ball.y + 1)  * feld.length + ball.x+1);
                b.push((ball.y - 1) * feld.length + ball.x);
                b.push((ball.y - 1)  * feld.length + ball.x-1);
                b.push((ball.y - 1)  * feld.length + ball.x+1);*/
                let inputi = [];
                for (let i = 0; i < this.IN; i++) { // reset
                    inputi.push(0);
                }
                //let inputi = input;
                inputi[p] = 1;
                inputi[b] = 1; // the '1' is the position of the player/ball
                /*for(let pi of p) {
                    inputi[pi] = 1;
                }
                for(let bi of b) {
                    inputi[bi] = 1;
                }*/
                //inputi[p+1] = 1; inputi[b+1] = 1;
                //inputi[p-1] = 1; inputi[b-1] = 1;
                let output = [
                    0, 0, 0,
                    0, 0, 1,
                    0, 0, 0,
                ];
                let sample = { input: inputi, output: output };
                samples.push(sample);
            }
        }
        //samples.push({ input: input, output: [0,0,0,0,0,0,0,0,0]}); // empty board
        player = { x: 0, y: 0 };
        ball = { x: this.board.ball.x / this.SCALING, y: this.board.ball.y / this.SCALING };
        feld = { length: this.board.feld.feld_length / this.SCALING, height: this.board.feld.feld_height / this.SCALING };
        //bx = this.board.ball.x; by = this.board.ball.y;
        //bx /= this.SCALING; by /= this.SCALING;
        let b = ball.y * feld.length + ball.x; // ball in the center
        for (let y = 0; y < feld.height; y++) { // rows
            for (let x = feld.length; x > feld.length / 2; x--) { // rechte spielfeldhälfte
                let xi = Math.round(Math.random() * feld.length / 2);
                let p = y * feld.length + x;
                let b = ball.y * feld.length + ball.x;
                //let p = [];
                //p.push(y * feld.length + x);
                //p.push(y * feld.length + x-1);
                //p.push(y * feld.length + x+1);
                /*p.push((y + 1) * feld.length + x);
                p.push((y + 1) * feld.length + x-1);
                p.push((y + 1) * feld.length + x+1);
                p.push((y - 1) * feld.length + x);
                p.push((y - 1) * feld.length + x-1);
                p.push((y - 1) * feld.length + x+1);*/
                //let b = [];
                //b.push(ball.y * feld.length + ball.x);
                //b.push(ball.y * feld.length + ball.x-1);
                //b.push(ball.y * feld.length + ball.x+1);
                /*b.push((ball.y + 1) * feld.length + ball.x);
                b.push((ball.y + 1)  * feld.length + ball.x-1);
                b.push((ball.y + 1)  * feld.length + ball.x+1);
                b.push((ball.y - 1) * feld.length + ball.x);
                b.push((ball.y - 1)  * feld.length + ball.x-1);
                b.push((ball.y - 1)  * feld.length + ball.x+1);*/
                let inputi = [];
                for (let i = 0; i < this.IN; i++) { // reset
                    inputi.push(0);
                }
                //let inputi = input;
                inputi[p] = 1;
                inputi[b] = 1; // the '1' is the position of the player/ball
                /*for(let pi of p) {
                    inputi[pi] = 1;
                }
                for(let bi of b) {
                    inputi[bi] = 1;
                }*/
                let output = [
                    0, 0, 0,
                    1, 0, 0,
                    0, 0, 0,
                ];
                let sample = { input: inputi, output: output };
                samples.push(sample);
            }
        }
        let input1 = input;
        // set player and ball position
        //    0
        // x |p------->b---------|
        //   -
        // y y
        //   -
        /*let x = 0; let y = 0;
        x = 0; y = Math.round(this.board.feld.feld_height/2);
        x /= this.SCALING; y /= this.SCALING;
        p = y * this.board.feld.feld_length/this.SCALING + x; // player left side in the middle of the board
        x = this.board.ball.x; y = this.board.ball.y;
        x /= this.SCALING; y /= this.SCALING;
        b = y * this.board.feld.feld_length/this.SCALING + x; // ball in the center
        //p = 5; b = 7, // TODO DEBUG remove
        input1[p] = 1; input1[b] = 1; // the '1' is the position of the player/ball
        let output1 = [
            0,0,0,
            0,0,1,
            0,0,0];*/
        // set player and ball position
        //    0
        // x |---------b<-------p|
        //   -
        // y y
        //   -
        /*let input2 = input;
        x = this.board.feld.feld_length; y = Math.round(this.board.feld.feld_height/2);
        x /= this.SCALING; y /= this.SCALING;
        p = y * this.board.feld.feld_length/this.SCALING + x; // player left side in the middle of the board
        x = this.board.ball.x; y = this.board.ball.y;
        x /= this.SCALING; y /= this.SCALING;
        b = y * this.board.feld.feld_length/this.SCALING + x; // ball in the center
        //p = 7; b = 5, // TODO DEBUG remove
        input2[p] = 1; input2[b] = 1; // the '1' is the position of the player/ball
        let output2 = [
            0,0,0,
            1,0,0,
            0,0,0];
        */
        for (let sample of samples) {
            console.log(sample);
            if (sample.input.length != this.IN) {
                console.error(`invalid sample size input: ${sample.input.length}`);
                process.exit(1);
            }
            if (sample.output.length != 9) {
                console.error(`invalid sample size output: ${sample.output.length}`);
                process.exit(1);
            }
        }
        console.log(`samples size: ${samples.length}`);
        this.net.train(samples);
    }
    search0(board, depth) {
        board.players.currentPlayer.getPosition().x;
        board.players.currentPlayer.getPosition().y;
        board.ball.x;
        board.ball.y;
        /*let player = { x: 0, y:0 };
        let ball = { x: 0, y:0 };
        ball.x = Math.round(Math.random()*board.feld.feld_length/this.SCALING);
        ball.y = Math.round(Math.random()*board.feld.feld_length/this.SCALING);
        player.x = Math.round(Math.random()*board.feld.feld_height/this.SCALING);
        player.y = Math.round(Math.random()*board.feld.feld_height/this.SCALING);
        let b = ball.y  * board.feld.feld_length/this.SCALING + ball.x; // ball in random position
        let p = player.y  * board.feld.feld_length/this.SCALING + player.x; // player in random position
    
        let input = [];
        for (let i = 1; i <= board.feld.feld_length * board.feld.feld_height / this.SCALING; i++) {
            input.push(0);
        }
        input[b] = 1;
        input[p] = 1;*/
        // board --> neural net input matrix
        let x = Math.round(board.players.currentPlayer.getPosition().x / this.SCALING);
        let y = Math.round(board.players.currentPlayer.getPosition().y / this.SCALING);
        let ball_x = Math.round(board.ball.x / this.SCALING);
        let ball_y = Math.round(board.ball.y / this.SCALING);
        console.log(`player: ${board.players.currentPlayer.getPosition().x}/${board.players.currentPlayer.getPosition().y}, ball ${board.ball.x}/${board.ball.y}`);
        console.log(`player: ${x}/${y}, ball ${ball_x}/${ball_y}`);
        let array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let input = [];
        for (let i = 1; i <= this.IN; i++) {
            input.push(0);
        }
        let p = y * board.feld.feld_length + x; // the '1'
        let b = ball_y * board.feld.feld_length + ball_x; // the '1'
        input[p] = 1;
        input[b] = 1;
        /*let output = this.net.run([
        0, 0, 1, 0, 0, // ball
        0, 0, 0, 0, 1, // player
      ]);*/
        let output = this.net.run(input);
        //console.log(`output ${output}`);
        let output_rounded = [];
        for (let o of output) {
            output_rounded.push(Math.round(o * 1000) / 1000);
        }
        /*if(output[1] > output[0]) console.log("good");
        else if(output[0] > output[1]) console.log("bad");*/
        //console.log(`output ${output_rounded}`);
        console.log(`${output_rounded[0]}\t${output_rounded[1]}\t${output_rounded[2]}`);
        console.log(`${output_rounded[3]}\t${output_rounded[4]}\t${output_rounded[5]}`);
        console.log(`${output_rounded[6]}\t${output_rounded[7]}\t${output_rounded[8]}`);
        //if (output[0] > output[1]) console.log('to the left');
        //else console.log('to the right');
        // output --> Move
        // 0 0 0
        // 0 0 0 -->  x -1 0 1; y -1 0 1
        // 0 0 0
        //  x = -1 0 1
        // 0 0 0   y = -1
        // 0 0 0   y =  0
        // 0 0 0   y =  1
        /*if(output[0] || output[1] || output[2]) y = -1
        if(output[3] || output[4] || output[5]) y = 0
        if(output[6] || output[7] || output[8]) y = 1
        if(output[0] || output[3] || output[6]) x = -1
        if(output[1] || output[4] || output[7]) x = 0
        if(output[2] || output[5] || output[8]) x = 1*/
        // DEBUG
        x = 0, y = 0;
        const threshold = 0.1;
        if (output[3] > threshold && output[3] > output[5])
            x = -1; // to the left
        if (output[5] > threshold && output[5] > output[3])
            x = 1; // to the right
        if (output[1] > threshold && output[1] > output[7])
            y = -1; // up
        if (output[7] > threshold && output[7] > output[1])
            y = 1; // down
        let move = new Move(x, y);
        let result = [move, 0];
        return result;
    }
}
