import { FC } from 'react';
import { MessageProps } from './types';
import style from './style.module.css';
import { dateFormatter } from '../../util/dateFormatter';

type NotFromYouProps = Omit<MessageProps, 'currentUser'>

const NotFromYou: FC<NotFromYouProps> = ({ text, date }) => {
	return (
		<div className={`${style['message-wrapper']} ${style['not-from-you']}`}>
			<div className={style['not-from-you-body']}>
				{text}
				<span className={style['time']}>
					{dateFormatter(date)}
				</span>
			</div>
		</div>
	);
}

export default NotFromYou;