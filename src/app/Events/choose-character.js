import { Error } from "../../../config/Responses.js"
import chooseCharacterUseCase from "../UseCases/chooseCharacterUseCase.js"
import logger from "../logger.js"
import gameStatusUpdate from "./game-status-update.js"

/**
 * @param {Socket} socket 
 * @param {Server} io 
 * @param {Object} data
 * @param {String} data.characterName
 * @returns {Promise<boolean>}
 */
export default async function chooseCharacter(socket, io, data) {
    const response = await chooseCharacterUseCase(socket.id, data)

    if (response instanceof Error) {
        logger.error(response)
        socket.emit("choose-character-error", { error: response.message })
        return false
    }

    socket.emit("choose-character-success", [response.message])
    gameStatusUpdate(io)
    return true
}