import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import * as path from "path";
import {Network} from "./Network";

let app = express();
let server = new http.Server(app);
let io = socketIo(server);

app.use(express.static(path.join(__dirname, "..", "..", "cli", "dist")));

let network = new Network();

io.on('connection', (socket) => {
    network.addConnection(socket);
} );

server.listen(8080, () => {
    console.log('listening on localhost:8080');
} );
