import Game from "../Entities/Game.js";

export default async function scoringUseCase() {
    return new Promise((resolve, reject) => {
        const killer = Game.findPlayerBySocket(Game.killerSocketID);
        let killerScore = 0
        Game.players.forEach((player) => {
            if (player.socketID !== Game.killerSocketID) {
                if (killer.choosedActions.includes(player.choosedActions[0])) {
                    killerScore += player.chooseAction[0] === player.character.favoriteAction ? 2 : 1;
                } else {
                    player._baseScore += player.chooseAction[0] === player.character.favoriteAction ? 2 : 1;
                }
            }
        });
        
        killer._killerScore = killerScore;
        if (Game.currentRotation === 3) {
            const playersDeathAllRounds = Game._roundDeaths[0]
                .filter(deaths => Game._roundDeaths[1].includes(deaths))
                .filter(deaths => Game._roundDeaths[2].includes(deaths))
            
            killer._killerScore += playersDeathAllRounds.length;
        }

        resolve(true);
    });
}