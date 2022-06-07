export const dateFormatter = (date: string | number) => {
	return new Date(Number(date))
		.toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })
		.split(' ')[1]
}