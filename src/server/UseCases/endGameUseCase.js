import { Error, Success } from "../Core/utils.js";
import Game from "../Entities/Game.js";

export default async function conferenceUseCase() {
    if (Game.killerIds.length < Game.players.length) {
        return Error.forbidden("Not all players was killer");
    }

    const firstWinner = Game.players.sort((a, b) => b.score - a.score)[0];
    const tieList = Game.players.filter(
        (player) =>
            player.playerId !== firstWinner.playerId &&
            player.score === firstWinner.score
    );
    if (tieList.length > 0) {
        tieList.push(firstWinner);
        const killerWinner = tieList.sort(
            (a, b) => b.killerScore - a.killerScore
        )[0];
        const killersTieList = tieList.filter(
            (player) =>
                player.playerId !== killerWinner.playerId &&
                player.killerScore === killerWinner.killerScore
        );
        if (killersTieList.length > 0) {
            killersTieList.push(killerWinner);
            return Success.message(killersTieList);
        }

        return Success.message([killerWinner]);
    }

    return Success.message([firstWinner]);
}
