import { Socket } from "socket.io";

import logger from "../Entities/Logger.js";
import Game from "../Entities/Game.js";

import newConnection from "./new-connection.js";
import disconnect from "./disconnect.js";
import chooseCharacter from "./choose-character.js";
import startGame from "./start-game.js";

/**
 * @param {Socket} socket
 * @param {Game} game
 */
export default function mainEvent(socket, game) {
    socket.on("new-connection", (data) => {
        newConnection(socket, data, game);
    });

    socket.on("disconnect", () => {
        disconnect(socket, game);
    });

    socket.on("choose-character", (data) => {
        chooseCharacter(socket, data, game);
    });

    socket.on("start-game", () => {
        startGame(socket, game);
    });

    socket.on("error", (err) => {
        logger.error(`Socket error: ${err}`);
    });
}
