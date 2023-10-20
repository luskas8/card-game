import { beforeEach, describe, expect, it } from "vitest";
import Round from "../../src/Entities/Round";

describe("Test round entity", () => {
    /** @type {Round} */ let round;
    const killerId = "1234";
    beforeEach(() => {
        round = new Round(killerId);
    })
    it("should create a new round", () => {
        expect(round).toBeInstanceOf(Round);
    });

    it("should create a turn when create round", () => {
        expect(round.currentTurn).toBeDefined();
    });

    it("should be able to start a new turn", () => {
        expect(round.nextTurn()).toBe(true);
        expect(round.currentTurn).toBeDefined();
    });

    it("should not be able to start a new turn when reached max turns", () => {
        round.MAX_TURNS = 1;
        expect(round.nextTurn()).toBe(false);
    });

    it("should return the turns", () => {
        expect(round.turns).toBeDefined();
        expect(round.turns).toHaveLength(1);
    });

    it("should return the summary", () => {
        expect(round.summary).toBeDefined();
        expect(round.summary).toEqual({
            killerId,
            turns: round.turns,
        });
    });
});