import { beforeEach, describe, expect, it } from "vitest";
import Turn from "../../src/Entities/Turn";

describe("Test turn entity", () => {
    /** @type {Turn} */let turn;
    const killerId = "1234";
    const killerMaxActions = 2;
    beforeEach(() => {
        turn = new Turn(killerId, killerMaxActions);
    });

    it("should create a new turn", () => {
        expect(turn).toBeInstanceOf(Turn);
    });

    it("should be able to choose an action", () => {
        const actions = ["a"];
        turn.chooseAction(killerId, actions);
        expect(turn.chosenActions[killerId]).toEqual(actions);
    });

    it("should not be able to choose an action if not send actions", () => {
        const actions = [];
        expect(turn.chooseAction(killerId, actions)).toBe(false);
    });

    it("should not be able to choose an action if choose more actions than allowed", () => {
        const actions = Array(killerMaxActions+1).fill("action");
        expect(turn.chooseAction(killerId, actions)).toBe(false);
        expect(turn.chooseAction("otherId", actions)).toBe(false);
    });

    it("should not be able to choose an action when was chosen some action", () => {
        const action = ["action"];
        expect(turn.chooseAction("otherId", action)).toBe(true);
        expect(turn.chooseAction("otherId", action)).toBe(false);
    });
});