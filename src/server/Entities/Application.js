import express, { json } from "express";
import { createServer, Server } from "http";

import router from "../routes.js";
import Game from "./Game.js";
import logger from "./Logger.js";
import { pinoHttp } from "pino-http";

class App {
    /** @type {express} */ _express = null;
    /** @type {Server} */ _server = null;
    /** @type {Game} */ game = null;

    constructor() {
        this.server;
        this.middlewares();
        this.routes();
    }

    get express() {
        if (!this._express) {
            this._express = express();
            logger.info("Express initialized");
        }

        return this._express;
    }

    get server() {
        if (!this._server) {
            this._server = createServer(this.express);
            logger.info("Server initialized");
        }

        return this._server;
    }

    middlewares() {
        const app = this.express;

        app.use(pinoHttp({ logger }));
        app.use(json());
    }

    routes() {
        const express = this.express;
        express.use(router);
    }
}

export default new App();
