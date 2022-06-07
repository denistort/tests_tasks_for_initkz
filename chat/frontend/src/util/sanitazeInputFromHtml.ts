export const sanitazeInputFromHtml = (text: string) => {
	return text.replace(/<!--[\s\S]*?--!?>/g, "")
		.replace(/<\/?[a-z][^>]*(>|$)/gi, "");
}