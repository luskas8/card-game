import Game from "../Entities/Game.js";
import { killCheckUseCase } from "./killCheckUseCase.js";
import scoringUseCase from "./scoringUseCase.js";

export default async function endRotationUseCase() {
    if (!Game.allPlayersAreReady()) {
        return false;
    }

    await killCheckUseCase();
    await scoringUseCase();
    return true;
}