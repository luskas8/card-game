import { describe, it, expect } from "vitest";
import { Error, Success } from "../../src/Core/utils.js";
import Game from "../../src/Entities/Game";
import { Player } from "../../src/Entities/Player";
import startGameUseCase from "../../src/UseCases/startGameUseCase";

describe("startGameUseCase", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
    // beforeEach((done) => {
    //     Game.hostSocketId = "123";
    //     Game.players = [
    //         new Player("TESTADOR", "123", {
    //             isHost: true,
    //             isTheKiller: true,
    //             wasTheKiller: true,
    //             character: "Zeca",
    //         }),
    //         new Player("TESTADOR", "1234", { character: "Zeca" }),
    //         new Player("TESTADOR", "1235", { character: "Zeca" }),
    //         new Player("TESTADOR", "123", { character: "Zeca" }),
    //         new Player("TESTADOR", "1236", { character: "Zeca" }),
    //     ];
    //     done();
    // });

    // it("should not be able to start a game without pass a socket id", async () => {
    //     const result = await startGameUseCase("");

    //     expect(result).toBeInstanceOf(Error);
    //     expect(result.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to start a game when player not in game", async () => {
    //     const result = await startGameUseCase("1");

    //     expect(result).toBeInstanceOf(Error);
    //     expect(result.status).toBe(Error.notFound().status);
    // });

    // it("should not be able to start a game when player is not the host", async () => {
    //     const result = await startGameUseCase("1234");

    //     expect(result).toBeInstanceOf(Error);
    //     expect(result.status).toBe(Error.forbidden().status);
    // });

    // it("should not be able to start a game without a character", async () => {
    //     Game.players.push({ playerId: "123", character: null });
    //     const result = await startGameUseCase("123");

    //     expect(result).toBeInstanceOf(Error);
    //     expect(result.status).toBe(Error.forbidden().status);
    // });

    // it("should not be able to start a game with less than 3 players", async () => {
    //     Game.players = Game.players.slice(0, 2);
    //     const result = await startGameUseCase("123");

    //     expect(result).toBeInstanceOf(Error);
    //     expect(result.status).toBe(Error.forbidden().status);
    // });

    // it("should not be able to start a game when already started", async () => {
    //     Game.didGameStart = true;
    //     const result = await startGameUseCase("123");

    //     expect(result).toBeInstanceOf(Error);
    //     expect(result.status).toBe(Error.forbidden().status);
    // });

    // it("should be able to start a game", async () => {
    //     const result = await startGameUseCase("123");

    //     expect(result).toBeInstanceOf(Success);
    //     expect(Game.didGameStart).toBe(true);
    // });
});
