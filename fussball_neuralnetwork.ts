import brain from 'brain.js';
import { Board } from './board.js';
import { Move } from './move.js';
import { Ball } from './ball.js';
import { NeuralNetworkSearch} from './search/neuralnetwork.js'
let board : Board;
let neuralnetworksearch : NeuralNetworkSearch;

board = new Board(1);
board.print();

neuralnetworksearch = new NeuralNetworkSearch(0);
neuralnetworksearch.train();

for(let i = 0; i < 30; i++) {
let movescore = neuralnetworksearch.search(board.copy(), 0); // suchtiefe ist abhängig von der anzahl der spieler
let bmove = movescore[0]; //.move
console.log(`neural network  bestmove: ${bmove.x}/${bmove.y} score: ${movescore[1]}`);
console.log();

board.makeMove(bmove);
}

board.print();