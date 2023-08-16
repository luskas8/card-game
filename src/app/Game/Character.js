/**
 * @enum {string}
 * @readonly
 */
export const Places = {
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

    get inUse() {
        return this.inUse
    }

    async use(playerSocketId) {
        const usePromise = new Promise((resolve, reject) => {
            if (!playerSocketId) {
                reject(false)
            }

            if (this.inUse) {
                reject(false)
            }

            this.inUse = true
            this.playerSocketId = playerSocketId
            resolve(true)
        })

        return usePromise.then(() => true).catch(() => false)
    }

    get release() {
        const usePromise = new Promise((resolve, reject) => {
            if (!this.inUse) {
                reject(false)
            }

            this.inUse = false
            this.playerSocketId = ''
            resolve(true)
        })

        return usePromise.then(() => true).catch(() => false)
    }
}

class Characters {
    /** @type {BaseCharacter[]} */ characters

    constructor(initialCharacters) {
        this.characters = initialCharacters
    }

    get all() {
        return this.characters
    }

    get size() {
        return this.characters.length
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
        if (!this.findByName(characterToRemove.name)) {
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

    findByPlace(favoritePlace) {
        return this.characters.filter(character => character.favoritePlace === favoritePlace)
    }

    reset() {
        this.characters = [
            new BaseCharacter("Zeca", Places.ALL),
            new BaseCharacter("Fred", Places.BOAT),
            new BaseCharacter("Jaimin", Places.BONFIRE),
            new BaseCharacter("Tati", Places.CAMPING),
            new BaseCharacter("Bocão", Places.FOOD),
            new BaseCharacter("Serena", Places.MEDITATE),
        ]
    }
}

export default new Characters([
    new BaseCharacter("Zeca", Places.ALL),
    new BaseCharacter("Fred", Places.BOAT),
    new BaseCharacter("Jaimin", Places.BONFIRE),
    new BaseCharacter("Tati", Places.CAMPING),
    new BaseCharacter("Bocão", Places.FOOD),
    new BaseCharacter("Serena", Places.MEDITATE),
])