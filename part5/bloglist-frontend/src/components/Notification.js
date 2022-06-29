const Notification = ({ msg, color }) => {
	if (!msg)
		return null;

	const style = {
		paddingTop : 20,
		paddingBottom : 20,
		paddingLeft : 10,
		backgroundColor : "lightGrey",
		color, 
		border : `2px solid ${color}`,
		fontSize : 20,
		borderRadius : 10
	};

	return <div style = {style}>{msg}</div>;
};

export default Notification;