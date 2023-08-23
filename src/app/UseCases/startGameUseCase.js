import { Error, Success } from "../../../config/Responses.js";
import Game from "../Entities/Game.js";

/**
 * @param {string} socketID
 * @returns {Promise<Error|Success>}
 */
export default async function startGameUseCase(socketID) {
    if (!socketID) {
        return Error.badRequest("Socket ID is required")
    }

    if(!Game.findPlayerBySocket(socketID)) {
        return Error.notFound("Player not found")
    }

    if (!Game.allPlayersHasCharacter()) {
        return Error.unauthorized("All players must choose a character")
    }

    const result = await Game.start(socketID)

    if (result !== "Game started") {
        return Error.message(result)
    }

    return Success.message(result)
}