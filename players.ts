import { Player } from './player'

export class Players {
    players : Player[] = [];
    currentPlayer : Player;
    prevPlayer : Player;
    index : number;
    constructor(players : Player[]) {
        this.players = players;
        this.currentPlayer = this.players.at(0);
        this.index = 0;
        this.prevPlayer = this.players.at(this.index % this.players.length - 1)
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    next() {
        this.index++;
        this.currentPlayer = this.players.at(this.index % this.players.length);
        this.prevPlayer = this.players.at(this.index % this.players.length - 1)
    }
}