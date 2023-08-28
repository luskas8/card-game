import { Server } from "socket.io"
import Game from "../Entities/Game.js"

/**
 * @param {Server} io
 */
export default function gameStatusUpdate(io, data) {
    if (data === "all") {
        io.emit('game-status-update', Game.game)
        return
    }
    io.emit('game-status-update', data)
}