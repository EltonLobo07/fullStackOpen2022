import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = (props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display : visible ? "none" : " " };
	const showWhenVisible = { display : visible ? " " : "none" };
	const toggleVisibility = () => {
		console.log("Toggle function called");
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		console.log("Reference initialized now");
		return toggleVisibility;
	}, []);

	const style = { marginTop : "1rem", marginBottom : "1rem" };

	return (
		<div style = { style }>
			<div style = { hideWhenVisible }>
				<button onClick = { toggleVisibility }>{ props.buttonLabel }</button>
			</div>

			<div style = { showWhenVisible }>
				{ props.children }

				<button onClick = { toggleVisibility }>cancel</button>
			</div>
		</div>
	);
};

export default forwardRef(Togglable);