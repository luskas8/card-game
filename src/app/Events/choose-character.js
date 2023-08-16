import Players from "../Game/Player.js"
import characters from "../Game/Character.js"
import { Server, Socket } from "socket.io"
import logger from "../logger.js"

/**
 * @param {Socket} socket 
 * @param {Server} io 
 * @param {Object} data
 * @param {String} data.characterName
 * @returns {Promise<boolean>}
 */
export default async function chooseCharacter(socket, io, data) {
    if (!Players.findBySocket(socket.id)) {
        logger.error({ error: "You are not in a game", socketId: socket.id })
        socket.emit("choose-character-error", {
            error: "You are not in a game"
        })
        return false
    }
    
    if (!data.characterName) {
        logger.error({ error: "No character name provided", socketId: socket.id })
        socket.emit("choose-character-error", {
            error: "No character name provided"
        })
        return false
    }
    
    const character = characters.findByName(data.characterName)
    
    if (character.inUse) {
        logger.error({ error: "Character already in use", socketId: socket.id })
        socket.emit("choose-character-error", {
            error: "Character already in use"
        })
        return false
    }

    const using = await character.use(socket.id)

    if (!using) {
        logger.error({ error: "Something went wrong", socketId: socket.id })
        socket.emit("choose-character-error", {
            error: "Something went wrong"
        })
        return false
    }

    socket.emit("choose-character-success", {
        character: character.name
    })
    return true
}