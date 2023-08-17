import { Error, Success } from "../../config/Responses.js";
import Game from "../Game/index.js";

/**
 * @param {string} socketID
 * @param {Object} data
 * @param {string} data.name
 * @returns {Error|Success}
 */
export default function newConnection(socketID, data) {
    if (Game.players.size >= 6) {
        return Error.unauthorized('Game is full')
    }

    if (!data || !data.name) {
        return Error.badRequest('Name is required')
    }

    const isHost = Game.players.size === 1 || Game.hostSocketId === ''
    const response = Game.players.add(data.name, socketID, {
        isHost: isHost
    })

    if (response !== 'success') {
        return Error.badRequest(response)
    }

    if (isHost) {
        Game.hostSocketId = socketID
    }

    return Success.created(Game.gameStatus())
}
