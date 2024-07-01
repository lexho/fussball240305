import express from 'express';
import { Board } from './board.js';
import { RandomSearch } from './search/randomSearch.js';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
//app.set('view engine', 'ejs');
let board = new Board();
app.get('/', (req, res) => {
    //board.makeMove(new Move(0,0));
    //let minmaxsearch = new MinMaxSearch(4);
    //let movescore = minmaxsearch.search(board, 4);
    //let bmove = movescore[0]; //.move
    let randomsearch = new RandomSearch(Date.now());
    let bmove = randomsearch.search(board)[0];
    board.makeMove(bmove);
    //_res.send(board.toString());
    //res.send("<textarea style=\"width: 1000px; height: 800px;\">" + boardstr + "</textarea>");
    //res.render('fussballfeld');
    res.redirect('/fussballfeld.html');
});
app.get('/data', (req, res) => {
    //board.makeMove(new Move(0,0));
    //let minmaxsearch = new MinMaxSearch(4);
    //let movescore = minmaxsearch.search(board, 4);
    //let bmove = movescore[0]; //.move
    let randomsearch = new RandomSearch(Date.now());
    for (let i = 0; i < board.players.players.length; i++) {
        let bmove = randomsearch.search(board)[0];
        board.makeMove(bmove);
    }
    //_res.send(board.toString());
    //res.send("<textarea style=\"width: 1000px; height: 800px;\">" + boardstr + "</textarea>");
    //res.render('fussballfeld', {players: board.players.players});
    let list = [];
    for (let player of board.players.players) {
        //str += player.pos.x + "/" + player.pos.y + ", ";
        //list.push(player.toString()); // + ", ";
        list.push(player.getObject());
    }
    console.log(list);
    //str += "]"
    //res.send(board.players);
    //res.json(str);
    // should return string representation usable for json
    /*console.log(JSON.stringify(board.players));
    console.log(JSON.stringify(board.ball));*/
    /*console.log(board.players);
    console.log(board.ball);*/
    //console.log(board.players.toString());
    //console.log(board.ball.toString());
    //console.log(board.ball.toString());
    //const response = {"data" : str, "ball" : { "x": board.ball.pos.x, "y": board.ball.pos.y}};
    //const response = {"data" : str, "ball" : board.ball.toString()};
    //const response = {"players" : list, "ball" : {"x" : board.ball.x, "y" : board.ball.y}};
    const response = { "players": list, "ball": board.ball.getObject() };
    res.json(response);
});
app.listen(8080, () => {
    console.log("server is listening on http://localhost:8080/");
});
