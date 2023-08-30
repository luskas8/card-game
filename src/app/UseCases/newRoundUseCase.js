import chooseKillerUseCase from "./chooseKillerUseCase.js";
import conferenceUseCase from "./conferenceUseCase.js";

export default async function newRoundUseCase() {
    try {
        const conferenceResponse = await conferenceUseCase();
        return conferenceResponse;
    } catch (error) {
        try {
            const response = await chooseKillerUseCase();
            return response;
        } catch (error) {
            return response;
        }
    }
}
