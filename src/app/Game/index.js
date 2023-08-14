import Socket from "../socket.js"
import Players from "./Player.js"

/**
 * @readonly
 * @enum {string}
*/
const GameStates = {
    WAITING_PLAYERS: 'waiting_for_players',
    WAITING_HOST: 'waiting_for_host',
    STARTED: 'started',
    FINISHED: 'finished',
    PAUSED: 'paused'
}

class Game {
    /** @type {string} */ _hostSocketId
    /** @type {Players} */ _players
    /** @type {GameStates} */ _currentState

    constructor() {
        this._hostSocketId = null
        this._players = Players
    }

    get game() {
        return {

        }
    }

    close() {
        Socket.io.disconnectSockets(true)
    }

    start(hostSocketId) {
        if (!hostSocketId) {
            return 'Host socketId is required'
        }

        if (hostSocketId !== this._hostSocketId) {
            return 'You are not the host'
        }
    }

    status() {
        return {
            hostSocketId: this._hostSocketId,
            players: this._players._players,
            "status": this._currentState
        }
    }
}

export default new Game()
