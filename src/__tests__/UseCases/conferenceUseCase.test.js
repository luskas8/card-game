import { Error, Success } from "../../app/Core/utils.js";
import Game from "../../app/Entities/Game";
import { Player } from "../../app/Entities/Player";
import Round from "../../app/Entities/Round.js";
import conferenceUseCase from "../../app/UseCases/conferenceUseCase";

describe("conferenceUseCase", () => {
    beforeEach((done) => {
        Game.hostSocketId = "123";
        Game._players = [
            new Player("TESTADOR", "123", {
                isHost: true,
                isTheKiller: true,
                wasTheKiller: true,
                character: "Serena",
                killerScore: 4,
                baseScore: 3,
            }),
            new Player("TESTADOR", "1234", { character: "Zeca" }),
            new Player("TESTADOR", "1235", { character: "Zeca" }),
            new Player("TESTADOR", "12356", { character: "Zeca" }),
            new Player("TESTADOR", "1236", { character: "Zeca" }),
        ];
        Game._playersNotWasKillerSocketID = [
            "123",
            "1234",
            "1235",
            "1236",
            "12356",
        ];
        done();
    });

    afterEach(async () => {
        await Game.close();
    });

    it("should not start conference when not all players was killer", async () => {
        const result = await conferenceUseCase();

        expect(result).toBeInstanceOf(Error);
        expect(result.status).toBe(Error.forbidden().status);
    });

    it("should start conference when all players was killer", async () => {
        Game.players.forEach((player) => {
            Game.addRound(new Round(player.socketID));
        });
        const result = await conferenceUseCase();

        expect(result).toBeInstanceOf(Success);
        expect(result.status).toBe(Success.message().status);
    });

    it("should win when has more kills than the other player, when score tie", async () => {
        Game.players.map((player) => (player._wasTheKiller = true));
        Game._playersNotWasKillerSocketID = [];
        const player = Game.findPlayerBySocket("1234");
        player._killerScore = 2;
        player._baseScore = 5;
        const result = await conferenceUseCase();

        expect(result).toBeInstanceOf(Success);
        expect(result.status).toBe(Success.message().status);
    });

    it("should be a tie", async () => {
        Game.players.map((player) => (player._wasTheKiller = true));
        Game._playersNotWasKillerSocketID = [];
        const player = Game.findPlayerBySocket("1234");
        player._killerScore = 4;
        player._baseScore = 3;
        const result = await conferenceUseCase();

        expect(result).toBeInstanceOf(Success);
        expect(result.status).toBe(Success.message().status);
    });
});
