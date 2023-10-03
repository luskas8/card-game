import { Error, Success } from "../Core/utils.js";
import Game from "../Entities/Game.js";

/**
 * @param {string} playerId
 * @param {Object} data
 * @param {string} data.name
 * @param {Game} game
 * @returns {Promise<Error|Success>}
 */
export default function newConnection(playerId, data, game) {
    if (game.players.length >= game.maxPlayers) {
        return Error.forbidden("Game is full");
    }

    if (!data || !data.name) {
        return Error.badRequest("Name is required");
    }

    try {
        if (game.addPlayer(data.name, playerId)) {
            return Success.created();
        }

        throw new Error("Could not add player");
    } catch (error) {
        return Error.badRequest(error.message);
    }
}
