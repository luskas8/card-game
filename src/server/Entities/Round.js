import Turn from "./Turn.js";

export default class Round {
    MAX_TURNS = 3;
    currentTurnIndex = 0;
    /** @type {Turn[]}  */ turnsHistory = [];
    killerId = "";

    /**
     * @param {string} killerId
     * @returns {Round}
     * @constructor
     */
    constructor(killerId) {
        this.killerId = killerId;
        this.nextRound();
    }

    canStartANewTurn() {
        return this.currentTurnIndex < this.MAX_TURNS;
    }

    get turns() {
        return this.turnsHistory.map((turn) => turn.chosenActions);
    }

    get currentTurn() {
        return [...this.turns].pop();
    }

    nextRound() {
        const { currentTurnIndex, turnsHistory, killerId } = this;

        if (this.canStartANewTurn()) {
            this.currentTurnIndex += 1;
            turnsHistory.push(new Turn(killerId, currentTurnIndex));
            return true;
        }

        return false;
    }
}
