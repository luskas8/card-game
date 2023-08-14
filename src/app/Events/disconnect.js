import Players from "../Game/Player.js"
import Game from "../Game/index.js"
import logger from "../logger.js"

export default function disconect(socket, io) {
    logger.warn(`Socket disconnected: ${socket.id}`)
    Players.disconect(socket.id)
}