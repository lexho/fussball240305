import { Grid } from './layout.js';
import { Board } from './board.js';
export function pseudoRandom(seed) {
    let value = seed;
    return function (max) {
        value = value * Math.random() * 100 * 16807 % 2147483647;
        value = value % 100 / 100;
        return Math.floor(value * max);
    };
}
let generator = pseudoRandom(1);
export function possibleMovesVisualizer(board) {
    let moves = board.getPossibleMoves();
    let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 9; i++) {
        grid[i] = 0;
    }
    //console.log("move matrix");
    let n = 1;
    for (let move of moves) {
        //console.log(`${move.x}/${move.y}`)
        let n1 = n;
        //console.log((move.y+1) * 3 + (move.x+1));
        grid[(move.y + 1) * 3 + (move.x + 1)] = n;
        n++;
    }
    //console.log(grid);
    let str = "";
    for (let i = 0; i < 9; i += 3) {
        let field1 = grid[i];
        let field2 = grid[i + 1];
        let field3 = grid[i + 2];
        console.log(field1 + " " + field2 + " " + field3);
        str += field1 + " " + field2 + " " + field3;
    }
    console.log(str);
    // table
    str = "moveNr\tmove\tscore\tplayer\tsuchtiefe\n";
    n = 1;
    for (let move of moves) {
        let copy = board.copy();
        copy.makeMove(move);
        str += n + "\t" + move.toString() + "\t" + copy.getScore() + "\t" + board.players.currentPlayer.id + "\t1" + "\n";
        n++;
    }
    console.log(str);
}
export function getTable(board) {
    // table
    let moves = board.getPossibleMoves();
    let str = "moveNr   move  score player suchtiefe\n";
    let n = 1;
    for (let move of moves) {
        let copy = board.copy();
        copy.makeMove(move);
        // springe zur entsprechenden stelle
        // und füll das dazwischen mit nullen
        //str += schreibeWort(n, 0);
        str += schreibeWort(n.toString(), 6);
        str += schreibeWort(move.toString(), 7);
        str += schreibeWort(copy.getScore().toString(), 7);
        str += schreibeWort(board.players.currentPlayer.id.toString(), 7);
        str += schreibeWort("1", 10);
        str += "\n";
        n++;
        //if(n==2) break;
    }
    //console.log(str);
    return str;
}
export function getTableWithAutomaticSpaltenbreite(board) {
    // table
    let moves = board.getPossibleMoves();
    let headline = ["moveNr", "move", "score", "player", "suchtiefe"];
    let columns = [];
    // heading
    for (let i = 0; i < headline.length; i++) {
        columns[i] = [];
        columns[i].push(headline[i]);
    }
    //columns[0].push("moveNr");  columns[1].push("moveNr");  columns[2].push("moveNr");  columns[3].push("moveNr");  columns[4].push("moveNr");
    // data
    let n = 1;
    for (let i = 0; i < moves.length; i++) {
        columns[0].push(n.toString());
        n++;
    }
    for (let row = 0; row < moves.length; row++) {
        columns[1].push(moves[row].toString());
        let copy = board.copy();
        copy.makeMove(moves[row]);
        columns[2].push(copy.getScore().toString());
        columns[3].push(board.players.currentPlayer.id.toString());
        columns[4].push("1");
    }
    let l = [];
    l.push(dieBreitesteSpalte(columns[0])); // erste spalte anders
    for (let i = 1; i < columns.length; i++) {
        l.push(dieBreitesteSpalte(columns[i]) + 1);
        //console.log(`${l}`)
    }
    /*for(let i = 1; i < columns.length; i++) {
     console.log(columns[i])
    }*/
    let str = ""; // the final string
    for (let j = 0; j < moves.length; j++) {
        let move = moves[j];
        let copy = board.copy();
        copy.makeMove(move);
        for (let i = 0; i < columns.length; i++) {
            //console.log(columns[i][j]);
            // i. spalte j. wort    gehe alle spalten durch, nehme das j. Wort
            str += schreibeWort(columns[i][j], l[i]);
        }
        str += "\n";
        n++;
    }
    //console.log(str);
    return str;
}
let board = new Board();
let moves = board.getPossibleMoves();
//possibleMovesVisualizer(board);
function schreibeWort(wort, spaltenbreite) {
    // 
    //str0.length+?==
    let str = "";
    //let w = 0;
    //for(let i = str0.length; i < target_cursor-str0.length; i++) { str += " " }
    //str += wort;
    //let strlaenge = laenge
    for (let i = 0; i < spaltenbreite - wort.length; i++) {
        str += " ";
    }
    //for(let i = str.length; i < laenge; i++) { str += " " }
    str += wort;
    return str;
}
export function getMoveMatrix() {
    let moves = board.getPossibleMoves();
    let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let str = "";
    for (let i = 0; i < 9; i++) {
        grid[i] = 0;
    }
    //console.log("move matrix");
    let n = 1;
    for (let move of moves) {
        //console.log(`${move.x}/${move.y}`)
        let n1 = n;
        //console.log((move.y+1) * 3 + (move.x+1));
        grid[(move.y + 1) * 3 + (move.x + 1)] = n;
        n++;
    }
    //console.log(grid);
    for (let i = 0; i < 9; i += 3) {
        let field1 = grid[i];
        let field2 = grid[i + 1];
        let field3 = grid[i + 2];
        str += field1 + "" + field2 + "" + field3;
        ;
    }
    return str;
}
let grid = new Grid(80, 10, false);
board = new Board();
function dieBreitesteSpalte(worte) {
    let max_length = Number.NEGATIVE_INFINITY;
    for (let wort of worte) {
        let wo = wort.toString();
        //console.log(`${wo.length}`)
        if (wo.length > max_length)
            max_length = wo.length;
    }
    return max_length;
}
board.makeMove(board.getPossibleMoves()[0]);
grid = new Grid(80, 10, false);
//grid.drawTextRectangle(1,2,3,3, "000000000");
grid.drawTextRectangle(1, 0, 11, 1, "move matrix");
grid.drawTextRectangle(1, 1, 3, 3, getMoveMatrix());
//grid.drawTextRectangle(25,0,80,10, getTable(board).toString());
grid.drawTextRectangle(25, 0, 80, 10, getTableWithAutomaticSpaltenbreite(board).toString());
//grid.drawTextRectangle(3,4,80,10, "moveNr       mov");
//grid.drawTextRectangle(3,2,80,10, "text text");
//console.log("---------------------")
//grid.draw();
//console.log("---------------------")
