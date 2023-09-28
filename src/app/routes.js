import { Router } from "express";
import logger from "./Entities/Logger.js";
import Game from "./Entities/Game.js";

const router = Router();

router.get("/health", async (req, res) => {
    logger.warn("Health check");
    res.json({ statusCode: 200, message: "Server online!" });
});

router.get("/", async (req, res) => {
    res.redirect(308, "/health");
});

// TODO: Create and use a auth middleware routes below

router.get("/game-status", async (req, res) => {
    res.json({ status: Game.status });
});

router.get("/game-close", async (req, res) => {
    Game.close();
    res.json({ statusCode: 200, message: "Game closed!" });
});

export default router;
