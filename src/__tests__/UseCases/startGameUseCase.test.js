import { Error, Success } from "../../../config/Responses"
import Game, { GameStates } from "../../app/Entities/Game"
import startGameUseCase from "../../app/UseCases/startGameUseCase"

describe("startGameUseCase", () => {
    beforeEach((done) => {
        Game.hostSocketId = "123"
        Game._players = [{ socketID: "123", character: "123" }, { socketID: "1234", character: "123" }, { socketID: "1235", character: "123" }, { socketID: "1236", character: "123" }]
        done()
    })

    afterEach(async () => {
        await Game.close()
    })

    it("should not be able to start a game without pass a socket id", async () => {
        const result = await startGameUseCase("")
        
        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.badRequest().status)
    })

    it("should not be able to start a game when player not in game", async () => {
        const result = await startGameUseCase("1")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.notFound().status)
    })

    it("should not be able to start a game when player is not the host", async () => {
        const result = await startGameUseCase("1234")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.unauthorized().status)
    })

    it("should not be able to start a game without a character", async () => {
        Game._players.push({ socketID: "1", character: null })
        const result = await startGameUseCase("1")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.unauthorized().status)
    })

    it("should not be able to start a game with less than 3 players", async () => {
        Game._players = Game._players.slice(0, 2)
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.badRequest().status)
    })

    it("should not be able to start a game when already started", async () => {
        Game._currentState = GameStates.STARTED
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.message("").status)
    })
 
    it("should be able to start a game", async () => {
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Success)
        expect(Game.currentState).toBe(GameStates.STARTED)
    })
})