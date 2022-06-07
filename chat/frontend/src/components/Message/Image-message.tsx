import { FC, useContext } from 'react';
import style from './style.module.css';
import { dateFormatter } from '../../util/dateFormatter';
import { ImageMessage } from '../Chat/types';
import { UserContext } from '../Chat/Chat';

const ImageMsg: FC<ImageMessage> =
	({ fileArrayBuffer, fileName, mimeType, date, authorName, authorUuid }) => {
		// const blob = new Blob(fileArrayBuffer, { type: mimeType })
		// URL.createObjectURL(blob)
		const { uuid } = useContext(UserContext);
		if (uuid === authorUuid) {
			return (
				<div className={`${style['message-wrapper']} ${style['from-you']}`}>
					<div className={style['from-you-body']}>
						<div className={style.authorName}>{authorName}</div>
						<img
							style={{ maxWidth: '300px', objectFit: 'cover' }}
							src={fileArrayBuffer}
							alt={fileName}
						/>
						<span className={style['time']}>
							{dateFormatter(date)}
						</span>
					</div>
				</div>
			);
		}
		return (
			<div className={`${style['message-wrapper']} ${style['not-from-you']}`}>
				<div className={style['not-from-you-body']}>
					<div className={style.authorName}>{authorName}</div>
					<img
						style={{ maxWidth: '300px', objectFit: 'cover' }}
						src={fileArrayBuffer}
						alt={fileName}
					/>
					<span className={style['time']}>
						{dateFormatter(date)}
					</span>
				</div>
			</div>
		);
	}

export default ImageMsg;