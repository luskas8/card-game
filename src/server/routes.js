import { Router } from "express";
import logger from "./Entities/Logger.js";
import Game from "./Entities/Game.js";
import Application from "./Entities/Application.js";

const router = Router();

router.get("/health", async (req, res) => {
    logger.warn("Health check");
    res.json({ statusCode: 200, message: "Server online!" });
});

// TODO: Create and use a auth middleware routes below

router.get("/game-status", async (req, res) => {
    res.json({ status: Application.game.summary });
});

router.get("/game-end", async (req, res) => {
    Application.game.end();
    res.json({ statusCode: 200, message: "Game ended!" });
});

export default router;
