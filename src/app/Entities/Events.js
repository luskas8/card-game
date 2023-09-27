import { Server, Socket } from "socket.io";
import { Error } from "../Core/utils.js";
import Game, { GameStates } from "../Entities/Game.js";
import logger from "../Entities/Logger.js";
import chooseCharacterUseCase from "../UseCases/chooseCharacterUseCase.js";
import newConnectionUseCase from "../UseCases/newConnectionUseCase.js";
import startGameUseCase from "../UseCases/startGameUseCase.js";


export default class Events {
    /** @type {string[]} */ events = [];
    constructor() {
        this.events = [
            "new-connection",
            "choose-character",
            "start-game",
            "disconnect",
            "choose-action"
        ];
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
        if (data === "all") {
            io.emit("game-status-update", Game.game);
            return;
        }
        io.emit("game-status-update", data);
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

    async test() {
        console.log("test");
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
            socket.on(event, async (data) => {
                await _this[event](socket, io, data);
            });
        });
    }
}