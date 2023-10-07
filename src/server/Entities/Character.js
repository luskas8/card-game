export class BaseCharacter {
    name = "";
    favoriteAction = "";

    constructor(name, favoriteAction) {
        this.name = name;
        this.favoriteAction = favoriteAction;
    }
}

export class Characters {
    static characters = [
        new BaseCharacter("Bocão", "food"),
        new BaseCharacter("Fred", "boat"),
        new BaseCharacter("Jaime", "bonfire"),
        new BaseCharacter("Serena", "meditate"),
        new BaseCharacter("Tati", "camping"),
        new BaseCharacter("Zeca", ""),
    ];

    static findByName(name) {
        return this.characters.find((character) => character.name === name);
    }
}
