import { Error, Success } from "../Core/utils.js";

import characters from "../Entities/Character.js";
import Game from "../Entities/Game.js";

/**
 * @param {string} playerId
 * @param {Object} data
 * @param {String} data.characterName
 * @param {Game} game
 * @returns {Promise<Success|Error>}
 */
export default function chooseCharacterUseCase(playerId, data, game) {
    if (!data.characterName) {
        return Error.badRequest("No character name provided");
    }

    const player = game.findPlayerById(playerId);

    if (!player) {
        return Error.badRequest("You are not in a game");
    }

    const character = characters.findByName(data.characterName);

    if (!character) {
        return Error.badRequest("Character not found");
    }

    if (game.findPlayerByCharacter(character.name)) {
        return Error.forbidden("Character already in use");
    }

    try {
        player.character = character;
    } catch (error) {
        return Error.badRequest(error);
    }
}
