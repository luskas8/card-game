import React from "react";
import { connect, io, Socket } from "socket.io-client";

import Game from "../server/src/Entities/Game";
import { Characters } from "../server/src/Entities/Character";
import {
    isObjectWithProps,
    mappedActions,
    isObject,
} from "../server/src/Core/utils";

class App extends React.Component {
    state = {
        playerId: undefined,
        isHost: undefined,
        playerName: "",
        didPlayerEnteredTheGame: false,
        characterName: undefined,
    };

    /** @type {Socket} */ socket = undefined;
    /** @type {Game} */ game = undefined;

    componentDidMount() {
        if (!this.socket) {
            const socket =
                import.meta.env.ENVIRONMENT !== "PROD"
                    ? connect("http://localhost:3000")
                    : io();

            this.socket = socket;

            socket.on("connect", () => this.startSocketEvents(socket));
        }
    }

    startSocketEvents = (socket) => {
        const { connected, id: playerId } = socket;

        console.log("> Conectei!", { connected, playerId });

        this.setState({ playerId });

        socket.on("new-connection", (data) => {
            if (!data.success) {
                alert(data.error);
                return;
            }

            const game = new Game(data);

            this.game = game;

            this.checkIfPlayerIsTheHost();

            console.log("> Iniciei o jogo!", game.summary);

            socket.on("choose-character", this.chooseCharacterResponse);

            socket.on("game-status-update", this.updateGame);

            socket.on("start-game", this.startGameResponse);
        });
    };

    displayStandardConnectionError = () => {
        console.error(
            "A conexão entre o cliente e o servidor não foi estabelecida com sucessso!"
        );
    };

    checkIfPlayerIsTheHost = () => {
        const { game, socket, state } = this;
        const { playerId, didPlayerEnteredTheGame } = state;

        if (game && socket) {
            const newState = {};

            if (game.hostId === socket.id) {
                newState.isHost = true;
            } else if (
                !didPlayerEnteredTheGame &&
                game.findPlayerById(playerId)
            ) {
                newState.didPlayerEnteredTheGame = true;
            }

            if (isObjectWithProps(newState)) {
                this.setState({ ...newState });
            }
        } else {
            this.displayStandardConnectionError();
        }
    };

    enterGame = () => {
        const { playerId, playerName: name } = this.state;

        if (playerId) {
            this.socket.emit("new-connection", { name });
        } else {
            this.displayStandardConnectionError();
        }
    };

    chooseCharacterEmit = () => {
        const { socket, game, state } = this;
        const { playerId, characterName } = state;

        if (playerId && !characterName) {
            const { characters } = Characters;
            const index = game.getRandomInt(characters.length);
            const characterName = characters[index].name;
            this.setState({ characterName });
            socket.emit("choose-character", { characterName });
        }
    };

    chooseCharacterResponse = (data) => {
        const { game, state } = this;

        if (data.success) {
            const { playerId, characterName } = state;
            mappedActions["update-players"](game, {
                playerId,
                characterName,
            });

            console.log("> Escolhi o meu personagem!", game.summary);
        } else {
            console.error("> Erro ao escolher o personagem:", data);
        }
    };

    updateGame = (data) => {
        const { game } = this;

        const actionStr = "action";

        if (isObject(data) && actionStr in data) {
            const action = data[actionStr];

            if (action in mappedActions) {
                mappedActions[action](game, data.data);
            }
        }

        this.checkIfPlayerIsTheHost();

        console.log("> Ajustei as informações do jogador!", game.summary);
    };

    startGameEmit = () => {
        if (this.state.isHost) {
            this.socket.emit("start-game");
        }
    };

    startGameResponse = (data) => {
        const { game } = this;

        if (data.success) {
            if (game.start(data.killerId)) {
                console.log("> Started game:", game.summary);
            } else {
                console.error("Failed to start game");
            }
        } else {
            alert(data.error);
        }
    };

    render() {
        const {
            isHost,
            playerId,
            characterName,
            didPlayerEnteredTheGame,
            playerName,
        } = this.state;

        return (
            <div>
                <h1>Por Favor Não Corte Minha Cabeça!</h1>
                <p>
                    <label htmlFor="playerName">
                        Como deseja ser chamado(a)?
                    </label>
                    <input
                        id="playerName"
                        type="text"
                        onChange={(e) =>
                            this.setState({ playerName: e.target.value })
                        }
                    />
                    <button
                        disabled={didPlayerEnteredTheGame || !playerName}
                        onClick={this.enterGame}
                    >
                        Enter Game
                    </button>
                </p>
                <br />
                <button disabled={!playerId} onClick={this.chooseCharacterEmit}>
                    Choose Character
                </button>
                {isHost ? (
                    <button
                        disabled={!characterName}
                        onClick={this.startGameEmit}
                    >
                        Start Game
                    </button>
                ) : null}
            </div>
        );
    }
}

export default App;
