import Game from "../Entities/Game"
import newRoundUseCase from "../UseCases/newRoundUseCase"
import gameStatusUpdate from "./game-status-update"

export default async function newRound(socket, io) {
    const response = await newRoundUseCase()
    if (response instanceof Error) {
        io.emit("new-round-error", { message: response.message })
        return false
    }

    gameStatusUpdate(io, {
        action: ["new-round", "reset-cards"],
        data: Game.game
    })
    return true
}