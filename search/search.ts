import { RandomSearch } from './randomSearch'
import { Board } from '../board'
import { Move } from '../move'

/*export function search(algorithm, limit : number) {
    depth_limit = limit;
    return algorithm();
}*/
/*export function search(algorithm, limit : number) {
    depth_limit = limit;
    //algorithm(board, 0);
    return algorithm();
}*/

export interface Search {
    depth_limit : number; // = 0;
    //search : Search;

/*constructor(limit : number) {
    this.depth_limit = limit;
    //this.search = search;
    //return search.search(board, 0);
}*/
    search(board : Board, depth_limit: number) : [Move, number]

/*search(board : Board, depth: number) {
    this.search.search(board, depth);
}*/
}

//let search = new Search();
//search.search(new Board(), new RandomSearch(Date.now()), 1);

export class Search {
    depth_limit : number = 0;

    constructor(limit : number) {
        this.depth_limit = limit;
        //this.search = search;
        //return search.search(board, 0);
    }
}