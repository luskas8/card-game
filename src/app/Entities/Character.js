/**
 * @enum {string}
 * @readonly
 */
export const CharacterActions = {
    JOKER: "joker",
    CAMPING: "camping",
    FOOD: "food",
    BOAT: "boat",
    BONFIRE: "bonfire",
    MEDITATE: "meditate",
};

export class BaseCharacter {
    /** @type {string} */ name;
    /** @type {CharacterActions} */ favoriteAction;
    constructor(name, favoriteAction) {
        this.name = name;
        this.favoriteAction = favoriteAction;
    }
}

class Characters {
    /** @type {BaseCharacter[]} */ characters;

    constructor(initialCharacters) {
        this.characters = initialCharacters;
    }

    get getAll() {
        return this.characters;
    }

    get characterListSize() {
        return this.characters.length;
    }

    findByName(name) {
        return this.characters.find((character) => character.name === name);
    }
}

const defaultCharacter = [
    new BaseCharacter("Zeca", CharacterActions.JOKER, { inUse: false }),
    new BaseCharacter("Fred", CharacterActions.BOAT, { inUse: false }),
    new BaseCharacter("Jaimin", CharacterActions.BONFIRE, { inUse: false }),
    new BaseCharacter("Tati", CharacterActions.CAMPING, { inUse: false }),
    new BaseCharacter("Bocão", CharacterActions.FOOD, { inUse: false }),
    new BaseCharacter("Serena", CharacterActions.MEDITATE, { inUse: false }),
];

export default new Characters(defaultCharacter);
