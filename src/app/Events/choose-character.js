import Players from "../Game/Player.js"
import characters from "../Game/Character.js"
import { Server, Socket } from "socket.io"

/**
 * @param {Socket} socket 
 * @param {Server} io 
 * @param {Object} data
 * @param {String} data.characterName 
 */
export default async function chooseCharacter(socket, io, data) {
    if (!Players.findByName(socket.id)) {
        socket.emit("choose-character-error", {
            error: "You are not in a game"
        })
        return
    }
    
    if (!data.characterName) {
        socket.emit("choose-character-error", {
            error: "No character name provided"
        })
        return
    }
    
    const character = characters.findByName(name)
    
    if (character.inUse) {
        socket.emit("choose-character-error", {
            error: "Character already in use"
        })
        return
    }

    const using = await character.use(socket.id)

    if (!using) {
        socket.emit("choose-character-error", {
            error: "Something went wrong"
        })
        return
    }

    socket.emit("choose-character-success", {
        character: character.name
    })
    return
}