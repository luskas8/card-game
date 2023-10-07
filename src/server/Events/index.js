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
        console.log(`> "new-connection: ${JSON.stringify(game.summary)}`);
    });

    socket.on("disconnect", () => {
        disconnect(socket, game);
        console.log(`> "disconnect": ${JSON.stringify(game.summary)}`);
    });

    socket.on("reconnect", (data) => {        
        new Promise((resolve) => {
            newConnection(socket, data, game);
            resolve();
        }).then(() => {
            chooseCharacter(socket, data, game);
        }).finally(() => {
            console.log(`> "reconnect": ${JSON.stringify(game.summary)}`);
        });
        
    })

    socket.on("choose-character", (data) => {
        chooseCharacter(socket, data, game);
        console.log(`> "choose-character: ${JSON.stringify(game.summary)}`);
    });

    socket.on("start-game", () => {
        startGame(socket, game);
        console.log(`> "start-game: ${JSON.stringify(game.summary)}`);
    });

    socket.on("error", (err) => {
        logger.error(`Socket error: ${err}`);
        console.log(`> "error": ${JSON.stringify(game.summary)}`);
    });
}
