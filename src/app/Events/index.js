import { Server, Socket } from "socket.io";
import newConnection from "./new-connection.js";
import disconnect from './disconnect.js'
import logger from "../logger.js";

/**
 * @param {Socket} socket 
 * @param {Server} io 
 */
export default function mainEvent(socket, io) {
    socket.on('new-connection', function (data) {
        newConnection(socket, io, data)
    })

    socket.on('disconnect', () => {
        logger.warn(`Socket disconnected: ${socket.id}`)
        disconnect(socket, io)
    })

    socket.on('error', (err) => {
        logger.error(`Socket error: ${err}`)
    })
}