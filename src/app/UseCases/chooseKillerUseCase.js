import { Error } from "../config/Responses.js";
import Game, { GameStates } from "../Entities/Game.js";
import { Player } from "../Entities/Player.js";

/**
 * @returns {Promise<Player|Error>}
 * @description Choose a killer randomly
 * @throws {Error} If all players was killer
 */
export default async function chooseKillerUseCase() {
    return new Promise((resolve, reject) => {
        if (Game.playersNotWasKillerSocketID.length <= 0) {
            reject(Error.forbidden("All players was killer"));
        }

        if (Game.currentState !== GameStates.STARTED) {
            reject(Error.forbidden("Game not started"));
        }

        const randomIndex = Math.floor(
            Math.random() * Game.playersNotWasKillerSocketID.length
        );
        const player = Game.playersNotWasKillerSocketID[randomIndex];
        Game.playersNotWasKillerSocketID.splice(randomIndex, 1);
        player.isTheKiller = true;
        player._wasTheKiller = true;
        Game.killerSocketID = player.socketID;
        resolve(player);
    });
}
