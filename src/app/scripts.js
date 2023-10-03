import Game from "./Entities/Game.js";
import Characters from "./Entities/Character.js";

const game = new Game();

const $enterGameBtn = document.querySelector('button[name="new-connection"]');
const $chooseActionBtn = document.querySelector(
    'button[name="choose-character"]'
);
const $startGame = document.querySelector('button[name="start-game"]');

const socket = io();

socket.on("connect", () => {
    console.log("> Conectei!", {
        connected: socket.connected,
        id: socket.id,
    });

    socket.on("new-connection", (data) => {
        console.log("> New Connection:", data);
        $enterGameBtn.disabled = true;
        $chooseActionBtn.disabled = false;
        $chooseActionBtn.addEventListener(
            "click",
            () => {
                const { characters } = Characters;
                const characterName =
                    characters[game.getRandomInt(characters.length)].name;
                socket.emit("choose-character", { characterName });
            },
            false
        );

        socket.on("choose-character", (data) => {
            console.log("> Choose Character:", data);
            if (data.success) {
                $chooseActionBtn.disabled = true;
                $startGame.disabled = false;
            }
        });

        socket.on("start-game", (data) => {
            if (data.success) {
                $startGame.disabled = true;
                alert("Game started!")
            }
        });

        socket.on("game-status-update", (data) => {
            console.log("> Game Status Update:", data);
            switch (data.action) {
            case "update-players":
                game.addPlayer(data.data);
                break;
            case "start-game":
                // TODO: Implement a custom start game event
                // to avoid create new Round with new random killer
                game.didGameStart = true;
                break;
            case "update-game":
                game.players = data.data.players;
                break;
            default:
                break;
            }
            if (data.players.length >= 1) {
                $startGame.disabled = false;
            }
        });
        
        socket.on('start-game', (data) => {
            console.log("> Start Game:", data);
        })
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

    $startGame.addEventListener(
        "click",
        () => {
            socket.emit("start-game");
            $startGame.disabled = true;
        },
        false
    );
});
