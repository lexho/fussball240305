import { Player } from './player.js'

export class Players {
    players : Player[] = [];
    currentPlayer : Player;
    prevPlayer : Player;
    index : number;
    constructor(players : Player[]) {
        this.players = players;
        this.currentPlayer = this.players[0];
        this.index = 0;
        this.prevPlayer = this.players[(this.index % this.players.length - 1)];
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    next() {
        this.index++;
        this.currentPlayer = this.players[this.index % this.players.length];
        this.prevPlayer = this.players[this.index % this.players.length - 1]
    }
}