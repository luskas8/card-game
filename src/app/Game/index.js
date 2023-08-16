import Characters from "./Character.js"
import Players from "./Player.js"

/**
 * @readonly
 * @enum {string}
*/
export const GameStates = {
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
        this._hostSocketId = ""
        this._players = Players
        this._currentState = GameStates.WAITING_PLAYERS
    }

    get game() {
        return {
            host: this._hostSocketId,
            players: this._players.players,
            state: this._currentState
        }
    }

    get players() {
        return this._players
    }
    
    get hostSocketId() {
        return this._hostSocketId
    }

    /**
     * @param {string} socketId
     */
    set hostSocketId(socketId) {
        this._hostSocketId = socketId
    }

    /**
     * @param {GameStates} state 
     */
    updateState(state) {
        this._currentState = state
    }

    currentState() {
        return this._currentState
    }

    async close() {
        await new Promise(async (resolve, reject) => {
            try {
                await Characters.reset
                Players._players = []
                this._hostSocketId = ""
                this._currentState = GameStates.WAITING_PLAYERS
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    start(hostSocketId) {
        if (!hostSocketId) {
            return 'Host socketId is required'
        }

        if (hostSocketId !== this._hostSocketId) {
            return 'You are not the host'
        }

        if (this._currentState === GameStates.STARTED) {
            return this._currentState
        }

        if (this._players._players.length < 3) {
            return 'You need at least 3 players'
        }

        this._currentState = GameStates.STARTED
    }

    gameStatus() {
        return {
            players: this.players.players,
            status: this._currentState
        }
    }
}

export default new Game()
