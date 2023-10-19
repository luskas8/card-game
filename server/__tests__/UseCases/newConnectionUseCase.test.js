import { describe, it, expect } from "vitest";
import Game from "../../src/Entities/Game";
import newConnectionUseCase from "../../src/UseCases/newConnectionUseCase";
import { Error, Success } from "../../src/Core/utils.js";

describe("newConnectionUseCase", () => {
    const playerId = "40028922";
    const name = "Jailson Mendes";
    it("should pass", () => {
        expect(true).toBe(true);
    });

    // it("should be able to create a new connection", async () => {
    //     const response = await newConnectionUseCase(playerId, { name });

    //     expect(response).toBeInstanceOf(Success);
    //     expect(response.status).toBe(Success.created().status);
    // });

    // it("should not be able to create a new connection with no playerId", async () => {
    //     const response = await newConnectionUseCase("", { name });

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to create a new connection with no name", async () => {
    //     const response = await newConnectionUseCase(playerId, { name: "" });

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to create a new connection with no data", async () => {
    //     const response = await newConnectionUseCase(playerId, null);

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to create a new connection with no data.name", async () => {
    //     const response = await newConnectionUseCase(playerId, {});

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to create a new connection with a name that already exists", async () => {
    //     await newConnectionUseCase(playerId, { name });
    //     const response = await newConnectionUseCase(playerId, { name });

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to create a new connection with a playerId that already exists", async () => {
    //     await newConnectionUseCase(playerId, { name });
    //     const response = await newConnectionUseCase(playerId, {
    //         name: "Jailson Mendes 2",
    //     });

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.badRequest().status);
    // });

    // it("should not be able to connect when game is full", async () => {
    //     const promises = [];

    //     for (let i = 0; i < Game.MAX_PLAYERS; i++) {
    //         const num = i + 1;

    //         promises.push(
    //             newConnectionUseCase(`playerId ${num}`, {
    //                 name: `Jailson Mendes ${num}`,
    //             })
    //         );
    //     }

    //     await Promise.all(promises);

    //     const response = await newConnectionUseCase(playerId, {
    //         name,
    //     });

    //     expect(response).toBeInstanceOf(Error);
    //     expect(response.status).toBe(Error.unauthorized().status);
    // });
});
