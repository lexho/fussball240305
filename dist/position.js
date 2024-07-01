export class Position {
    constructor(x, y) { this.x = x; this.y = y; }
    plus(m) {
        let x = this.x + m.x;
        let y = this.y + m.y;
        return new Position(x, y);
    }
}
