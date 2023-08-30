import { Error, Success } from "../config/Responses.js";
import Game from "../Entities/Game.js";

export default async function conferenceUseCase() {
    if (Game.playersNotWasKillerSocketID.length > 0) {
        return Error.forbidden("Not all players was killer");
    }

    const firstWinner = Game.players.sort((a, b) => b.score - a.score)[0];
    const tieList = Game.players.filter(
        (player) =>
            player.socketID !== firstWinner.socketID &&
            player.score === firstWinner.score
    );
    if (tieList.length > 0) {
        tieList.push(firstWinner);
        const killerWinner = tieList.sort(
            (a, b) => b.killerScore - a.killerScore
        )[0];
        const killersTieList = tieList.filter(
            (player) =>
                player.socketID !== killerWinner.socketID &&
                player.killerScore === killerWinner.killerScore
        );
        if (killersTieList.length > 0) {
            killersTieList.push(killerWinner);
            return Success.message(killersTieList);
        }

        return Success.message([killerWinner]);
    }

    return Success.message(firstWinner);
}
