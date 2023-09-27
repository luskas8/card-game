import { BaseCharacter } from "../../app/Entities/Character.js";
import { Player } from "../../app/Entities/Player.js";

describe("Test player entity", () => {
    /** @type {Player} */
    let player;

    beforeEach(() => {
        player = new Player('John', '1234', {
            character: new BaseCharacter('killer', 'kill'),
            wasTheKiller: true,
            killerScore: 10,
            baseScore: 20,
        });
    });

    it('should have a name and socketID', () => {
        expect(player.name).toBe('John');
        expect(player.socketID).toBe('1234');
    });

    it('should have a character', () => {
        expect(player.character).toBeDefined();
        expect(player.character.name).toBe('killer');
    });

    it('should have a score', () => {
        expect(player.score).toBe(30);
    });

    it('should be able to set the isKiller property of its character', () => {
        player.isKiller = false;
        expect(player.isKiller).toBe(false);
    });
});
