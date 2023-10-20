import { beforeEach, describe, expect, it } from "vitest";
import Game from "../../src/Entities/Game.js";
import Player from "../../src/Entities/Player";
import { Characters } from "../../src/Entities/Character.js";

describe("Test game entity", () => {
    /** @type {Game} */ let game;
    /** @type {Player} */ let initialPlayer;
    beforeEach(() => {
        initialPlayer = new Player("TESTADOR_1", "123");
        initialPlayer.character = { name: "character", favoriteAction: "sleep" };
        initialPlayer.baseScore = 1;
        initialPlayer.killerScore = 2;

        game = new Game({
            game: {
                hostId: initialPlayer.playerId,
                players: [initialPlayer]
            }
        });
    });

    it("should be able to create a game", () => {
        expect(game).toBeDefined();
    });

    it("should be able to create a game with some data", () => {
        expect(game).toBeInstanceOf(Game);
        expect(game.hostId).toBe("123");
        expect(game.players).toHaveLength(1);
    });

    it("should be able to return a summary of the game", () => {
        const summary = game.summary;

        expect(summary).toBeDefined();
        expect(summary.hostId).toBe(initialPlayer.playerId);
        expect(summary.players).toHaveLength(1);
        expect(summary.didGameStart).toBeFalsy();
        expect(summary.rounds).toHaveLength(0);
    });

    it("should be able to end a game", () => {
        game.end();

        expect(game.hostId).toBe("");
        expect(game.players).toHaveLength(0);
        expect(game.didGameStart).toBeFalsy();
        expect(game.rounds).toHaveLength(0);
    });

    it("should be able to reset a game", () => {
        game.reset();

        expect(game.hostId).toBe(initialPlayer.playerId);
        expect(game.players).toHaveLength(1);
        expect(game.players[0].character).toBeNull();
        expect(game.players[0].score).toBe(0);
        expect(game.didGameStart).toBeFalsy();
        expect(game.rounds).toHaveLength(0);
    });

    it("shoulld be able to start a game", () => {
        expect(game.start()).toBeTruthy();

        expect(game.didGameStart).toBeTruthy();
    });

    it("should be able to start a game with a killer", () => {
        expect(game.start("123")).toBeTruthy();

        expect(game.didGameStart).toBeTruthy();
        expect(game.rounds).toHaveLength(1);
        expect(game.currentRound).toBeDefined();
        expect(game.currentRound.killerId).toBe("123");
    });

    it("should not able to start a game", () => {
        game.reset();
        expect(game.start()).toBeFalsy();
    });

    it("should return all players in the game", () => {
        expect(game.players).toHaveLength(1);
    });

    it("should be able to disconnect a player", async () => {
        expect(game.disconnectPlayer("123")).toBeTruthy();
    });

    it("should not be able to disconnect a player when not passed one", () => {
        expect(game.disconnectPlayer("")).toBeFalsy();
    });

    it("should be able to define Zeca player favorite action", () => {        
        expect(game.addPlayer("ZecaPlayer", "1234")).toBeTruthy();
        game.findPlayerByName("ZecaPlayer").character = Characters.findByName('Zeca');

        expect(game.start()).toBeTruthy();
        expect(game.findPlayerByCharacter('Zeca').character).toBeDefined();
        expect(game.findPlayerByCharacter('Zeca').character.favoriteAction).toBe(game.findPlayerById(initialPlayer.playerId).character.favoriteAction);
    });
});
