import Game from "../../app/Entities/Game";
import newConnectionUseCase from "../../app/UseCases/newConnectionUseCase";
import { Error, Success } from "../../app/Core/utils.js";

describe("newConnectionUseCase", () => {
    const socketID = "40028922";
    const name = "Jailson Mendes";

    beforeEach(async () => {
        await Game.close();
    });

    afterEach(async () => {
        await Game.close();
    });

    it("should be able to create a new connection", async () => {
        const response = await newConnectionUseCase(socketID, { name });

        expect(response).toBeInstanceOf(Success);
        expect(response.status).toBe(Success.created().status);
    });

    it("should not be able to create a new connection with no socketID", async () => {
        const response = await newConnectionUseCase("", { name });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to create a new connection with no name", async () => {
        const response = await newConnectionUseCase(socketID, { name: "" });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to create a new connection with no data", async () => {
        const response = await newConnectionUseCase(socketID, null);

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to create a new connection with no data.name", async () => {
        const response = await newConnectionUseCase(socketID, {});

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to create a new connection with a name that already exists", async () => {
        await newConnectionUseCase(socketID, { name });
        const response = await newConnectionUseCase(socketID, { name });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to create a new connection with a socketID that already exists", async () => {
        await newConnectionUseCase(socketID, { name });
        const response = await newConnectionUseCase(socketID, {
            name: "Jailson Mendes 2",
        });

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.badRequest().status);
    });

    it("should not be able to connect when game is full", async () => {
        const promises = []

        for (let i = 0; i < Game.maxPlayers; i++) {
            const num = i + 1;

            promises.push(newConnectionUseCase(`socketID ${num}`, {
                name: `Jailson Mendes ${num}`,
            }))
        }

        await Promise.all(promises)

        const response = await newConnectionUseCase(socketID, {
            name,
        })

        expect(response).toBeInstanceOf(Error);
        expect(response.status).toBe(Error.unauthorized().status);
    });
});
