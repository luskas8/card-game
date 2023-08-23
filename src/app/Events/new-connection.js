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
    const response = await newConnectionUseCase(socket.id, io, data)

    if (response instanceof Error) {
        socket.emit('new-connection-error', {
            error: response.message,
        })
        return
    }

    if (io.engine.clientsCount >= 3) {
        Game.updateState(GameStates.WAITING_HOST)
        io.emit(Game.currentState, {
            status: Game.currentState,
        })
        return
    }

    socket.emit('new-connection-success', {
        status: response.message,
    })

    gameStatusUpdate(io)
}
