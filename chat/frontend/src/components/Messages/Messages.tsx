import { FC } from 'react';
import { MessagesProps } from './types';
import style from './style.module.css'

const Messages: FC<MessagesProps> = ({ children }) => {
	return (
		<section className={style.messages}>
			{children}
		</section>
	);
}

export default Messages;