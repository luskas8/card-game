export class Player {
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

    findByName(name) {
        return this._players.find(player => player.name === name)
    }

    findBySocket(socketID) {
        return this._players.find(player => player.socketID === socketID)
    }

    add(name, socketID, options = {}) {
        if (this.findByName(name) || this.findBySocket(socketID)) {
            return "player already exists"
        }

        this._players.push(new Player(name, socketID, options))
        return "success"
    }

    /**
     * @param {Player} playerToDisconnect
     */
    disconect(playerToDisconnect) {
        if (!playerToDisconnect) {
            return
        }

        this._players = this._players.filter(player => player.socketID !== playerToDisconnect.socketID)
    }
}

export default new Players()
