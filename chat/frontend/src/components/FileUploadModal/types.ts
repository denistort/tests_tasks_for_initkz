import { ImageMessage, MessageType } from '../Chat/types';

export interface FileUploadModalProps {
	toggleModal: () => void;
	socketSend: (message: ImageMessage | MessageType) => void;
}