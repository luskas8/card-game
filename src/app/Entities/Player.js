import { CharacterActions } from "./Character";

export class Player {
    /**
     * @param {string} name
     * @param {string} socketID
     * @param {Object} options
     * @param {string?} options.character
     * @param {boolean?} options.isHost
     * @param {boolean?} options.isReady
     * @param {boolean?} options.isTheKiller
     * @param {boolean?} options.wasTheKiller
     * @param {number?} options.killerScore
     * @param {number?} options.baseScore
     * @param {CharacterActions[]?} options.choosedActions
     * @returns {Player}
     * @constructor
     */
    constructor(name, socketID, options = {}) {
        this.name = name;
        this.socketID = socketID;
        this.character = options.character || null;
        this._isHost = options.isHost || false;
        this._isReady = options.isReady || false;
        this.isTheKiller = options.isTheKiller || false;
        this._wasTheKiller = options.wasTheKiller || false;
        this._killerScore = options.killerScore || 0;
        this._baseScore = options.baseScore || 0;
        this.choosedActions = options.choosedActions || [];
    }

    /** Total score of the player: baseScore + killerScore
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

    get host() {
        return this._isHost;
    }

    get isReady() {
        return this._isReady;
    }

    get resetActions() {
        this.choosedActions = [];
    }

    turnHost() {
        this._isHost = true;
    }

    ready() {
        if (this.isTheKiller && this.choosedActions.length >= 3) {
            this._isReady = true;
        } else if (!this.isTheKiller && this.choosedActions.length == 1) {
            this._isReady = true;
        }
    }

    unready() {
        this._isReady = false;
    }

    chooseAction(action) {
        if (this.choosedActions.includes(action)) {
            return false;
        }

        this.choosedActions.push(action);
        this.ready();
        return true;
    }
}
