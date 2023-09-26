import Characters from "./Character.js";
import Round from "./Round.js";
import { Player } from "./Player.js";
import logger from "./Logger.js";

/**
 * @readonly
 * @enum {string}
 */
export const GameStates = {
    WAITING_PLAYERS: "waiting_for_players",
    WAITING_HOST: "waiting_for_host",
    STARTED: "started",
    FINISHED: "finished",
    PAUSED: "paused",
};

class Game {
    /** @type {string} */ _hostSocketId;
    /** @type {Player[]} */ _players;
    /** @type {GameStates} */ _currentState;
    /** @type {string} */ _currentKillerSocketID;
    /** @type {string[]} */ _playersNotWasKillerSocketID;
    /** @type {number} */ _currentRotation;
    /** @type {string[]} */ _roundDeaths;
    /** @type {Round} */ _currentRound;

    constructor() {
        this._hostSocketId = "";
        this._currentKillerSocketID = "";
        this._players = [];
        this._currentState = GameStates.WAITING_PLAYERS;
        this._playersNotWasKillerSocketID = [];
        this._currentRotation = 1;
        this._roundDeaths = [];
        this._currentRound = null;
    }

    get game() {
        return {
            host: this._hostSocketId,
            players: this._players.map((player) => {
                return {
                    name: player.name,
                    isHost: player.host,
                    character: player.character,
                    baseScore: player.baseScore,
                    killerScore: player.killerScore,
                    isKiller: player.isTheKiller,
                    actions: player.choosedActions,
                };
            }),
            state: this._currentState,
            killer: this._currentKillerSocketID,
        };
    }

    get players() {
        return this._players;
    }

    get hostSocketId() {
        return this._hostSocketId;
    }

    get playersNotWasKillerSocketID() {
        return this._playersNotWasKillerSocketID;
    }

    get killer() {
        return this._players.find(
            (player) => player.socketID === this._currentKillerSocketID
        );
    }

    get killerSocketID() {
        return this._currentKillerSocketID;
    }

    get currentRotation() {
        return this._currentRotation;
    }

    set killerSocketID(socketID) {
        this._currentKillerSocketID = socketID;
    }

    /**
     * @param {string} socketId
     */
    set hostSocketId(socketId) {
        this._hostSocketId = socketId;
    }

    /**
     * @param {GameStates} state
     */
    updateState(state) {
        this._currentState = state;
    }

    get currentState() {
        return this._currentState;
    }

    async close() {
        try {
            await Characters.reset;
            this._players = [];
            this._hostSocketId = "";
            this._currentState = GameStates.WAITING_PLAYERS;
        } catch (err) {
            logger.error(err);
        }
    }

    start() {
        this._currentState = GameStates.STARTED;
    }

    addRound() {
        this._currentRound += 1;
    }

    allPlayersHasCharacter() {
        return this._players.every((player) => player.character != null);
    }

    allPlayersAreReady() {
        return this._players.every((player) => player.isReady);
    }

    allPlayersWasKiller() {
        return this._players.every((player) => player._wasTheKiller);
    }

    get playerListSize() {
        return this._players.length;
    }

    findPlayerByName(name) {
        return this._players.find((player) => player.name === name);
    }

    findPlayerBySocket(socketID) {
        return this._players.find((player) => player.socketID === socketID);
    }

    async addPlayer(name, socketID, options = {}) {
        return new Promise((resolve, reject) => {
            if (
                this.findPlayerByName(name) ||
                this.findPlayerBySocket(socketID)
            ) {
                reject("player already exists");
            }

            const isHost = this._hostSocketId === "";
            if (isHost) {
                this._hostSocketId = socketID;
            }

            this._players.push(
                new Player(name, socketID, { ...options, isHost })
            );
            this.playersNotWasKillerSocketID.push(socketID);
            resolve("success");
        });
    }

    /**
     * @param {Player} playerToDisconnect
     */
    disconnectPlayer(playerToDisconnect) {
        if (!playerToDisconnect) {
            return false;
        }

        this._players = this._players.filter(
            (player) => player.socketID !== playerToDisconnect.socketID
        );
        this._playersNotWasKillerSocketID =
            this.playersNotWasKillerSocketID.filter(
                (socketID) => socketID !== playerToDisconnect.socketID
            );
        return true;
    }
}

export default new Game();
