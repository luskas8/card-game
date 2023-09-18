import App from "./app/Entities/Application.js";
import Socket from "./app/Entities/SocketEntity.js";

const port = process.env.PORT || 3000;

Socket.init(App.server);
App.listen(port);
