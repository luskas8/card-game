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
    constructor(name, favoritePlace, options = {}) {
        this.name = name
        this.favoritePlace = favoritePlace
        this.playerSocketId = options.playerSocketId || ''
        this._inUse = options.inUse || false
    }

    get inUse() {
        return this._inUse
    }

    /**
     * 
     * @param {string} playerSocketId
     * @returns {Promise<string>}
     */
    async use(playerSocketId) {
        const usePromise = new Promise((resolve, reject) => {
            if (!playerSocketId) {
                reject("No playerSocketId provided")
            }

            if (this._inUse) {
                reject("Character already in use")
            }

            this._inUse = true
            this.playerSocketId = playerSocketId
            resolve("Success")
        })

        return usePromise.then((success) => success).catch((error) => error)
    }

    get release() {
        const usePromise = new Promise((resolve, reject) => {
            if (!this._inUse) {
                reject(false)
            }

            this._inUse = false
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

    get reset() {
        const resetPromise = new Promise((resolve, _) => {
            this.characters = [
                new BaseCharacter("Zeca", Places.ALL, { inUse: false }),
                new BaseCharacter("Fred", Places.BOAT, { inUse: false }),
                new BaseCharacter("Jaimin", Places.BONFIRE, { inUse: false }),
                new BaseCharacter("Tati", Places.CAMPING, { inUse: false }),
                new BaseCharacter("Bocão", Places.FOOD, { inUse: false }),
                new BaseCharacter("Serena", Places.MEDITATE, { inUse: false }),
            ]
            resolve(true)
        })

        return resetPromise.then(() => true).catch(() => false)
    }
}

const defaultCharacter = [
    new BaseCharacter("Zeca", Places.ALL, { inUse: false }),
    new BaseCharacter("Fred", Places.BOAT, { inUse: false }),
    new BaseCharacter("Jaimin", Places.BONFIRE, { inUse: false }),
    new BaseCharacter("Tati", Places.CAMPING, { inUse: false }),
    new BaseCharacter("Bocão", Places.FOOD, { inUse: false }),
    new BaseCharacter("Serena", Places.MEDITATE, { inUse: false }),
]

export default new Characters(defaultCharacter)