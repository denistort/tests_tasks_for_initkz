export interface ImageMessage {
	event: 'image';
	uuid: string;
	authorUuid: string;
	authorName: string;
	fileName: string;
	mimeType: string;
	date: string | number;
	fileArrayBuffer: string | ArrayBuffer | null;
}
export interface MessageType {
	event: 'message';
	uuid: string;
	authorName: string;
	authorUuid: string;
	date: string | number;
	text: string;
}