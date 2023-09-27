import { Error, Success } from "../Core/utils.js";
import characters from "../Entities/Character.js";
import Game from "../Entities/Game.js";

/**
 * @param {string} socketID
 * @param {Object} data
 * @param {String} data.characterName
 * @returns {Promise<Success|Error>}
 */
export default async function chooseCharacterUseCase(socketID, data) {
    if (!socketID) {
        return Error.badRequest("No socketID provided");
    }
    const player = Game.findPlayerBySocket(socketID);
    if (!player) {
        return Error.notFound("You are not in a game");
    }

    if (!data.characterName) {
        return Error.badRequest("No character name provided");
    }

    const character = characters.findByName(data.characterName);

    if (!character) {
        return Error.notFound("Character not found");
    }

    if (Game.findPlayerByCharacter(character.name)) {
        return Error.unauthorized("Character already in use");
    }

    try {
        player.character = character;
        return Success.accepted({ character: character.name });
    } catch (error) {
        return Error.badRequest(error);
    }
}
