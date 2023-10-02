import App from "./app/Entities/Application.js";
import Game from "./app/Entities/Game.js";
import Socket from "./app/Entities/SocketEntity.js";

const port = process.env.PORT || 3000;

const game = new Game();

Socket.init(App.server, game);
App.listen(port);
