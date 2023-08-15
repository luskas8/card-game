import { Server, Socket } from "socket.io";
import Game from "../Game";
import logger from "../logger";

/**
 * @param {Socket} socket 
 * @param {Server} io
 */
export default function gameStatus(socket, io) {
    const status = Game.gameStatus()

    if (Game.hostSocketId === socket.id) {
        status.host = true
    }
    socket.emit('game-status-update', status)
}