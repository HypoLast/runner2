import {Game} from "./Game";

export class Network {

    public sockets: SocketIO.Socket[] = [];
    public game?: Game;

    public addConnection(socket: SocketIO.Socket) {
        if (!this.game) this.game = new Game();
        this.sockets.push(socket);
        console.log("connection added " + socket.id);
        this.game.addPlayer(socket.id);
        socket.emit("init", {
            id: socket.id,
            map: this.game.dungeon.seed,
        } );
        socket.on("disconnect", () => {
            this.sockets.splice(this.sockets.indexOf(socket), 1);
            socket.removeAllListeners();
            if (this.game && this.game.removePlayer(socket.id) === 0) this.game = undefined;
            console.log("connection removed " + socket.id);
        } );
    }
}