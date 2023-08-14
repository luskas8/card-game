import App from './app/app.js'
import Socket from './app/socket.js'

const app = new App()
const io = new Socket(app.server)

const port = process.env.PORT || 3000

app.listen(port)
