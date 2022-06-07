import { Button, TextField } from '@mui/material';
import { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import style from './style.module.css';

interface AuthProps {
	connecting: (name: string) => void
}

const Auth: FC<AuthProps> = ({ connecting }) => {
	const [inputValue, setInputValue] = useState('');
	return (
		<section className={style.auth}>
			<h1>Привет, нужно знать как тебя звать :)</h1>
			<div>
				<TextField
					fullWidth
					label="Введите свое имя"
					id="fullWidth"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<Button
					variant="contained"
					endIcon={<SendIcon />}
					onClick={() => connecting(inputValue)}
					disabled={!inputValue.length ? true : false}
				>
					Send
				</Button>
			</div>
		</section>
	);
}

export default Auth;