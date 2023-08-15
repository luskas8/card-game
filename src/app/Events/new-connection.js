import { Server, Socket } from "socket.io";
import Game, { GameStates } from "../Game/index.js"

/**
 * @param {Socket} socket 
 * @param {Server} io
 * @param {Object} data
 * @param {string} data.name
 */
export default function newConnection(socket, io, data) {
    if (io.engine.clientsCount >= 6) {
        socket.emit('new-connection-error', {
            error: 'Game is full'
        })
        return
    }

    if (!data || !data.name) {
        socket.emit('new-connection-error', {
            error: 'Invalid data'
        })
        return
    }

    if (Game.players.player(data.name)) {
        socket.emit('new-connection-error', {
            error: 'Name already in use'
        })
        return
    }

    const isHost = io.engine.clientsCount === 1 && Game.hostSocketId === ''

    const response = Game.players.add(data.name, socket.id, {
        isHost: isHost
    })

    if (response !== 'success') {
        socket.emit('new-connection-error', {
            error: response,
        })
        return
    }

    if (isHost) {
        Game.hostSocketId = socket.id
    }

    socket.emit('new-connection-success', {
        gameStatus: Game.gameStatus(),
    })

    if (io.engine.clientsCount >= 3) {
        Game.updateState(GameStates.WAITING_HOST)
        io.emit(Game.currentState, {
            status: Game.currentState(),
        })
        return
    }
}
