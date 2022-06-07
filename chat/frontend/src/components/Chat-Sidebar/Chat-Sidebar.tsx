import { FC } from 'react';
import { ChatSideBarProps } from './type';
import style from './style.module.css';

const ChatSideBar: FC<ChatSideBarProps> = () => {
	return (
		<aside id="sidebar" className={style.sidebar}>
			<section id="widget_1"></section>
			<section id="widget_2"></section>
			<section id="widget_3"></section>
		</aside>
	);
}

export default ChatSideBar;