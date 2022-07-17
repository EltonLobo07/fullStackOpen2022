const DisplayError = ({ errMsg }) => {
	if (errMsg === null)
		return null;

	return <div style = {{color: "red"}}>{errMsg}</div>;
};

export default DisplayError;