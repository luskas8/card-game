import App from "./src/Entities/Application.js";
import Game from "./src/Entities/Game.js";
import Socket from "./src/Entities/SocketEntity.js";

const port = process.env.PORT || 3000;

const game = new Game();

Socket.init(App.server, game);
App.listen(port);
