import Game from "../../app/Entities/Game"
import Characters, { BaseCharacter, Places } from "../../app/Entities/Character"

describe("Test character entity", () => {
    beforeAll(async () => {
        await Game.close()
    })

    afterEach(async () => {
        await Game.close()
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
        const character = Characters.findByName("Zeca")
        const result = Characters.remove(character)
        expect(result).toBe(true)
    })

    it("should not be able to create a character with same id or name", () => {
        const character = Characters.add(new BaseCharacter("Zeca", Places.ALL))
        expect(character).toBeNull()
    })

    it("should have default characters", () => {
        expect(Characters.size).toBe(6)
    })

    it("should be able to use a character", async () => {
        const result = await Characters.findByName("Zeca").use("40028922")
        expect(result).toBe("Success")
    })

    it("should not be able to use an used character", async () => {
        const successResult = await Characters.findByName("Serena").use("40028922")
        const errorResult = await Characters.findByName("Serena").use("40028923")
        expect(successResult).toBe("Success")
        expect(errorResult).not.toBe("Success")
    })
})