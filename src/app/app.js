import express, { json } from 'express'
import { createServer } from 'http'
import logger from './logger.js'
import router from './routes.js'

class App {
    _express = null
    _server = null

    constructor() {
        this.server
        this.middlewares()
        this.routes()
    }

    get express() {
        if (!this._express) {
            this._express = express()
            logger.info('Express initialized')
        }

        return this._express
    }

    get server() {
        if (!this._server) {
            this._server = createServer(this.express)
            logger.info('Server initialized')
        }

        return this._server
    }

    middlewares() {
        const express = this.express
        express.use(json())
    }

    routes() {
        const express = this.express
        express.use(router)
    }

    listen(port) {
        const server = this.server
        try {
            server.listen(port, () => {
                logger.info(`Running on http://localhost:${port}`)
            })
        } catch (error) {
            logger.fatal(error, 'Failed to start server')
            process.exit(1)
        }
    }
}

export default new App()
