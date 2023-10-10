import { Characters } from "../../app/Entities/Character.js";

describe("Test character entity", () => {
    it("should return default characters", () => {
        expect(Characters.characters).toBeDefined();
    });

    it("should be able to find a character by name", () => {
        const character = Characters.findByName("Zeca");
        expect(character).toBeTruthy();
    });
});
