import { Error, Success } from "../../../config/Responses";
import Game from "../Entities/Game";

export default async function conferenceUseCase() {
    if (Game.playersNotWasKillerSocketID.length > 0) {
        return Error.forbidden("Not all players was killer")
    }

    const first = Game.players.sort((a, b) => b.score - a.score)[0]
    const tieList = Game.players.filter(player => player.score === first.score && player.socketID !== first.socketID)
    if (tieList.length > 0) {
        tieList.push(first)
        const predator = tieList.sort((a, b) => b.killerScore - a.killerScore)[0]
        const killersTieList = tieList.filter(player => player.killerScore === predator.killerScore && player.socketID !== predator.socketID)
        if (killersTieList.length > 0) {
            killersTieList.push(predator)
            return Success.message(killersTieList)
        }

        return Success.message([predator])
    }

    return Success.message(first)
}