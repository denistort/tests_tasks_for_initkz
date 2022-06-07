const MessageTypes = require('./MessageTypes');
const { v4: uuidv4 } = require('uuid');

function MessageFactory({ socket, wsServer }) {
	return Object.freeze({
		handleMessage
	})
	function broadCastMessageForAll(message, func) {
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
				broadCastMessageForAll(message, func)
				break;
			case MessageTypes.Connection:
				socketSend({ ...message, uuid: socket.userId })
				break;
			case MessageTypes.Disconnect:
				break;
			default:
				break;
		}
	}
}

module.exports = MessageFactory;