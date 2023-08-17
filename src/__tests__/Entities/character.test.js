import logger from "../../app/logger"
import Characters, { BaseCharacter, Places } from "../../app/Game/Character"

describe("Test character entity", () => {
    beforeAll(async () => {
        await Characters.reset
    })

    afterEach(async () => {
        await Characters.reset
    })

    afterAll(async () => {
        await Characters.reset
    })

    it("should be able to create a character", () => {
        const character = new BaseCharacter("Pinoquio", Places.ALL)
        expect(character).toBeInstanceOf(BaseCharacter)
    })

    it("should be able to create character by characters object", () => {
        const character = Characters.add(new BaseCharacter("Pinoquio", Places.ALL))
        expect(character).toBeInstanceOf(BaseCharacter)
    })

    it("should be able to remove a character from characters object", () => {
        const character = Characters.add(new BaseCharacter("Pinoquio", Places.ALL))
        const result = Characters.remove(character)
        expect(result).toBe(true)
    })

    it("should not be able to create a character with same id or name", () => {
        const character = Characters.add(new BaseCharacter("Pinoquio", Places.ALL))
        const character2 = Characters.add(new BaseCharacter("Pinoquio", Places.ALL))
        expect(character).toBeInstanceOf(BaseCharacter)
        expect(character2).toBeNull()
    })

    it("should have default characters", () => {
        expect(Characters.size).toBe(6)
    })

    it ("should be able to use a character", async () => {
        const character = Characters.add(new BaseCharacter("Pinoquio", Places.ALL))
        const result = await character.use("40028922")
        expect(result).toBe(true)
    })

    it ("should not be able to use an used character", async () => {
        const character = Characters.findByName("Zeca")
        const successResult = await character.use("40028922")
        const errorResult = await character.use("40028923")
        expect(successResult).toBeTruthy()
        expect(errorResult).toBeFalsy()
    })
})