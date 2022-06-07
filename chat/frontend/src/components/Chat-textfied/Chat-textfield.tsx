import { FC, useContext, useRef, useState } from 'react';
import style from './style.module.css';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import { ImageMessage, MessageType } from '../Chat/types';
import { UserContext } from '../Chat/Chat';
import sanitizeHtml from 'sanitize-html';
import { sanitazeInputFromHtml } from '../../util/sanitazeInputFromHtml';


interface ChatTextFieldProps {
	toggleModal: () => void;
	socketSend: (message: ImageMessage | MessageType) => void;
}

const ChatTextField: FC<ChatTextFieldProps> = ({ toggleModal, socketSend }) => {
	const { uuid, name } = useContext(UserContext);

	const [inputValue, setInputValue] = useState('');
	const text = useRef('');
	const handleChange = (evt: ContentEditableEvent) => {
		text.current = sanitazeInputFromHtml(evt.target.value)
		setInputValue(text.current)
	};
	const handleBlur = () => {
		if (sanitazeInputFromHtml(text.current).length === 0) {
			text.current = '';
			setInputValue('');
		}
		console.log(text.current);
	};
	const handleClickSend = () => {
		socketSend({
			event: 'message',
			authorName: name,
			authorUuid: uuid,
			date: Date.now(),
			text: inputValue,
		})
		text.current = '';
		setInputValue(text.current)
	}

	return (
		<div className={style['text-fild-wrapper']}>
			<button className={style.button} onClick={toggleModal}>
				<AttachFileRoundedIcon color='primary' />
			</button>
			<ContentEditable
				id='input'
				className={style.input}
				data-placeholder="Введите текст сообщения"
				html={text.current}
				onBlur={handleBlur}
				onChange={handleChange} />
			<button
				className={style.button}
				disabled={inputValue.length ? false : true}
				onClick={handleClickSend}
			>
				<SendRoundedIcon fontSize='medium' color='primary' />
			</button>
			<button className={style.button}>
				<KeyboardVoiceRoundedIcon fontSize='medium' color='primary' />
			</button>
		</div>
	);
}

export default ChatTextField;

