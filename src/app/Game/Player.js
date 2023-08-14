import Socket from "../socket.js"

class Player {
    constructor(name, socketID, options = {}) {
        this.name = name
        this._socketID = socketID
        this._character = options.character || null
        this._isHost = options.isHost || false
        this._isReady = options.isReady || false
        this._isTheKiller = options.isTheKiller || false
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

    add(player) {
        if (this.player(player.name)) {
            return
        }

        this._players.push(player)
    }

    disconect(socketID) {
        const disconectPlayer = this.socket(socketID)

        if (!disconectPlayer) {
            return
        }

        if (disconectPlayer.host) {
            Socket.io.disconnectSockets(true)
            return
        }

        this._players = this._players.filter(player => player._socketID !== socketID)
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
