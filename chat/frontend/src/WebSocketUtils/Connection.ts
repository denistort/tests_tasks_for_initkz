import { useEffect } from 'react';

interface ConnetionOptions {
	url: string;
	socket: React.MutableRefObject<WebSocket>;
	onopen: () => OnOpenReturnObject,
	onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
	onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
	onerror: ((this: WebSocket, ev: Event) => any) | null;
}

type OnOpenReturnObject = {
	'event': 'connection'
}
export const connection = (
	{ socket, url, onmessage, onclose, onerror, onopen }: ConnetionOptions) => {
	useEffect(() => {
		socket.current = new WebSocket(url);
		socket.current.onopen = () => {
			console.log('Подключение установлено')
			socket
				.current
				.send(JSON.stringify(onopen()))
		};
		socket.current.onmessage = onmessage;
		socket.current.onclose = onclose;
		socket.current.onerror = onerror;
	}, [socket])
}