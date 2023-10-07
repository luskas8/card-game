import Game from "./Entities/Game.js";
import { Characters } from "./Entities/Character.js";
import { isObject, mappedActions, storage } from "./Core/utils.js";

const $enterGameBtn = document.querySelector('button[name="new-connection"]');
const $chooseCharacterBtn = document.querySelector(
    'button[name="choose-character"]'
);
const $startGameBtn = document.querySelector('button[name="start-game"]');
const $disconnectBtn = document.querySelector('button[name="start-game"]');

const socket = io();

socket.on("connect", () => {
    let characterName = storage.retriveLocalData("characterName") || "";
    let playerName = storage.retriveLocalData("playerName") || "";
    const { connected, id: playerId } = socket;

    if (characterName) {
        console.log(characterName);
        socket.emit("reconnect", { characterName, name: playerName });
    }

    console.log("> Conectei!", { connected, playerId });

    socket.on("new-connection", (data) => {
        if (!data.success) {
            alert(data.error);
            return;
        }

        const game = new Game(data);
        storage.saveLocalData("playerName", game.findPlayerById(playerId).name);
        $enterGameBtn.disabled = true;
        $chooseCharacterBtn.disabled = false;

        const checkIfShouldDisplayStartGameBtn = () => {
            if (game.hostId === socket.id) {
                $startGameBtn.hidden = false;
            }
        };

        checkIfShouldDisplayStartGameBtn();

        console.log("> Iniciei o jogo!", game.summary);

        $chooseCharacterBtn.addEventListener(
            "click",
            () => {
                const { characters } = Characters;
                const index = game.getRandomInt(characters.length);
                characterName = characters[index].name;
                socket.emit("choose-character", { characterName });
            },
            false
        );

        $disconnectBtn.addEventListener(
            "click",
            () => socket.emit("disconnect"),
            false
        );

        socket.on("choose-character", (data) => {
            if (data.success) {
                $chooseCharacterBtn.disabled = true;
                $startGameBtn.disabled = false;
                $disconnectBtn.disabled = false;

                mappedActions["update-players"](game, {
                    playerId,
                    characterName,
                });
                storage.saveLocalData("characterName", game.findPlayerById(playerId).character.name);

                console.log("> Escolhi o meu personagem!", game.summary);

                $startGameBtn.addEventListener(
                    "click",
                    () => socket.emit("start-game"),
                    false
                );
            } else {
                console.error("> Erro ao escolher o personagem:", data);
            }
        });

        socket.on("game-status-update", (data) => {
            const actionStr = "action";
            if (isObject(data) && actionStr in data) {
                const action = data[actionStr];

                if (action in mappedActions) {
                    mappedActions[action](game, data.data);
                }
            }
            checkIfShouldDisplayStartGameBtn();
            console.log("> Ajustei as informações do jogador!", game.summary);
        });

        socket.on("start-game", (data) => {
            if (data.success) {
                $startGameBtn.disabled = true;

                if (game.start(data.killerId)) {
                    console.log("> Started game:", game.summary);
                } else {
                    console.error("Failed to start game");
                }
            } else {
                alert(data.error);
            }
        });
    });

    $enterGameBtn.disabled = false;
    $enterGameBtn.addEventListener(
        "click",
        () =>
            socket.emit("new-connection", {
                name: "freirart" + Math.random(),
            }),
        false
    );
});
