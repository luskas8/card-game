export default class Player {
    character = null;
    killerScore = 0;
    baseScore = 0;

    /**
     * @param {string} name
     * @param {string} socketID
     * @returns {Player}
     * @constructor
     */
    constructor(name, socketID) {
        this.name = name;
        this.socketID = socketID;
    }

    /** It's total score: baseScore + killerScore
     * @returns {number}
     */
    get score() {
        return this.baseScore + this.killerScore;
    }
}
