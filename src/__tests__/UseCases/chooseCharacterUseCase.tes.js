import Game from "../../app/Game/index.js"
import chooseCharacterUseCase from "../../app/UseCases/chooseCharacterUseCase.js"
import newConnectionUseCase from "../../app/UseCases/newConnectionUseCase.js"
import { Error, Success } from "../../config/Responses"

describe("chooseCharacterUseCase", () => {
    const socketID = "40028922"
    const characterName = "Zeca"

    beforeEach(async () => {
        await Game.close()
        await newConnectionUseCase(socketID, { name: "Player" })
    })

    afterEach(async () => {
        await Game.close()
    })

    it("should be able to choose a character", async () => {
        const response = await chooseCharacterUseCase(socketID, { characterName })

        expect(response).toBeInstanceOf(Success)
        expect(response.status).toBe(Success.accepted().status)
    })

    it("should not be able to choose a character with no socketID", async () => {
        const response = await chooseCharacterUseCase("", { characterName })

        expect(response).toBeInstanceOf(Error)
        expect(response.status).toBe(Error.badRequest().status)
    })

    it("should not be able to choose a character with no characterName", async () => {
        const response = await chooseCharacterUseCase(socketID, { characterName: "" })

        expect(response).toBeInstanceOf(Error)
        expect(response.status).toBe(Error.badRequest().status)
    })

    it("should not be able to choose a character when not in game", async () => {
        const response = await chooseCharacterUseCase("123", { characterName })

        expect(response).toBeInstanceOf(Error)
        expect(response.status).toBe(Error.notFound().status)
    })

    it("should not be able to choose a character already in use", async () => {
        await chooseCharacterUseCase(socketID, { characterName })
        await newConnectionUseCase("socketID", { name: "Player 2" })

        const response = await chooseCharacterUseCase("socketID", { characterName })

        expect(response).toBeInstanceOf(Error)
        expect(response.status).toBe(Error.unauthorized().status)
    })

    it("should not be able to choose a character that does not exist", async () => {
        const response = await chooseCharacterUseCase(socketID, { characterName: "invalid" })

        expect(response).toBeInstanceOf(Error)
        expect(response.status).toBe(Error.notFound().status)
    })
})