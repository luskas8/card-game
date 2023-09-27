import Game from "../../app/Entities/Game";

describe("Test game entity", () => {
    it("should return all players in the game", () => {
        expect(Game.players).toEqual([]);
    });

    it("shoudl be able to disconnect a player", async () => {
        await Game.addPlayer("123", "TESTADOR")

        expect(Game.disconnectPlayer("123")).toBe(true);
    });

    it("shoudl not be able to disconnect a player when not passed one", () => {
        expect(Game.disconnectPlayer("")).toBe(false);
    });
});
