import { Player } from "../../app/Game/Player.js"

describe("Test player entity", () => {
    it("should be able to create a player", () => {
        const player = new Player("Gilmar", "40028922")
        expect(player).toBeInstanceOf(Player)
    })
})