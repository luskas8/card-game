import { Router } from "express";
import { validateToken } from "./Core/auth.js";
import Application from "./Entities/Application.js";
import logger from "./Entities/Logger.js";

const router = Router();

router.get("/health", async (req, res) => {
    logger.warn("Health check");
    res.json({ statusCode: 200, message: "Server online!" });
});

router.use(validateToken);

router.post("/game-status", async (req, res) => {
    res.json({ status: Application.game.summary });
});

router.post("/game-end", async (req, res) => {
    Application.game.end();
    res.json({ statusCode: 200, message: "Game ended!" });
});

router.all("*", async (req, res) => {
    res.redirect("/");
})

export default router;
