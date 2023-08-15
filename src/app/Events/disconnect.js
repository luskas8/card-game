import Players from "../Game/Player.js"

export default function disconect(socket) {
    const player = Players.findBySocket(socket.id)

    if (!player) {
        return
    }
    
    Players.disconect(player)
}