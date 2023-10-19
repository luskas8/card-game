import { Error } from "../Core/utils.js";
import Game from "../Entities/Game.js";

/**
 * @param {string} hostId
 * @param {Game} game
 */
export default function startGameUseCase(hostId, game) {
    if (game.hostId !== hostId || !game.findPlayerById(hostId)) {
        return Error.forbidden("You are not the host");
    }

    if (game.players.length < game.MIN_PLAYERS) {
        return Error.forbidden(`You need at least ${game.MIN_PLAYERS} players`);
    }

    if (!game.allPlayersChoseACharacter()) {
        return Error.forbidden("All players must choose a character");
    }

    if (game.didGameStart) {
        return Error.forbidden("Game already started");
    }

    return game.start();
}
