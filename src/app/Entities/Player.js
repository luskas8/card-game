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

    get isReady() {
        return this._isReady
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
