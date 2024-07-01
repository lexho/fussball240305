import { Board } from './board.js';
import { NeuralNetworkSearch } from './search/neuralnetwork.js';
let board;
let neuralnetworksearch;
board = new Board(11);
board.print();
neuralnetworksearch = new NeuralNetworkSearch(0);
neuralnetworksearch.train();
let movescore = neuralnetworksearch.search(board.copy(), 0); // suchtiefe ist abhängig von der anzahl der spieler
let bmove = movescore[0]; //.move
console.log(`neural network  bestmove: ${bmove.x}/${bmove.y} score: ${movescore[1]}`);
//board.makeMove(bmove);
//board.print();
