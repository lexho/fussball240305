export class Move {
    x : number = 0;
    y : number = 0;
    constructor(x : number,y : number){
        this.x =x ; this.y = y;
    }

    toString() {
        return `${this.x}/${this.y}`;
    }
}