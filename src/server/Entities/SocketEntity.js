import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import Game from "./Game.js";
import mainEvent from "../Events/index.js";
import logger from "./Logger.js";

class Socket {
    /** @type {Server} */ _io;
    constructor() {
        this._io = null;
    }

    /**
     * @param {HttpServer} server
     * @param {Game} game
     * */
    init(server, game) {
        if (this._io) {
            return this._io;
        }

        this._io = new Server(server);

        this._io.on("connection", (socket) => {
            logger.info(`Socket connected: ${socket.id}`);
            mainEvent(socket, game);
        });

        return this._io;
    }

    get io() {
        return this._io;
    }
}

export default new Socket();
