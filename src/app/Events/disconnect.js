import Game from "../Entities/Game.js"
import gameStatusUpdate from "./game-status-update.js"

export default function disconect(socket) {
    const player = Game.findPlayerBySocket(socket.id)

    if (!player) {
        return
    }
    
    Game.disconectPlayer(player)
    gameStatusUpdate(io, {
        action: ["disconect"],
        data: player.socketID
    })
}