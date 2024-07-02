import brain from 'brain.js'
import { Move } from '../move.js'
import { Board } from '../board.js'
import { Search } from '../search/search.js'

export class NeuralNetworkSearch extends Search implements Search {
    
    constructor(limit : number) {
        super(limit);
        this.depth_limit = limit;
        console.log(`input neurons: ${this.IN}\nhidden layer: ${this.HIDDEN}\noutput neurons: 9`);
    }
    
    search(board : Board, depth_limit : number = this.depth_limit) {
        this.depth_limit = depth_limit;
        return this.search0(board, 0);
    }

    board = new Board();
    FACTOR = 16;
    IN = this.board.feld.feld_length * this.board.feld.feld_height / this.FACTOR;
    HIDDEN = Math.round(this.board.feld.feld_length * this.board.feld.feld_height / this.FACTOR / 3);

    // provide optional config object (or undefined). Defaults shown.
    config = {
      binaryThresh: 0.5, // ¯\_(ツ)_/¯
      hiddenLayers: [this.HIDDEN], // array of ints for the sizes of the hidden layers in the network
      activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
    };
  
  // create a simple feed forward neural network with backpropagation
  net = new brain.NeuralNetwork(this.config);
  
  public train() {
    // generate training data
    console.log("train neural net with generated training data")

    this.board = new Board();
    let input = [];
    for (let i = 1; i <= this.IN; i++) {
        input.push(0);
    }

    let x = 0; let y = 0;
    let p = 0; let b = 0;

    let input1 = input;
    // set player and ball position
    x = 0; y = Math.round(this.board.feld.feld_height/2);
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length/this.FACTOR + x; // player left side in the middle of the board
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length/this.FACTOR + x; // ball in the center
    input1[p] = 1; input1[b] = 1; // the '1' is the position of the player/ball

    let input2 = input;
    // set player and ball position
    x = 33; y = Math.round(this.board.feld.feld_height/2);
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length/this.FACTOR + x; // player left side in the middle of the board
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length/this.FACTOR + x; // ball in the center
    input2[p] = 1; input2[b] = 1; // the '1' is the position of the player/ball

    let input3 = input;
    // set player and ball position
    x = this.board.feld.feld_length; y = Math.round(this.board.feld.feld_height/2);
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length/this.FACTOR + x; // player right side in the middle of the board
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length/this.FACTOR + x; // ball in the center
    input3[p] = 1; input3[b] = 1; // the '1' is the position of the player/ball

    let input4 = input;
    // set player and ball position
    x = this.board.feld.feld_length - 33; y = Math.round(this.board.feld.feld_height/2);
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length/this.FACTOR + x; // player right side in the middle of the board
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length/this.FACTOR + x; // ball in the center
    input4[p] = 1; input4[b] = 1; // the '1' is the position of the player/ball

    let input5 = input;
    // set player and ball position
    x = this.board.feld.feld_length/2; y = 0;
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length/this.FACTOR + x; // player at the the top of the board
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length/this.FACTOR + x; // ball in the center
    input5[p] = 1; input5[b] = 1; // the '1' is the position of the player/ball

    let input6 = input;
    // set player and ball position
    x = this.board.feld.feld_length/2; y = this.board.feld.feld_height;
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length/this.FACTOR + x; // player in the bottom of the board
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length/this.FACTOR + x; // ball in the center
    input6[p] = 1; input6[b] = 1; // the '1' is the position of the player/ball

    this.net.train([
        {
            input: 
            input1,
            output: [
                0,0,0,
                0,0,1,
                0,0,0],
            },
        {
            input: 
            input2,
            output: [
                0,0,0,
                0,0,1,
                0,0,0],
        },
        {
            input: 
            input3,
            output: [
                0,0,0,
                1,0,0,
                0,0,0],
        },
        {
            input: 
            input4,
            output: [
                0,0,0,
                1,0,0,
                0,0,0],
        },
        {
            input: 
            input5,
            output: [
                0,0,0,
                0,0,0,
                0,1,0],
        },
        {
            input: 
            input6,
            output: [
                0,1,0,
                0,0,0,
                0,0,0],
        },
    ]);
  }

    private search0(board : Board, depth: number) {
    // board --> neural net input matrix
    let x = Math.round(board.players.currentPlayer.getPosition().x / this.FACTOR);
    let y = Math.round(board.players.currentPlayer.getPosition().y / this.FACTOR);
    let ball_x = Math.round(board.ball.x / this.FACTOR);
    let ball_y = Math.round(board.ball.y / this.FACTOR);
    console.log(`player: ${x}/${y}, ball ${ball_x}/${ball_y}`)
    let array1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let input = [];
    for (let i = 1; i <= this.IN; i++) {
        input.push(0);
    }
    let p = y * board.feld.feld_length + x; // the '1'
    let b = ball_y * board.feld.feld_length + ball_x; // the '1'
    input[p] = 1; input[b] = 1;
        /*let output = this.net.run([
        0, 0, 1, 0, 0, // ball
        0, 0, 0, 0, 1, // player
      ]);*/
      let output = this.net.run(input);
      //console.log(`output ${output}`);
      let output_rounded = [];
      for(let o of output) {
        output_rounded.push(Math.round(o*1000)/1000)
      }
      //console.log(`output ${output_rounded}`);
      console.log(`${output_rounded[0]}\t${output_rounded[1]}\t${output_rounded[2]}`)
      console.log(`${output_rounded[3]}\t${output_rounded[4]}\t${output_rounded[5]}`)
      console.log(`${output_rounded[6]}\t${output_rounded[7]}\t${output_rounded[8]}`)
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
      x = 0, y = 0
      const threshold = 0.1;
      if(output[3] > output[5]) x = -1 // to the left
      if(output[5] > output[3]) x = 1 // to the right
      if(output[1] > output[7]) y = -1 // up
      if(output[7] > output[1]) y = 1 // down

      let move = new Move(x,y);
      let result: [Move, number] = [move,0]
            return result
    }
    }