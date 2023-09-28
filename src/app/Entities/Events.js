import { Server, Socket } from "socket.io";
import { Error } from "../Core/utils.js";
import chooseActionUseCase from "../UseCases/chooseActionUseCase.js";
import chooseCharacterUseCase from "../UseCases/chooseCharacterUseCase.js";
import newConnectionUseCase from "../UseCases/newConnectionUseCase.js";
import startGameUseCase from "../UseCases/startGameUseCase.js";
import Game, { GameStates } from "./Game.js";
import logger from "./Logger.js";

/**
 * @typedef {Object} EventType
 * @property {string} event
 * @property {string} function
 */

export default class Events {
    /** @type {EventType[]} */ events = [];
    constructor() {
        this.events = [
            { event: "new-connection", function: "newConnection"},
            { event: "choose-character", function: "chooseCharacter"},
            { event: "start-game", function: "startGame"},
            { event: "disconnect", function: "disconnect"},
            { event: "choose-action", function: "chooseAction"},
        ];
    }

    /**
     * @param {Socket} socket
     * @param {Server} io
     * @param {Object} data
     * @param {string[]} data.actions
     * @returns {Promise<boolean>}
     */
    async chooseAction(socket, io, data) {
        const result = chooseActionUseCase(socket.id, data);
        if (result instanceof Error) {
            socket.emit("choose-action-error", { message: result.message });
            return false;
        }

        this.gameStatusUpdate(io, {
            action: ["choosed-action"],
            data: { player: socket.id },
        });
        return true;
    }

    /**
     * @param {Socket} socket
     * @param {Server} io
     * @returns {Promise<boolean>}
     */
    async startGame(socket, io) {
        const result = await startGameUseCase(socket.id);
        if (result instanceof Error) {
            socket.emit("start-game-error", { message: result.message });
            return false;
        }

        // this.newRound(socket, io);

        this.gameStatusUpdate(io, {
            action: ["start-game"],
        });
        return true;
    }

    /**
     * @param {Socket} socket
     * @param {Server} io
     * @param {Object} data
     * @param {string} data.name
     * @returns {Promise<boolean>}
     */
    async newConnection(socket, io, data) {
        const newConnectionResponse = await newConnectionUseCase(
            socket.id,
            io
        );
        if (newConnectionResponse instanceof Error) {
            socket.emit("new-connection-error", {
                error: newConnectionResponse.message,
            });
            return false;
        }

        const chooseCharacterResponse = await chooseCharacterUseCase(
            socket.id,
            data
        );
        if (io.engine.clientsCount >= 3) {
            Game.updateState(GameStates.WAITING_HOST);
            io.emit(Game.currentState, {
                status: Game.currentState,
            });
        }

        let action = ["new-connection"];
        socket.emit("new-connection-success", {
            status: 201,
            message: "You are connected and choosed your character",
        });
        if (chooseCharacterResponse instanceof Error) {
            logger.error(response);
            socket.emit("choose-character-error", {
                error: chooseCharacterResponse.message,
            });
            return true;
        } else {
            action.push("choose-character");
        }

        this.gameStatusUpdate(io, {
            action,
            data: Game.findPlayerBySocket(socket.id),
        });
        return true;
    }

    /**
     * @param {Server} io
     */
    gameStatusUpdate(io, data) {
        io.emit("game-status-update", {
            action: data.action,
            data: data.data || Game.status,
        });
    }

    disconnect(socket) {
        const player = Game.findPlayerBySocket(socket.id);
        if (!player) {
            return;
        }

        Game.disconnectPlayer(player);
        this.gameStatusUpdate(io, {
            action: ["disconnect"],
            data: player.socketID,
        });
    }

    /**
     * @param {Socket} socket
     * @param {Server} io
     * @param {Object} data
     * @param {String} data.characterName
     * @returns {Promise<boolean>}
     */
    async chooseCharacter(socket, io, data) {
        const response = await chooseCharacterUseCase(socket.id, data);
        if (response instanceof Error) {
            logger.error(response);
            socket.emit("choose-character-error", { error: response.message });
            return false;
        }

        socket.emit("choose-character-success", response);
        this.gameStatusUpdate(io, {
            action: ["choose-character"],
            data: Game.findPlayerBySocket(socket.id),
        });
        return true;
    }

    /**
     * @param {Socket} socket
     * @param {Server} io
     * @returns {void}
     * @memberof Events
     * @static
     */
    static async registry(socket, io) {
        const _this = new Events();
        _this.events.forEach((event) => {
            socket.on(event.name, async (data) => {
                await _this[event.function](socket, io, data);
            });
        });
    }
}
