import Game, { GameStates } from "../Entities/Game"
import { Player } from "../Entities/Player";

/**
 * @returns {Promise<Player|null>}
 * @description Choose a killer randomly
 * @throws {Error} If all players was killer
 */
export default async function chooseKillerUseCase() {
    return new Promise((resolve, reject) => {
        if (Game.playersNotWasKillerSocketID.length === 0 || Game.currentState !== GameStates.STARTED) {
            reject(null)
        }

        const randomIndex = Math.floor(Math.random() * Game.playersNotWasKillerSocketID.length)
        const player = Game.playersNotWasKillerSocketID[randomIndex]
        Game.playersNotWasKillerSocketID.splice(randomIndex, 1)
        player.isTheKiller = true
        player._wasTheKiller = true
        Game.killerSocketID = player.socketID
        resolve(player)
    })
}