import Game from "../Entities/Game.js";
import { Characters } from "../Entities/Character.js";

export class Success {
    constructor(status = 200, message) {
        this.status = status;
        this.message = message;
    }

    /**
     *
     * @param {any} message
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static message(message = "Success") {
        return new Success(this.status, message);
    }

    /**
     *
     * @param {any} message
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static created(message = "Created") {
        return new Success(201, message);
    }

    /**
     *
     * @param {any} message
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static accepted(message = "Accepted") {
        return new Success(202, message);
    }
}

export class Error {
    constructor(status = 500, message) {
        this.status = status;
        this.message = message;
    }

    /**
     *
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static message(message = "Error") {
        return new Error(this.status, message);
    }

    /**
     *
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     * @example
     */
    static badRequest(message = "Bad Request") {
        return new Error(400, message);
    }

    /**
     *
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static unauthorized(message = "Unauthorized") {
        return new Error(401, message);
    }

    /**
     *
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static forbidden(message = "Forbidden") {
        return new Error(403, message);
    }

    /**
     *
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static notFound(message = "Not Found") {
        return new Error(404, message);
    }
}

export const isObject = (data) => data && typeof data === "object";

export const mappedActions = {
    /**
     *
     * @param {Game} game
     * @param {Object} data
     */
    "update-players": (game, data) => {
        const playerIdStr = "playerId";
        const characterStr = "characterName";

        if (playerIdStr in data) {
            const { name: playerName, [playerIdStr]: playerId } = data;
            const playerIndex = game.players.findIndex(
                (p) => p.playerId === data[playerIdStr]
            );

            if (playerIndex === -1 && playerName) {
                game.addPlayer(playerName, playerId);
            } else if (characterStr in data) {
                const character = Characters.findByName(data[characterStr]);
                game.players[playerIndex].character = character;
            }
        }
    },
    "update-game": (game, data) => {
        const entries = Object.entries(data);
        for (const [key, value] of entries) {
            game[key] = value;
        }
    },
};
