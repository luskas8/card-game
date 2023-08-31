import App from "./app/app.js";
import Socket from "./app/socket.js";

const port = process.env.PORT || 3000;

Socket.init(App.server);
App.listen(port);
