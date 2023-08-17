import { Server, Socket } from "socket.io"
import Game from "../Game/index.js"

/**
 * @param {string} socketID
 * @param {Server} io
 */
export default function gameStatusUpdate(socketID, io) {
    const status = Game.gameStatus()

    if (Game.hostSocketId === socketID) {
        status.host = true
    }
    io.emit('game-status-update', status)
}