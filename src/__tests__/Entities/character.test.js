import Game from "../../app/Entities/Game"
import Characters, { BaseCharacter, Places } from "../../app/Entities/Character"

describe("Test character entity", () => {
    beforeAll(async () => {
        await Game.close()
    })

    afterEach(async () => {
        await Game.close()
    })

    it("should return default characters", () => {
        expect(Characters.all).toBeDefined()
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

    it("should not be able to remove a character when not exists", () => {
        const result = Characters.remove({ name: "Gilmar" })
        expect(result).toBe(false)
    })

    it("should not be able to create a character with same id or name", () => {
        const character = Characters.add(new BaseCharacter("Zeca", Places.ALL))
        expect(character).toBeNull()
    })

    it("should have default characters", () => {
        expect(Characters.characterListSize).toBe(6)
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

    it("should not be able to use a character when it is in use", async () => {
        const character = Characters.findByName("Zeca")
        character._inUse = true
        const result = await character.use("40028922")
        
        expect(result).not.toBe("Success")
    })

    it("should not be able to use a character when not passed player socket id", async () => {
        const character = Characters.findByName("Zeca")
        character._inUse = true
        const result = await character.use("")
        
        expect(result).not.toBe("Success")
    })

    it("should be able to release a character", async () => {
        const character = Characters.findByName("Zeca")
        character._inUse = true
        const result = await character.release
        
        expect(result).toBe(true)
    })

    it("should not be able to release a character when not in use", async () => {
        const character = Characters.findByName("Zeca")
        const result = await character.release
        
        expect(result).toBe(false)
    })

    it("should be able to find a character by name", () => {
        const character = Characters.findByName("Zeca")
        expect(character).toBeInstanceOf(BaseCharacter)
    })

    it("should be able to find a character by place", () => {
        const character = Characters.findByPlace(Places.ALL)
        expect(character).toBeInstanceOf(BaseCharacter)
    })

    it("should be able to find a character by socket", () => {
        Characters.findByName("Zeca").playerSocketId = "40028922"
        const character = Characters.findBySocket("40028922")

        expect(character).toBeInstanceOf(BaseCharacter)
    })
})