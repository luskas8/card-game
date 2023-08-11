import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

app.get("/health", async (req, res) => {
  res.json({ status: 200, message: "Server online!" });
});

app.get("/", async (req, res) => {
  res.redirect(308, "/health");
});

httpServer.listen(process.env.PORT || 3000, async () => {
  console.log(`Running on http://localhost:${process.env.PORT || 3000}`);
});