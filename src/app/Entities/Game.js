import Round from "./Round.js";
import Player from "./Player.js";

import { isObject } from "../Core/utils.js";

class Game {
    hostId = "";
    /** @type {Player[]}*/ players = [];
    didGameStart = false;
    maxPlayers = 6;
    /** @type {Round[]} */ rounds = [];

    /**
     *
     * @param {Object} data
     * @param {Game} data.game
     */
    constructor(data) {
        if (isObject(data)) {
            const { hostId, players } = data.game;
            this.hostId = hostId;
            this.players = players;
        }
    }

    get summary() {
        return {
            hostId: this.hostId,
            players: this.players.map((player) => {
                const {
                    name,
                    character,
                    baseScore,
                    killerScore,
                    score,
                    playerId,
                } = player;

                return {
                    name,
                    character,
                    baseScore,
                    killerScore,
                    score,
                    playerId,
                };
            }),
            didGameStart: this.didGameStart,
            rounds: this.rounds.map((r) => r.summary),
        };
    }

    get killerIds() {
        return this.rounds.map((round) => round.killerId);
    }

    end() {
        this.hostId = "";
        this.players = [];
        this.didGameStart = false;
        this.maxPlayers = 6;
        this.rounds = [];
    }

    start() {
        this.didGameStart = true;
        return this.nextRound();
    }

    get currentRound() {
        return [...this.rounds].pop();
    }

    getRandomInt = (max) => Math.floor(Math.random() * max);

    getRandomPlayerId(killerIds = []) {
        const { players } = this;

        const playersPool = killerIds.length
            ? players.filter((p) => !killerIds.includes(p.playerId))
            : players;

        const playerIndex = this.getRandomInt(playersPool.length - 1);

        return playersPool[playerIndex].playerId;
    }

    nextRound() {
        const { killerIds, currentRound } = this;

        if (!currentRound || !currentRound.canStartANewTurn()) {
            const killerId = this.getRandomPlayerId(killerIds);

            this.rounds.push(new Round(killerId));
            return true;
        }

        return false;
    }

    allPlayersChoseACharacter() {
        return this.players.every((player) => player.character != null);
    }

    /**
     * @param {string} playerName
     */
    findPlayerByName(playerName) {
        return this.players.find((player) => player.name === playerName);
    }

    /**
     * @param {string} characterName
     */
    findPlayerByCharacter(characterName) {
        return this.players.find(
            (p) => p.character && p.character.name === characterName
        );
    }

    /**
     * @param {string} playerId
     */
    findPlayerById(playerId) {
        return this.players.find((player) => player.playerId === playerId);
    }

    /**
     * @param {string} playerName
     * @param {string} playerId
     */
    addPlayer(playerName, playerId) {
        if (
            this.findPlayerByName(playerName) ||
            this.findPlayerById(playerId)
        ) {
            return false;
        }

        if (this.hostId === "") {
            this.hostId = playerId;
        }

        this.players.push(new Player(playerName, playerId));
        return true;
    }

    /**
     * @param {string} playerId
     */
    disconnectPlayer(playerId, shouldReassignHostId = true) {
        const { players, hostId, didGameStart, killerIds } = this;

        if (!playerId || !players.find((p) => p.playerId === playerId)) {
            return false;
        }

        this.players = players.filter((p) => p.playerId !== playerId);

        if (shouldReassignHostId && playerId === hostId && !didGameStart) {
            this.hostId = this.getRandomPlayerId(killerIds);
        }

        return true;
    }
}

export default Game;
