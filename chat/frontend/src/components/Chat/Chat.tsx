import { FC, useState, useRef, createContext } from 'react';
import ChatTextfied from '../Chat-textfied';
import Messages from '../Messages';
import style from './style.module.css';
import FileUploadModal from '../FileUploadModal';
import ChatHeader from '../Chat-header';
import ChatSidebar from '../Chat-Sidebar';
import Auth from '../Auth';
import { ImageMessage, MessageType } from './types';
import MessageHoc from '../Message';

interface ChatProps {

}
export const UserContext = createContext<User>(null);

type User = { 'name': string, 'uuid': string } | null;

const Chat: FC<ChatProps> = () => {
	const [user, setUser] = useState<User>(null);
	const [openModal, setOpenModal] = useState(false);
	const [messages, setMessages] = useState<Array<ImageMessage | MessageType>>([])
	const socket = useRef() as React.MutableRefObject<WebSocket>;

	const socketSend = (message: ImageMessage | Omit<MessageType, 'uuid'>) => {
		return socket.current.send(JSON.stringify(message))
	}

	function connection(name: string) {
		socket.current = new WebSocket('ws://localhost:3344');
		socket.current.binaryType = 'blob';
		socket.current.onopen = () => {
			console.log('Подключение установлено')
			socket
				.current
				.send(JSON.stringify({ 'name': name, event: 'connection' }))
		};
		socket.current.onmessage = (event: MessageEvent) => {
			const message = JSON.parse(event.data);
			switch (message.event) {
				case 'connection':
					setUser({ name: message.name, uuid: message.uuid })
					break;
				case 'image':
					setMessages(oldMessages => [message, ...oldMessages])
					console.log(messages)
					break;
				case 'message':
					setMessages(oldMessages => [message, ...oldMessages])
					break;
				default:
					break;
			}
		};
		socket.current.onclose = (event: CloseEvent) => { console.log('closed connection') };
		socket.current.onerror = (event: Event) => { console.warn(event) };
	}
	return (
		<UserContext.Provider value={user}>
			<>
				<ChatSidebar />
				{user
					? <main className={style.main}>
						<ChatHeader />
						<Messages>
							{messages.map((message) => {
								return MessageHoc(message);
							})}
						</Messages>
						<ChatTextfied
							toggleModal={() => setOpenModal(!openModal)}
							socketSend={socketSend} />
						{openModal && <FileUploadModal
							toggleModal={() => setOpenModal(!openModal)}
							socketSend={socketSend}
						/>}
					</main>
					: <Auth connecting={connection} />
				}
			</>
		</UserContext.Provider>
	);
}

export default Chat;