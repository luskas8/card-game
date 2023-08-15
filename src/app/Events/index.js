import { Server, Socket } from "socket.io";
import logger from "../logger.js";
import disconnect from './disconnect.js';
import gameStatus from './game-status.js';
import newConnection from "./new-connection.js";

/**
 * @param {Socket} socket 
 * @param {Server} io 
 */
export default function mainEvent(socket, io) {
    socket.on('new-connection', function (data) {
        newConnection(socket, io, data)
    })

    socket.on('disconnect', () => {
        disconnect(socket, io)
    })

    socket.on('game-status', () => {
        gameStatus(socket, io)
    })

    socket.on('error', (err) => {
        logger.error(`Socket error: ${err}`)
    })
}