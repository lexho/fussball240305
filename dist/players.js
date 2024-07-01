export class Players {
    constructor(players) {
        this.players = [];
        //console.log("constr")
        this.players = players;
        this.currentPlayer = this.players[0];
        this.index = 0;
        this.prevPlayer = this.players[(this.index % this.players.length - 1)];
    }
    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }
    next() {
        //console.log(`next current ID: ${this.currentPlayer.id}`);
        let testid = this.currentPlayer.id;
        this.index++;
        if (this.index == this.players.length)
            this.index = 0;
        //this.currentPlayer = this.players[this.index % this.players.length];
        //this.prevPlayer = this.players[this.index % this.players.length - 1]
        //this.currentPlayer = this.players[this.index];
        this.currentPlayer = this.players[this.index];
        //console.log(`prev ID: ${testid} current ID: ${this.currentPlayer.id}`);
    }
    toString() {
        let str = "";
        for (let player of this.players) {
            str += player + ", ";
        }
        return `${str}`;
    }
}
