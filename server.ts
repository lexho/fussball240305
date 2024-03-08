import express, { Request, Response } from 'express';
import { Board } from './board.js' 

const app = express();

app.get('/', (req: Request, res: Response): void => {
    let board : Board = new Board();
    let boardstr = board.toString();
    //_res.send(board.toString());
    res.send("<textarea style=\"width: 1000px; height: 800px;\">" + boardstr + "</textarea>");
})

app.listen(8080, ():void => {
    console.log("server is listening on http://localhost:8080/")
})