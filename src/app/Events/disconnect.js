import Players from "../Entities/Player.js"
import gameStatusUpdate from "./game-status-update.js"

export default function disconect(socket) {
    const player = Players.findBySocket(socket.id)

    if (!player) {
        return
    }
    
    Players.disconect(player)
    gameStatusUpdate(io)
}