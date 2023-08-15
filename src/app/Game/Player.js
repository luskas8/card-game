import logger from "../logger.js"

class Player {
    constructor(name, socketID, options = {}) {
        this.name = name
        this.socketID = socketID
        this.character = options.character || null
        this._isHost = options.isHost || false
        this._isReady = options.isReady || false
        this.isTheKiller = options.isTheKiller || false
        this._wasTheKiller = options.wasTheKiller || false
    }

    get host() {
        return this._isHost
    }

    turnHost() {
        this._isHost = true
    }

    ready() {
        this._isReady = true
    }

    unready() {
        this._isReady = false
    }
}


class Players {
    /** @type {Player[]} */ _players
    constructor() {
        this._players = []
    }

    get players() {
        return this._players
    }

    player(name) {
        return this._players.find(player => player.name === name)
    }

    socket(socketID) {
        return this._players.find(player => player.socketID === socketID)
    }

    add(name, socketID, options = {}) {
        if (this.player(name) || this.socket(socketID)) {
            return "player already exists"
        }

        this._players.push(new Player(name, socketID, options))
        return "success"
    }

    disconect(socketID) {
        const playerToDisconect = this.socket(socketID)

        if (!playerToDisconect) {
            logger.info(`Player ${socketID} not found`)
            return
        }

        // if (playerToDisconect.host) {
        //     this._players = []
        //     Game.close()
        //     logger.info(`Host ${playerToDisconect.name} disconected, game close`)
        //     return
        // }

        this.remove(playerToDisconect)
    }

    /**
     * @param {Player} playerToRemove 
     * @returns 
     */
    remove(playerToRemove) {
        if (!playerToRemove) {
            return
        }

        // if (deletedPlayer.host) {
        //     Game.close()
        //     return
        // }

        this._players = this._players.filter(player => player.socketID !== playerToRemove.socketID)
    }
}

export default new Players()
