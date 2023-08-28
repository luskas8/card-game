import { Server, Socket } from "socket.io"
import { Error } from "../../../config/Responses.js"
import Game, { GameStates } from "../Entities/Game.js"
import newConnectionUseCase from '../UseCases/newConnectionUseCase.js'
import gameStatusUpdate from "./game-status-update.js"

/**
 * @param {Socket} socket
 * @param {Server} io
 * @param {Object} data
 * @param {string} data.name
 */
export default async function newConnection(socket, io, data) {
    const newConnectionResponse = await newConnectionUseCase(socket.id, io, data)
    if (newConnectionResponse instanceof Error) {
        socket.emit('new-connection-error', {
            error: newConnectionResponse.message,
        })
        return
    }

    const chooseCharacterResponse = await chooseCharacterUseCase(socket.id, data)
    if (chooseCharacterResponse instanceof Error) {
        logger.error(response)
        socket.emit("choose-character-error", { error: chooseCharacterResponse.message })
        return false
    }

    if (io.engine.clientsCount >= 3) {
        Game.updateState(GameStates.WAITING_HOST)
        io.emit(Game.currentState, {
            status: Game.currentState,
        })
        return
    }

    socket.emit('new-connection-success', {
        status: 201,
        message: "You are connected and choosed your character",
    })

    gameStatusUpdate(io)
}
