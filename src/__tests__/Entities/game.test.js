import Game, { GameStates } from "../../app/Entities/Game"

describe("Test game entity", () => {
    it("should return all players in the game", () => {
        expect(Game.players).toEqual([])
    })

    it("should update the game state", () => {
        Game.updateState(GameStates.WAITING_HOST)
        expect(Game.currentState).toEqual(GameStates.WAITING_HOST)
    })

    it("shoudl be able to disconect a player", () => {
        Game._players = [{ socketID: "123" }]

        expect(Game.disconectPlayer("123")).toBe(true)
    })

    it("shoudl not be able to disconect a player when not passed one", () => {
        expect(Game.disconectPlayer("")).toBe(false)
    })
})