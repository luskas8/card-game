import { Server, Socket } from "socket.io";
import { Error } from "../Core/utils.js";
import startGameUseCase from "../UseCases/startGameUseCase.js";
import gameStatusUpdate from "./game-status-update.js";
import newRound from "./new-round.js";

/**
 * @param {Socket} socket
 * @param {Server} io
 * @returns {Promose<boolean>}
 */
export default async function startGame(socket, io) {
    const result = await startGameUseCase(socket.id);
    if (result instanceof Error) {
        socket.emit("start-game-error", { message: result.message });
        return false;
    }

    newRound(socket, io);

    gameStatusUpdate(io, {
        action: ["start-game"],
    });
    return true;
}
