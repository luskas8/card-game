import { Server } from "socket.io"
import Game from "../Game/index.js"

/**
 * @param {Server} io
 */
export default function gameStatusUpdate(io) {
    const status = Game.game
    io.emit('game-status-update', status)
}