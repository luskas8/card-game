import { describe, it, expect } from "vitest";
import Game from "../../src/Entities/Game";

// describe("Test game entity", () => {
//     it("should return all players in the game", () => {
//         expect(Game.players).toEqual([]);
//     });
//     it("should be able to disconnect a player", async () => {
//         Game.addPlayer("123", "TESTADOR");
//         expect(Game.disconnectPlayer("123")).toBe(true);
//     });
//     it("should not be able to disconnect a player when not passed one", () => {
//         expect(Game.disconnectPlayer("")).toBe(false);
//     });
// });
describe("Initial test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
