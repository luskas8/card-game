import Game from "../../app/Entities/Game.js";
import chooseCharacterUseCase from "../../app/UseCases/chooseCharacterUseCase.js";
import newConnectionUseCase from "../../app/UseCases/newConnectionUseCase.js";
import { Error, Success } from "../../app/Core/utils.js";

describe("chooseCharacterUseCase", () => {
    const playerId = "40028922";
    const characterName = "Zeca";

    it("should be able to choose a character", async () => {
        const response = await chooseCharacterUseCase(playerId, {
            characterName,
        });

        expect(response).toBeInstanceOf(Success);
        expect(response.status).toBe(Success.accepted().status);
    });

    it("should not be able to choose a character already in use", async () => {
        await chooseCharacterUseCase(playerId, { characterName });
        await newConnectionUseCase("playerId", { name: "Player 2" });

        const response = await chooseCharacterUseCase("playerId", {
            characterName,
        });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.unauthorized().status);
    });

    it("should not be able to choose a character with no playerId", async () => {
        const response = await chooseCharacterUseCase("", { characterName });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to choose a character with no characterName", async () => {
        const response = await chooseCharacterUseCase(playerId, {
            characterName: "",
        });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to choose a character when not in game", async () => {
        const response = await chooseCharacterUseCase("123", { characterName });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.notFound().status);
    });

    it("should not be able to choose a character that does not exist", async () => {
        const response = await chooseCharacterUseCase(playerId, {
            characterName: "invalid",
        });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.notFound().status);
    });
});
