import { Server } from 'socket.io'
import mainEvent from './Events/index.js'
import logger from './logger.js'

class Socket {
    _io = null

    constructor(server) {
        this.init(server)
    }

    init(server) {
        if (!this._io) {
            this._io = new Server(server, { /* options */ })
            logger.info('Socket initialized')
        }

        this._io.on('connection', (socket) => {
            logger.info(`Socket connected: ${socket.id}`)
            mainEvent(socket, this._io)

            socket.on('disconnect', () => {
                logger.warn(`Socket disconnected: ${socket.id}`)
            })

            socket.on('error', (err) => {
                logger.error(`Socket error: ${err}`)
            })
        })
    }

    get io() {
        return this._io
    }
}

export default Socket
