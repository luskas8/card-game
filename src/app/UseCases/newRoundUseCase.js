import { Error, Success } from "../../../config/Responses"
import chooseKillerUseCase from "./chooseKillerUseCase"
import conferenceUseCase from "./conferenceUseCase"

export default async function newRoundUseCase() {
    try {
        const conferenceResponse = await conferenceUseCase()
        return conferenceResponse
    } catch (error) {
        try {
            const response = await chooseKillerUseCase()
            return response
        } catch (error) {
            return response
        }
    }
}