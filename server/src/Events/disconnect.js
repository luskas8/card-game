import { Socket } from "socket.io";
import Game from "../Entities/Game.js";
import gameStatusUpdate from "./game-status-update.js";

/**
 * @param {Socket} socket
 * @param {Game} game
 */
export default function disconnect(socket, game) {
    const playerId = socket.id;

    if (game.findPlayerById(playerId)) {
        if (game.disconnectPlayer(playerId)) {
            if (game.didGameStart && game.players.length < game.MIN_PLAYERS) {
                game.reset();
                gameStatusUpdate(socket, {
                    action: "update-game",
                    data: game.summary,
                })
                return
            }

            gameStatusUpdate(socket, {
                action: "update-game",
                data: { players: game.summary.players, hostId: game.hostId },
            });
        }
    }
}
