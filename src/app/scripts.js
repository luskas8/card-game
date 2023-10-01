import Game from "./Entities/Game.js";
import Characters from "./Entities/Character.js";

(function (win, doc) {
    const game = new Game();

    const $enterGameBtn = doc.querySelector('button[name="new-connection"]');
    const $chooseActionBtn = doc.querySelector(
        'button[name="choose-character"]'
    );
    const $startGame = doc.querySelector('button[name="choose-character"]');

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
            });

            socket.on("start-game", (data) => {
                console.log("> Start Game:", data);
            });

            socket.on("game-status-update", (data) => {
                console.log("> Game Status Update:", data);
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
})(window, document);
