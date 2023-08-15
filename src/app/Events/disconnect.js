import Players from "../Game/Player.js"

export default function disconect(socket) {
    Players.disconect(socket.id)
}