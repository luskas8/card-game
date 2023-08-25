import { Error, Success } from "../../../config/Responses.js"
import Game from "../Entities/Game.js"

/**
 * @param {string} socketID
 * @param {Object} data
 * @param {string} data.name
 * @returns {Promise<Error|Success>}
 */
export default async function newConnection(socketID, data) {
    if (!socketID) {
        return Error.badRequest('SocketID is required')
    }

    if (Game.playerListSize >= 6) {
        return Error.unauthorized('Game is full')
    }

    if (!data || !data.name) {
        return Error.badRequest('Name is required')
    }

    const response = await Game.addPlayer(data.name, socketID, {
        isHost: isHost
    })

    if (response !== 'success') {
        return Error.badRequest(response)
    }

    return Success.created(Game.game)
}
