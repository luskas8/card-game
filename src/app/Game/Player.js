import logger from "../logger.js"
import Socket from "../socket.js"

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
        return this._players.find(player => player._socketID === socketID)
    }

    add(name, socketID, options = {}) {
        if (this.player(name)) {
            return
        }

        this._players.push(new Player(name, socketID, options))
    }

    disconect(socketID) {
        const disconectPlayer = this.socket(socketID)

        if (!disconectPlayer) {
            logger.info(`Player ${socketID} not found`)
            return
        }

        if (disconectPlayer.host) {
            this._players = []
            Socket.io.disconnectSockets(true)
            return
        }
        logger("before", this._players.length)
        const index = this._players.indexOf((player) => player._socketID === socketID)
        this._players = this._players.splice(index, 1)
        logger("after", this._players.length)
    }

    remove(name) {
        const deletedPlayer = this.player(name)

        if (!deletedPlayer) {
            return
        }

        if (deletedPlayer.host) {
            Socket.io.disconnectSockets(true)
            return
        }

        this._players = this._players.filter(player => player.name !== name)
    }
}

export default new Players()
