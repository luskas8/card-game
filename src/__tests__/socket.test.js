import App from '../app/app.js'
import { Server } from 'socket.io'
import client from 'socket.io-client'

test('socket.io connection', () => {
    const port = process.env.PORT || 3000
    const app = new App()
    const io = new Server(app.server)

    io.on('connection', (socket) => {
        expect(socket).toBeDefined()
    })

    const clientSocket = client.connect(`http://localhost:${port}`)

    clientSocket.disconnect()
    io.close()
})