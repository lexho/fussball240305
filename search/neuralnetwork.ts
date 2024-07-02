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
    x = 0; y = this.board.feld.feld_height/2;
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length + x; // the '1'
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length + x; // the '1'
    input1[p] = 1; input1[b] = 1;

    let input2 = input;
    // set player and ball position
    x = 4; y = this.board.feld.feld_height/2;
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length + x; // the '1'
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length + x; // the '1'
    input2[p] = 1; input2[b] = 1;

    let input3 = input;
    // set player and ball position
    x = this.board.feld.feld_length; y = this.board.feld.feld_height/2;
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length + x; // the '1'
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length + x; // the '1'
    input3[p] = 1; input3[b] = 1;

    let input4 = input;
    // set player and ball position
    x = this.board.feld.feld_length - 6; y = this.board.feld.feld_height/2;
    x /= this.FACTOR; y /= this.FACTOR;
    p = y * this.board.feld.feld_length + x; // the '1'
    x = this.board.ball.x; y = this.board.ball.y;
    x /= this.FACTOR; y /= this.FACTOR;
    b = y * this.board.feld.feld_length + x; // the '1'
    input4[p] = 1; input4[b] = 1;

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
    ]);
  }

    private search0(board : Board, depth: number) {
    // board --> neural net input matrix
    let x = Math.round(board.players.currentPlayer.getPosition().x / this.FACTOR);
    let y = Math.round(board.players.currentPlayer.getPosition().y / this.FACTOR);
    let ball_x = board.ball.x / this.FACTOR;
    let ball_y = board.ball.y / this.FACTOR;
    console.log(`player: ${x}/${y}, ball ${x}/${y}`)
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
      console.log(`output ${output_rounded}`);
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
      y = 0
      if(output[3] > 0.45) x = -1 // to the left
      if(output[5] > 0.45) x = 1 // to the right

      let move = new Move(x,y);
      let result: [Move, number] = [move,0]
            return result
    }
    }