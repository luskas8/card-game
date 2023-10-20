/**
 * @typedef {string[]} Actions
 */

export default class Turn {
    killerId = "";
    killerMaxActions = 0;
    /** @type {string, Actions} */ chosenActions = {};

    /**
     * @param {string} killerId
     * @param {int} killerMaxActions
     * @constructor
     */
    constructor(killerId, killerMaxActions) {
        this.killerId = killerId;
        this.killerMaxActions = killerMaxActions;
    }

    /**
     * @param {string} playerId
     * @param {Actions} actions
     * @returns {boolean}
     */
    chooseAction(playerId, actions) {
        const { killerId, chosenActions, killerMaxActions } = this;

        if (actions.length === 0) {
            return false; //"Killer must choose at least one action";
        }

        if ((playerId === killerId && actions.length > killerMaxActions) || (playerId !== killerId && actions.length > 1)) {
            return false; //"Too many actions";
        }

        if (playerId !== killerId && chosenActions[playerId]) {
            return false; //"All actions chosen for this turn";
        }

        this.chosenActions[playerId] = [...actions];
        return true;
    }
}
