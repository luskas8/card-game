/**
 * @enum {string}
 */
const Places = {
    ALL: "all",
    CAMPING: "camping",
    FOOD: "food",
    BOAT: "boat",
    BONFIRE: "bonfire",
    MEDITATE: "meditate",
}

export class BaseCharacter {
    constructor(name, favoritePlace) {
        this.name = name
        this.favoritePlace = favoritePlace
        this.playerSocketId = ''
        this.inUse = false
    }
}

class Characters {
    /** @type {BaseCharacter[]} */ characters

    constructor() {
        this.characters = []
    }

    get all() {
        return this.characters
    }

    /**
     * @param {BaseCharacter} character 
     */
    add(character) {
        if (this.findByName(character.name)) {
            return null
        }

        this.characters.push(character)
        return character
    }

    /**
     * @param {BaseCharacter} characterToRemove 
     */
    remove(characterToRemove) {
        if (!this.findBySocket(characterToRemove.name)) {
            return false
        }
        this.characters = this.characters.filter(character => character.name !== characterToRemove.name)
        return true
    }

    findByName(name) {
        return this.characters.find(character => character.name === name)
    }

    findBySocket(playerSocketId) {
        return this.characters.find(character => character.playerSocketId === playerSocketId)
    }

    use(characterName, playerSocketId) {
        const character = this.findByName(characterName)
        if (!character) {
            return false
        }

        character = { ...character, playerSocketId, inUse: true }
        return true
    }

    release(characterName) {
        const character = this.findByName(characterName)
        if (!character) {
            return false
        }

        character = { ...character, playerSocketId: '', inUse: false }
        return true
    }

    reset() {
        this.characters = []
    }
}

const characters = new Characters()



export default characters