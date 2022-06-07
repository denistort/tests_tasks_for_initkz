import { FC, useContext, useState } from 'react';
import { FileUploadModalProps } from './types';
import style from './style.module.css';
import { FileUploader } from 'react-drag-drop-files';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../Chat/Chat';
import { v4 as uuidv4 } from 'uuid';
const fileTypes = ["JPEG", "PNG", "GIF", 'JPG'];

const FileUploadModal: FC<FileUploadModalProps> = ({ toggleModal, socketSend }) => {
	const [file, setFile] = useState<FileList | null>(null);
	const { name, uuid } = useContext(UserContext);

	const handleChange = (file: FileList) => {
		setFile(file);
		console.log(file);
	};
	const handleClickClear = () => {
		setFile(null);
	};
	const onClickSendPicture = () => {
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file[0]);
			reader.onload = function (event) {
				socketSend({
					event: 'image',
					uuid: uuidv4(),
					authorUuid: uuid,
					authorName: name,
					mimeType: file[0].type,
					fileName: file[0].name,
					date: Date.now(),
					fileArrayBuffer: event.target.result,
				});
				setFile(null)
				toggleModal()
			}
			reader.onerror = function (event) {
				console.log('Error reading file: ', event);
			}
		}
	}
	return (
		<div className={style.modal}>
			<CloseIcon
				className={style.close}
				fontSize={'large'}
				htmlColor='var(--text-color-white)'
				onClick={toggleModal}
			/>
			<h1 style={{ color: 'var(--text-color-white)' }}>Here Drag & Drop Images</h1>
			{file === null && <FileUploader
				multiple={true}
				handleChange={handleChange}
				name="file"
				types={fileTypes}
				value={file}
			/>}
			<p style={{ color: 'var(--text-color-white)' }}>
				{file ? `File name: ${file[0].name}` : "no files uploaded yet"}
			</p>
			<p>{file !== null && <div style={{ width: '400px', height: '300px' }}>
				<img
					style={{ width: '100%', height: '100%', objectFit: 'contain' }}
					src={URL.createObjectURL(file[0])} alt="wewe" />
			</div>}
			</p>
			{
				file !== null && <div className={style['bottom-buttons']}>
					<Button
						variant="outlined"
						startIcon={<DeleteIcon />}
						onClick={handleClickClear}
						disabled={file.length > 0 ? false : true}
					>
						Удалить
					</Button>
					<Button
						variant="contained"
						endIcon={<SendIcon />}
						disabled={file.length > 0 ? false : true}
						onClick={onClickSendPicture}
					>
						Отправить
					</Button>
				</div>
			}
		</div>
	);
}

export default FileUploadModal;