import Characters from "./Character.js"
import { Player } from "./Player.js"

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
    /** @type {Player[]} */ _players
    /** @type {GameStates} */ _currentState

    constructor() {
        this._hostSocketId = ""
        this._players = []
        this._currentState = GameStates.WAITING_PLAYERS
    }

    get game() {
        return {
            host: this._hostSocketId,
            players: this._players,
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

    get currentState() {
        return this._currentState
    }

    async close() {
        await new Promise(async (resolve, reject) => {
            try {
                await Characters.reset
                this._players = []
                this._hostSocketId = ""
                this._currentState = GameStates.WAITING_PLAYERS
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    async start(hostSocketId) {
        const startPromise = new Promise((resolve, reject) => {
            if (!hostSocketId) {
                reject('Host socketId is required')
            }
    
            if (hostSocketId !== this._hostSocketId) {
                reject('You are not the host')
            }
    
            if (this._currentState === GameStates.STARTED) {
                reject("Game already started")
            }
    
            if (this._players.length < 3) {
                reject('You need at least 3 players')
            }
    
            this._currentState = GameStates.STARTED
            resolve('Game started')
        })

        return startPromise.then((data) => data).catch((error) => error)
    }

    allPlayersHasCharacter() {
        return this._players.every(player => player.character != null)
    }

    get size() {
        return this._players.length
    }

    findPlayerByName(name) {
        return this._players.find(player => player.name === name)
    }

    findPlayerBySocket(socketID) {
        return this._players.find(player => player.socketID === socketID)
    }

    async addPlayer(name, socketID, options = {}) {
        if (this.findPlayerByName(name) || this.findPlayerBySocket(socketID)) {
            return "player already exists"
        }
        const addPromise = new Promise((resolve, _) => {
            this._players.push(new Player(name, socketID, options))
            resolve("success")
        })

        return addPromise.then((data) => data).catch((error) => error)
    }

    /**
     * @param {Player} playerToDisconnect
     */
    disconectPlayer(playerToDisconnect) {
        if (!playerToDisconnect) {
            return false
        }

        this._players = this._players.filter(player => player.socketID !== playerToDisconnect.socketID)
        return true
    }
}

export default new Game()
