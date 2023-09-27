import { Turn } from "./Turn.js";

export default class Round {
    MAX_TURNS = 3;
    /** @type {number} */ _currentTurn = 0;
    /** @type {string | null} Killer socketID */ _killer = null;
    /** @type {Turn[]} */ _tursHistory = [];

    constructor(killer) {
        this._killer = killer;
        this.tursHistory.push(new Turn(this._currentTurn));
    }

    get nextRound() {
        this.currentTurn += 1;
        if (this._currentTurn >= this.MAX_TURNS) {
            this._currentTurn = this.MAX_TURNS;
            return false;
        }

        return true;
    }

    get currentTurn() {
        return this._currentTurn;
    }

    get killer() {
        return this._killer;
    }

    get tursHistory() {
        return this._tursHistory;
    }

    get reset() {
        this._currentTurn = 0;
        this._tursHistory = [];
        this._killer = null;
    }

    get newTurn() {
        if (this._currentTurn >= this.MAX_TURNS) {
            return false;
        }

        this.tursHistory.push(new Turn(this._currentTurn));
        return true;
    }

    set killer(killer) {
        this._killer = killer;
    }
}
