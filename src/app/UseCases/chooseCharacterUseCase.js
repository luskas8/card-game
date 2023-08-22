import { Error, Success } from "../../config/Responses.js"
import characters from "../Entities/Character.js"
import Players from "../Entities/Player.js"

/**
 * @param {string} socketID
 * @param {Object} data
 * @param {String} data.characterName
 * @returns {Promise<Success|Error>}
 */
export default async function chooseCharacterUseCase(socketID, data) {
    if (!socketID) {
        return Error.badRequest("No socketID provided")
    }
    
    if (!Players.findBySocket(socketID)) {
        return Error.notFound("You are not in a game")
    }
    
    if (!data.characterName) {
        return Error.badRequest("No character name provided")
    }
    
    const character = characters.findByName(data.characterName)

    if (!character) {
        return Error.notFound("Character not found")
    }
    
    if (character.inUse) {
        return Error.unauthorized("Character already in use")
    }

    const response = await character.use(socketID)

    if (response !== "Success") {
        return Error.message(response)
    }

    return Success.accepted({ character: character.name })
}