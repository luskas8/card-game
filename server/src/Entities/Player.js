import { BaseCharacter } from "./Character.js";

export default class Player {
    /** @type {BaseCharacter} */ character = null;
    killerScore = 0;
    baseScore = 0;

    /**
     * @param {string} name
     * @param {string} playerId
     * @returns {Player}
     * @constructor
     */
    constructor(name, playerId) {
        this.name = name;
        this.playerId = playerId;
    }

    /** It's total score: baseScore + killerScore
     * @returns {number}
     */
    get score() {
        return this.baseScore + this.killerScore;
    }

    reset() {
        this.character = null;
        this.killerScore = 0;
        this.baseScore = 0;
    }
}
