import { Server, Socket } from "socket.io"
import { createServer } from "http"
import Client from "socket.io-client"
import mainEvent from "../app/Events/index.js"
import logger from "../app/logger.js"
import Game, { GameStates } from "../app/Game/index.js"

describe("Socket", () => {
    /**  @type {Server} */ let io
    /**  @type {Socket} */ let clientSocket, port

    beforeEach((done) => {
        const httpServer = createServer()
        io = new Server(httpServer)
        httpServer.listen(() => {
            port = httpServer.address().port
            clientSocket = new Client(`http://localhost:${port}`)
            io.on("connection", (socket) => {
                mainEvent(socket, io)
            })
            clientSocket.on("connect", done)
        })
    })

    afterEach(async () => {
        logger.info(`CLIENT ID ${clientSocket.id}`)
        await Game.close()
        clientSocket.disconnect(true)
        io.close()
    })

    test("should connect a new player", (done) => {
        clientSocket.emit("new-connection", { name: "test" })

        clientSocket.on("new-connection-success", (data) => {
            expect(data).toHaveProperty("gameStatus")
            done()
        })
    })

    test("should disconnect a player", (done) => {
        clientSocket.emit("new-connection", { name: "test" })
        const self = clientSocket.disconnect(true)

        expect(self.disconnected).toBe(true)
        done()
    })

    test("should disconnect a player and remove from game", (done) => {
        clientSocket.emit("new-connection", { name: "test" })
        const self = clientSocket.disconnect(true)

        expect(self.disconnected).toBe(true)

        clientSocket = new Client(`http://localhost:${port}`)
        clientSocket.emit("request-game-status")

        clientSocket.on("game-status-update", (data) => {
            expect(data).toHaveProperty("players")
            expect(data.players.socketID).not.toBe(clientSocket.id)
            expect(data).toHaveProperty("status")
            expect(data.status).toBe(GameStates.WAITING_PLAYERS)
            done()
        })
    })

    test("should choose a character", (done) => {
        clientSocket.emit("new-connection", { name: "test" })

        clientSocket.on("new-connection-success", () => {
            clientSocket.emit("choose-character", { characterName: "Zeca" })
        })

        clientSocket.on("choose-character-success", (data) => {
            expect(data).toHaveProperty("character")
            expect(data.character).toBe("Zeca")
            done()
        })
    })
})