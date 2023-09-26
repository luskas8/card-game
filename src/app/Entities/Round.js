import { Turn } from "./Turn.js";

export default class Round {
    MAX_TURNS = 3;
    _currentTurn = 0;
    _killer = null;
    _tursHistory = [];

    constructor(killer) {
        this._killer = killer;
        this.tursHistory.push(new Turn(this._currentTurn));
    }

    get nextRound() {
        this.currentTurn += 1;
        if (this._currentTurn >= this.MAX_TURNS) {
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

    get currentTurn() {
        return this._tursHistory[this._currentTurn];
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
