import { Server, Socket } from "socket.io";
import Game from "../Game";
import logger from "../logger";

/**
 * @param {Socket} socket 
 * @param {Server} io
 */
export default function gameStatus(socket, io) {
    socket.emit('game-status-success', Game.gameStatus())
}