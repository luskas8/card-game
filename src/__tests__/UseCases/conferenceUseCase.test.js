import { Error, Success } from "../../../config/Responses"
import Game from "../../app/Entities/Game"
import { Player } from "../../app/Entities/Player"
import conferenceUseCase from "../../app/UseCases/conferenceUseCase"

describe("conferenceUseCase", () => {
    beforeEach((done) => {
        Game.hostSocketId = "123"
        Game._players = [new Player("TESTADOR", "123", { isHost: true, isTheKiller: true, wasTheKiller: true, character: "Serena", killerScore: 4, baseScore: 3 }), new Player("TESTADOR", "1234", { character: "Zeca" }), new Player("TESTADOR", "1235", { character: "Zeca" }), new Player("TESTADOR", "123", { character: "Zeca" }), new Player("TESTADOR", "1236", { character: "Zeca" })]
        done()
    })

    afterEach(async () => {
        await Game.close()
    })

    it("should not start conference when not all players was killer", async () => {
        const result = await conferenceUseCase()

        expect(result).toBeInstanceOf(Error)
        expect(result.status).toBe(Error.forbidden().status)
    })

    it("should start conference when all players was killer", async () => {
        Game.players.map(player => player._wasTheKiller = true)
        const result = await conferenceUseCase()

        expect(result).toBeInstanceOf(Success)
        expect(result.status).toBe(Success.message().status)
    })

    it("should be a predator win", async () => {
        Game.players.map(player => player._wasTheKiller = true)
        const player = Game.findPlayerBySocket("1234")
        player._killerScore = 2
        player._baseScore = 5
        const result = await conferenceUseCase()

        expect(result).toBeInstanceOf(Success)
        expect(result.status).toBe(Success.message().status)
    })

    it("should be a tie", async () => {
        Game.players.map(player => player._wasTheKiller = true)
        const player = Game.findPlayerBySocket("1234")
        player._killerScore = 4
        player._baseScore = 3
        const result = await conferenceUseCase()

        expect(result).toBeInstanceOf(Success)
        expect(result.status).toBe(Success.message().status)
    })
})