import { Server, Socket } from "socket.io"
import logger from "../logger.js"
import chooseCharacter from './choose-character.js'
import disconect from './disconect.js'
import gameStatusUpdate from "./game-status-update.js"
import newConnection from "./new-connection.js"
import startGame from "./start-game.js"

/**
 * @param {Socket} socket 
 * @param {Server} io 
 */
export default function mainEvent(socket, io) {
    socket.on('new-connection', async function (data) {
        await newConnection(socket, io, data)
    })

    socket.on('disconect', () => {
        disconect(socket, io)
    })

    socket.on('game-status-request', () => {
        gameStatusUpdate(io)
    })

    socket.on('choose-character', async (data) => {
        await chooseCharacter(socket, io, data)
    })

    socket.on('start-game', async () => {
        await startGame(socket, io)
    })

    socket.on('error', (err) => {
        logger.error(`Socket error: ${err}`)
    })
}