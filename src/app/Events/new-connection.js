import { Server, Socket } from "socket.io";

import { Error } from "../Core/utils.js";

import Game from "../Entities/Game.js";
import logger from "../Entities/Logger.js";

import newConnectionUseCase from "../UseCases/newConnectionUseCase.js";

import gameStatusUpdate from "./game-status-update.js";

/**
 * @param {Socket} socket
 * @param {Server} io
 * @param {Object} data
 * @param {Game} game
 * @returns {boolean}
 */
export default function newConnection(socket, data, game) {
    const playerId = socket.id;

    const response = newConnectionUseCase(playerId, data, game);

    const emitData = { success: true };

    if (response instanceof Error) {
        logger.error(response);
        emitData.success = false;
        emitData.error = response.message;
    } else {
        const { summary } = game;

        emitData.game = summary;
        gameStatusUpdate(socket, {
            action: "update-players",
            data: { playerId, name: data.name },
        });
    }

    socket.emit("new-connection", emitData);
}
