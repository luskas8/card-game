import { Socket } from "socket.io";

/**
 * @param {Socket} socket
 */
export default function gameStatusUpdate(socket, data) {
    socket.broadcast.emit("game-status-update", data);
}
