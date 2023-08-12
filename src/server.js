import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "./app/logger.js";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

app.get("/health", async (req, res) => {
  logger.warn("Health check");
  res.json({ status: 200, message: "Server online!" });
});

app.get("/", async (req, res) => {
  res.redirect(308, "/health");
});

console.log()

try {
  httpServer.listen(process.env.PORT || 3000, async () => {
    logger.info(`Running on http://localhost:${process.env.PORT || 3000}`);
  });
} catch (error) {
  logger.fatal(error, "Failed to start server");
  process.exit(1);
}