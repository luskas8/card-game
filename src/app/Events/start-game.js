import { Server, Socket } from "socket.io";
import { Error } from "../../../config/Responses";
import startGameUseCase from "../UseCases/startGameUseCase";
import gameStatusUpdate from "./game-status-update";
import newRound from "./new-round";

/**
 * @param {Socket} socket 
 * @param {Server} io
 * @returns {Promose<boolean>}
 */
export default async function startGame(socket, io) {
    const result = await startGameUseCase(socket.id)
    if (result instanceof Error) {
        socket.emit("start-game-error", {message: result.message })
        return false
    }

    newRound(socket, io)

    gameStatusUpdate(io)
    return true
}