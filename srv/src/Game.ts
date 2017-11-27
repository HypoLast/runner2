import {opts} from "./common/dungeonOpts";
import {DunGen} from "./common/DunGen";
import {Player} from "./Player";

export class Game {

    public numPlayers = 0;
    public players: { [id: string]: Player } = {};

    public dungeon = DunGen(opts);

    public addPlayer(id: string): number {
        if (this.players[id] !== undefined) throw "Duplicate player";
        let startRoom = this.dungeon.rooms[0];
        let player = new Player(startRoom.x + startRoom.width, startRoom.y + startRoom.height);
        this.players[id] = player;
        this.numPlayers ++;
        return this.numPlayers;
    }

    public removePlayer(id: string) {
        if (this.players[id] === undefined) throw "Cannot remove missing player";
        delete this.players[id];
        this.numPlayers --;
        return this.numPlayers;
    }
}