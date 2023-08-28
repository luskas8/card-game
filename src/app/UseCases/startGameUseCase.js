import { Error, Success } from "../../../config/Responses.js";
import Game, { GameStates } from "../Entities/Game.js";

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

    if (Game.hostSocketId !== socketID) {
        return Error.unauthorized("You are not the host")
    }

    if (Game.playerListSize < 3) {
        return Error.badRequest("You need at least 3 players")
    }

    if (!Game.allPlayersHasCharacter()) {
        return Error.unauthorized("All players must choose a character")
    }

    if (Game.currentState === GameStates.STARTED) {
        return Error.message("Game already started")
    }

    Game.start()
    return Success.message("Game started")
}