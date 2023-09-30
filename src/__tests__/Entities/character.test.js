import Game from "../../app/Entities/Game";
import Characters, {
    BaseCharacter,
    CharacterActions
} from "../../app/Entities/Character";

describe("Test character entity", () => {
    beforeAll(async () => {
        await Game.close();
    });

    afterEach(async () => {
        await Game.close();
    });

    it("should return default characters", () => {
        expect(Characters.getAll).toBeDefined();
    });

    it("should be able to create a character", () => {
        const character = new BaseCharacter("Pinoquio", CharacterActions.JOKER);
        expect(character).toBeInstanceOf(BaseCharacter);
    });

    it("should have default characters", () => {
        expect(Characters.characterListSize).toBe(6);
    });

    it("should be able to find a character by name", () => {
        const character = Characters.findByName("Zeca");
        expect(character).toBeInstanceOf(BaseCharacter);
    });
});
