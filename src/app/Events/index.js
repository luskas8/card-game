import { Server, Socket } from "socket.io"
import logger from "../logger.js"
import chooseCharacter from './choose-character.js'
import disconnect from './disconnect.js'
import gameStatusUpdate from "./game-status-update.js"
import newConnection from "./new-connection.js"

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

    socket.on('game-status-request', () => {
        gameStatusUpdate(io)
    })

    socket.on('choose-character', async (data) => {
        await chooseCharacter(socket, io, data)
    })

    socket.on('error', (err) => {
        logger.error(`Socket error: ${err}`)
    })
}