import { FC } from 'react';
import { ChatHeaderProps } from './type';
import style from './style.module.css'

const ChatHeader: FC<ChatHeaderProps> = () => {
	return (
		<header className={style.header}>
			<h1>Header Chat</h1>
		</header>
	);
}

export default ChatHeader;