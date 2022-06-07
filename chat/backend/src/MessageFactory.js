const MessageTypes = require('./MessageTypes');
const { v4: uuidv4 } = require('uuid');

function MessageFactory({ socket, wsServer }) {
	return Object.freeze({
		handleMessage
	})
	function broadCastMessageForAll(message, func) {
		// wsServer.clients.forEach(client => { 
		// 	client.send(JSON.stringify(message), isBinary) 
		// })
		func(message)
	}

	async function socketSend(message) {
		return socket.send(JSON.stringify(message))
	}

	function handleMessage(message, func) {
		message = JSON.parse(message);
		switch (message.event) {
			case MessageTypes.Message:
				message.uuid = uuidv4()
				broadCastMessageForAll(message, func)
				break;
			case MessageTypes.Image:
				console.log(message)
				broadCastMessageForAll(message, func)
				break;
			case MessageTypes.Connection:
				console.log({ ...message, uuid: socket.userId })
				socketSend({ ...message, uuid: socket.userId })
				break;
			case MessageTypes.Disconnect:
				// console.log(message)
				break;
			default:
				// console.log(message)
				break;
		}
	}
}

module.exports = MessageFactory;