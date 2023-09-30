import Game from "../Entities/Game.js";
import gameStatusUpdate from "./game-status-update.js";

export default function disconnect(socket) {
    const player = Game.findPlayerBySocket(socket.id);

    if (!player) {
        return;
    }

    Game.disconnectPlayer(player);
    gameStatusUpdate(io, {
        action: ["disconnect"],
        data: player.socketID,
    });
}
