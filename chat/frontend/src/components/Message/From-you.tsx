import { FC } from 'react';
import { MessageProps } from './types';
import style from './style.module.css';
import { dateFormatter } from '../../util/dateFormatter';

type fromYouProps = Omit<MessageProps, 'currentUser'>

const FromYou: FC<fromYouProps> = ({ text, date }) => {
	return (
		<div className={`${style['message-wrapper']} ${style['from-you']}`}>
			<div className={style['from-you-body']}>
				{text}
				<span className={style['time']}>
					{dateFormatter(date)}
				</span>
			</div>
		</div>
	);
}

export default FromYou;