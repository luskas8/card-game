import { describe, it, expect, beforeEach, test } from "vitest";
import { Characters } from "../../src/Entities/Character.js";
import Player from "../../src/Entities/Player.js";

describe("Test player entity", () => {
    /** @type {Player} */
    let player;

    beforeEach(() => {
        player = new Player("John", "1234");
    });

    it("should have a name and playerId", () => {
        expect(player.name).toBe("John");
        expect(player.playerId).toBe("1234");
    });

    it("should be able to pick a character", () => {
        player.character = Characters.findByName("Bocão");
        expect(player.character).toBeDefined();
    });

    it("should be able to see its' score", () => {
        player.baseScore = 10;
        player.killerScore = 20;
        expect(player.score).toBe(30);
    });

    test("should reset all values", () => {
        player.character = Characters.findByName("Bocão");
        player.baseScore = 10;
        player.killerScore = 20;
        player.reset();
        expect(player.character).toBeNull();
        expect(player.baseScore).toBe(0);
        expect(player.killerScore).toBe(0);
    })
});
