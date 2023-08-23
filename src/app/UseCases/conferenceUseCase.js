import { Error, Success } from "../../../config/Responses";
import Game from "../Entities/Game";

export default async function conferenceUseCase() {
    if (!Game.allPlayersWasKiller()) {
        return Error.badRequest("Not all players was killer")
    }

    const first = Game.players.sort((a, b) => b.score - a.score)[0]
    const tieList = Game.players.filter(player => player.score === first.score && player.socketID !== first.socketID)
    if (tieList.length > 0) {
        tieList.push(first)
        const predator = tieList.sort((a, b) => b.killerScore - a.killerScore)[0]
        const killersTie = tieList.filter(player => player.killerScore === predator.killerScore && player.socketID !== predator.socketID)
        if (killersTie.length > 0) {
            killersTie.push(predator)
            return Success.tie(killersTie)
        }

        return Success.winner(predator, "Winner as predator")
    }

    return Success.winner(first)
}