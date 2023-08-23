import Game, { GameStates } from "../Entities/Game"
import { Player } from "../Entities/Player";

/**
 * @returns {Promise<Player|null>}
 * @description Choose a killer randomly
 * @throws {Error} If all players was killer
 */
export default async function chooseKillerUseCase() {
    if (Game.allPlayersWasKiller()) {
        return null
    }

    if (Game.currentState !== GameStates.STARTED) {
        return null
    }

    const chooseKillerUseCasePromise = new Promise((resolve, _) => {
        if (Game.allPlayersWasKiller()) {
            return reject(null)
        }

        const playersNotWasKiller = Game.players.filter(player => !player._wasTheKiller)
        const randomIndex = Math.floor(Math.random() * playersNotWasKiller.length)
        const player = playersNotWasKiller[randomIndex]
        player.isTheKiller = true
        player._wasTheKiller = true
        Game.killerSocketID = player.socketID
        resolve(player)
    })

    return chooseKillerUseCasePromise.then((data) => data).catch((error) => error)
}