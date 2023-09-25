/**
 * @typedef {Object.<string, string[]>} PlayersChoosedActions
 */

export class Turn {
    _killerMaxActions = 0;
    _killerChoosedActions = []
    /** @type {PlayersChoosedActions} */ _playersChoosedActions = {}

    constructor(killerMaxActions) {
        this._killerMaxActions = killerMaxActions;
    }

    choosePlayerAction(player, action) {
        if (this._playersChoosedActions[player.socketID]) {
            return false;
        }

        this._playersChoosedActions[player.socketID] = [...action];
        return true;
    }

    chooseKillerActions(actions) {
        if (this._killerChoosedActions.length == this._killerMaxActions) {
            return false;
        }

        this._killerChoosedActions = [...actions];
        return true;
    }

    get turnResume() {
        const result = [];
        Object.keys(this._playersChoosedActions).forEach((socketID) => {
            result.push({
                socketID,
                action: this._playersChoosedActions[socketID],
                killed: this._killerChoosedActions.includes(this._playersChoosedActions[socketID]),
            })
        });

        return result;
    }
}
