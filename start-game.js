import { Server, Socket } from "socket.io";
import { Error } from "../../../config/Responses";
import chooseKillerUseCase from "../UseCases/chooseKillerUseCase";
import startGameUseCase from "../UseCases/startGameUseCase";
import gameStatusUpdate from "./game-status-update";

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

    const choosedKiller = await chooseKillerUseCase()
    if (!choosedKiller) {
        return Error.message("All players was killer or game not started")
    }

    io.sockets.sockets.get(choosedKiller.socketID).emit("killer-choosed", { message: "You are the killer" }) // TODO: ter um evento de atuazlizar o status, apenas
    // io.emit("game-started", { sender: "server" })
    gameStatusUpdate(io)
    return true
}