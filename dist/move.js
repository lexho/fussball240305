export class Move {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    toString() {
        return `${this.x}/${this.y}`;
    }
}
