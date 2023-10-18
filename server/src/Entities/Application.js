import express, { json, Router } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import logger from "./Logger.js";

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
        app.use(json());
        app.use(cors());
    }

    routes() {
        const router = Router();

        router.get("/health", async (req, res) => {
            logger.warn("Health check");
            res.json({ statusCode: 200, message: "Server online!" });
        });

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        router.use(
            "/",
            express.static(path.join(__dirname, "..", "..", "..", "dist"))
        );

        router.use("*", (_, res) => res.redirect("/health"));

        this.express.use(router);
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
