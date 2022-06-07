const ws = require('ws');
const dotenv = require('dotenv')
const { v4: uuidv4 } = require('uuid');
const MessageFactory = require('./MessageFactory');
dotenv.config({})
const { PORT } = process.env;

const webSocketServer = new ws.Server({
	port: PORT,
}, () => { console.log(`SERVER STARTED ON => ${PORT}`) })

webSocketServer.on('connection', (socket) => {
	socket.userId = uuidv4()
	const messageFactory = MessageFactory({ socket, webSocketServer });
	socket.on('message', (message) => {

		messageFactory.handleMessage(message, broadCastMessage);
	})
	socket.on('close', () => { console.log() })
})

function broadCastMessage (message) {
	webSocketServer.clients.forEach(client => {
		client.send(JSON.stringify(message))
	})
}