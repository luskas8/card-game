import { Error, Success } from "../../../config/Responses"
import chooseKillerUseCase from "./chooseKillerUseCase"
import conferenceUseCase from "./conferenceUseCase"

export default async function newRoundUseCase() {
    const conferenceResponse = await conferenceUseCase()
    if (conferenceResponse instanceof Error) {
        const response = await chooseKillerUseCase()
        if (response instanceof Error) {
            return response
        }

        return Success.created("New round started")
    }

    return conferenceResponse
}