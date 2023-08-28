import { Error } from "../../../config/Responses"
import chooseKillerUseCase from "./chooseKillerUseCase"
import conferenceUseCase from "./conferenceUseCase"

export default async function newRoundUseCase(socketID) {
    const response = await chooseKillerUseCase()
    if (response instanceof Error) {
        return response
    }

    await conferenceUseCase()
}