import express, { json } from "express";
import { createServer, Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

import logger from "./Logger.js";
import router from "../routes.js";

class App {
    /** @type {express} */ _express = null;
    /** @type {Server} */ _server = null;

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

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        app.use(json());
        app.use("/", express.static(path.join(__dirname, "..")));
    }

    routes() {
        const express = this.express;
        express.use(router);
    }

    listen(port) {
        const server = this.server;
        try {
            server.listen(port, () => {
                logger.info(`Running on http://localhost:${port}`);
            });
        } catch (error) {
            logger.fatal(error, "Failed to start server");
            process.exit(1);
        }
    }
}

export default new App();
