import { Error } from "../Core/utils.js";

import Game from "../Entities/Game.js";
import logger from "../Entities/Logger.js";

import chooseCharacterUseCase from "../UseCases/chooseCharacterUseCase.js";

import gameStatusUpdate from "./game-status-update.js";

/**
 * @param {Socket} socket
 * @param {Object} data
 * @param {String} data.characterName
 * @param {Game} game
 */
export default function chooseCharacter(socket, data, game) {
    const playerId = socket.id;

    const response = chooseCharacterUseCase(playerId, data, game);

    const emitData = { success: true };

    if (response instanceof Error) {
        logger.error(response);
        emitData.success = false;
        emitData.error = response.message;
    } else {
        gameStatusUpdate(socket, {
            action: "update-players",
            data: { playerId, characterName: data.characterName },
        });
    }

    socket.emit("choose-character", emitData);
}
