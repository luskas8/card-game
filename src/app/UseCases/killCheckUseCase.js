import Game from "../Entities/Game.js";

export async function killCheckUseCase() {
    return new Promise((resolve, reject) => {
        const killer = Game.findPlayerBySocket(Game.killerSocketID);
        const currentRoundDeath = Game._roundDeaths[Game.currentRotation-1];
        currentRoundDeath = [];
        Game.players.forEach((player) => {
            if (player.socketID !== Game.killerSocketID) {
                if (killer.choosedActions.includes(player.choosedActions[0])) {
                    currentRoundDeath.push(player.socketID);
                }
            }
        });

        resolve(true);
    });
}