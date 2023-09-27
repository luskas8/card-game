import { Error, Success } from "../Core/utils.js";
import Game from "../Entities/Game.js";

/**
 * @param {string} socketID
 * @param {Object} data
 * @param {string[]} data.actions
 * @returns {Promise<Success|Error>}
 */
export default async function chooseActionUseCase(socketID, data) {
    if (!socketID) {
        return Error.badRequest("No socketID provided");
    }
    
    if (!Game.findPlayerBySocket(socketID)) {
        return Error.notFound("You are not in a game");
    }

    if (!data.actions || !data.actions.length) {
        return Error.badRequest("No actions provided");
    }

    try {
        return Success.accepted({ message: "Action choosed" });
    } catch (error) {
        return Error.badRequest(error);
    }
}
