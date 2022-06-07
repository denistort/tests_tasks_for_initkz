import { FC, useContext } from 'react';
import { UserContext } from '../Chat/Chat';
import { ImageMessage, MessageType } from '../Chat/types';
import FromYou from './From-you';
import ImageMsg from './Image-message';
import NotFromYou from './Not-From-Yout';

const Message: FC<MessageType> = ({ date, authorName, authorUuid, text }) => {
	const { uuid } = useContext(UserContext);
	return (
		uuid === authorUuid
			? <FromYou key={date} text={text} date={date} author={authorName} />
			: <NotFromYou key={date} text={text} date={date} author={authorName} />
	);
}

const MessageHoc = (message: ImageMessage | MessageType) => {
	if (message.event === 'image') {
		return <ImageMsg
			key={message.uuid}
			event={'image'}
			uuid={message.uuid}
			authorUuid={message.authorUuid}
			authorName={message.authorName}
			fileName={message.fileName}
			mimeType={message.mimeType}
			date={message.date}
			fileArrayBuffer={message.fileArrayBuffer} />
	}
	if (message.event === 'message') {
		return <Message
			event={'message'}
			uuid={message.uuid}
			authorName={message.authorName}
			authorUuid={message.authorUuid}
			date={message.date}
			text={message.text}
		/>
	}
}
export default MessageHoc;