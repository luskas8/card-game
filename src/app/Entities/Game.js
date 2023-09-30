import Characters from "./Character.js";
import Round from "./Round.js";
import { Player } from "./Player.js";
import logger from "./Logger.js";

// /**
//  * @readonly
//  * @enum {string}
//  */
// export const GameStates = {
//     WAITING_PLAYERS: "waiting_for_players",
//     WAITING_HOST: "waiting_for_host",
//     STARTED: "started",
//     FINISHED: "finished",
//     PAUSED: "paused",
// };

class Game {
    /** @type {string} Host socketID */ _host;
    /** @type {Player[]} */ _players;
    /** @type {boolean} */ _wasStarted;
    /** @type {string[]} */ _playersNotWasKillerSocketID;
    /** @type {number} */ _currentRotation;
    /** @type {Round[]} */ _rounds;

    constructor() {
        this._host = "";
        this._players = [];
        this._wasStarted = false;
        this._playersNotWasKillerSocketID = [];
        this._currentRotation = 1;
        this._maxPlayers = 6;
        this._rounds = [];
    }

    get game() {
        return {
            host: this._host,
            players: this._players.map((player) => {
                return {
                    name: player.name,
                    isHost: player.host,
                    character: player.character,
                    baseScore: player.baseScore,
                    killerScore: player.killerScore,
                    isKiller: player.isTheKiller,
                };
            }),
            start: this._wasStarted,
            rounds: this._rounds.map((round) => {
                return {
                    currentTurn: round.currentTurn,
                    turs: round.tursHistory,
                }
            })
        };
    }

    get players() {
        return this._players;
    }

    get host() {
        return this._host;
    }

    get getKillerIds() {
        return this._rounds.map((round) => round.killer);
    }

    /**
     * @param {string} socketId
     */
    set host(socketId) {
        this._host = socketId;
    }

    get wasStarted() {
        return this._wasStarted;
    }

    get maxPlayers() {
        return this._maxPlayers;
    }

    async close() {
        try {
            await Characters.reset;
            this._players = [];
            this._host = "";
            this._wasStarted = false;
        } catch (err) {
            logger.error(err);
        }
    }

    start() {
        this._wasStarted = true;
    }

    /**
     * @param {Round} round
     */
    addRound(round) {
        this._rounds.push(round)
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

    findPlayerByCharacter(characterName) {
        return this._players.find(
            (player) => player.character && player.character.name === characterName
        );
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

            if (this._host === "") {
                this._host = socketID;
            }

            this._players.push(
                new Player(name, socketID, { ...options })
            );
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
        return true;
    }
}

export default new Game();
