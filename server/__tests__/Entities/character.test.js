import { describe, it, expect, test } from "vitest";
import { Characters } from "../../src/Entities/Character.js";

describe("Test character entity", () => {
    it("should return default characters", () => {
        expect(Characters.characters).toBeDefined();
    });

    it("should be able to find a character by name", () => {
        const character = Characters.findByName("Zeca");
        expect(character).toBeTruthy();
    });

    test("should all characters have name and favorite place", () => {
        Characters.characters.forEach((character) => {
            expect(character.name).toBeDefined();
            expect(character.favoriteAction).toBeDefined();
        });
    });
});
