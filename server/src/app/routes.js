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
    res.json({ status: Game.game });
});

router.get("/game-end", async (req, res) => {
    Game.end();
    res.json({ statusCode: 200, message: "Game ended!" });
});

export default router;
