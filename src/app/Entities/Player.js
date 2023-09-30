import { BaseCharacter } from "./Character.js";

export class Player {
    /**
     * @param {string} name
     * @param {string} socketID
     * @param {Object} options
     * @param {BaseCharacter?} options.character
     * @param {boolean?} options.wasTheKiller
     * @param {number?} options.killerScore
     * @param {number?} options.baseScore
     * @returns {Player}
     * @constructor
     */
    constructor(name, socketID, options = {}) {
        this.name = name;
        this.socketID = socketID;
        this.character = options.character || null;
        this._wasTheKiller = options.wasTheKiller || false;
        this._killerScore = options.killerScore || 0;
        this._baseScore = options.baseScore || 0;
    }

    /** It's total score: baseScore + killerScore
     * @returns {number}
     */
    get score() {
        return this.baseScore + this.killerScore;
    }

    get killerScore() {
        return this._killerScore;
    }

    get baseScore() {
        return this._baseScore;
    }

    /**
     * @returns {boolean}
     */
    get isKiller() {
        return this.character && this.character.isTheKiller;
    }

    set isKiller(value) {
        if (this.character) {
            this.character.isTheKiller = value;
        }
    }
}
