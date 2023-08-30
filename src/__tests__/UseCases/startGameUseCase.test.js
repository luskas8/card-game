import { Error, Success } from "../config/Responses"
import Game, { GameStates } from "../../app/Entities/Game"
import { Player } from "../../app/Entities/Player"
import startGameUseCase from "../../app/UseCases/startGameUseCase"

describe("startGameUseCase", () => {
    beforeEach((done) => {
        Game.hostSocketId = "123"
        Game._players = [new Player("TESTADOR", "123", { isHost: true, isTheKiller: true, wasTheKiller: true, character: "Zeca" }), new Player("TESTADOR", "1234", { character: "Zeca" }), new Player("TESTADOR", "1235", { character: "Zeca" }), new Player("TESTADOR", "123", { character: "Zeca" }), new Player("TESTADOR", "1236", { character: "Zeca" })]
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
        expect(result.status).toBe(Error.forbidden().status)
    })

    it("should not be able to start a game without a character", async () => {
        Game._players.push({ socketID: "123", character: null })
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.forbidden().status)
    })

    it("should not be able to start a game with less than 3 players", async () => {
        Game._players = Game._players.slice(0, 2)
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.forbidden().status)
    })

    it("should not be able to start a game when already started", async () => {
        Game._currentState = GameStates.STARTED
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.forbidden().status)
    })
 
    it("should be able to start a game", async () => {
        const result = await startGameUseCase("123")

        expect(result).toBeInstanceOf(Success)
        expect(Game.currentState).toBe(GameStates.STARTED)
    })
})