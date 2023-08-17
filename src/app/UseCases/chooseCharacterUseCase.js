import { Socket } from "socket.io"
import { Error, Success } from "../../config/Responses.js"
import characters from "../Game/Character.js"
import Players from "../Game/Player.js"

/**
 * @param {string} socketID
 * @param {Object} data
 * @param {String} data.characterName
 * @returns {Promise<Success|Error>}
 */
export default async function chooseCharacterUseCase(socketID, data) {
    if (!Players.findBySocket(socketID)) {
        return Error.unauthorized("You are not in a game")
    }
    
    if (!data.characterName) {
        return Error.badRequest("No character name provided")
    }
    
    const character = characters.findByName(data.characterName)
    
    if (character.inUse) {
        return Error.unauthorized("Character already in use")
    }

    const using = await character.use(socketID)

    if (!using) {
        return Error.message("Something went wrong")
    }

    return Success.accepted({ character: character.name })
}