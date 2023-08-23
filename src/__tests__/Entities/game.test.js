import Game, { GameStates } from "../../app/Entities/Game"

describe("Test game entity", () => {
    it("should return all players in the game", () => {
        expect(Game.players).toEqual([])
    })

    it("should update the game state", () => {
        Game.updateState(GameStates.WAITING_HOST)
        expect(Game.currentState()).toEqual(GameStates.WAITING_HOST)
    })

    it("should start the game", () => {
        Game._hostSocketId = "123"
        Game._players = [1, 2, 3, 4]
        Game._currentState = GameStates.WAITING_HOST

        expect(Game.start("123")).toBe("Game started")
    })

    it("should not start the game if the socket id passed is not the host", () => {
        Game._hostSocketId = "123"
        Game._players = [1, 2, 3, 4]
        Game._currentState = GameStates.WAITING_HOST

        expect(Game.start("1234")).not.toBe("Game started")
    })

    it("should not start the game if is not passed a socket id", () => {
        Game._hostSocketId = "123"
        Game._players = [1, 2, 3, 4]
        Game._currentState = GameStates.WAITING_HOST

        expect(Game.start("")).not.toBe("Game started")
    })

    it("should not start the game if has no host", () => {
        expect(Game.start("")).not.toBe("Game started")
    })

    it("should not start the game if has no min players", () => {
        Game._hostSocketId = "123"
        Game._players = [1]
        Game._currentState = GameStates.WAITING_HOST

        expect(Game.start("123")).toBe("You need at least 3 players")
    })

    it("should not start the game when already started", () => {
        Game._hostSocketId = "123"
        Game._players = [1, 2, 3, 4]
        Game._currentState = GameStates.STARTED

        expect(Game.start("123")).toBe("Game already started")
    })

    it("shoudl be able to disconect a player", () => {
        Game._players = [{ socketID: "123" }]

        expect(Game.disconectPlayer("123")).toBe(true)
    })

    it("shoudl not be able to disconect a player when not passed one", () => {
        expect(Game.disconectPlayer("")).toBe(false)
    })
})