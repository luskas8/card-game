import { Player } from "../../app/Entities/Player.js";

describe("Test player entity", () => {
    it("should be able to create a player", () => {
        const player = new Player("Gilmar", "40028922");
        expect(player).toBeInstanceOf(Player);
    });

    it("should be able to turn a player into host", () => {
        const player = new Player("Gilmar", "40028922");
        player.turnHost();
        expect(player.host).toBe(true);
    });
});
