import { useState, forwardRef, useImperativeHandle, useCallback } from "react";

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display : visible ? "none" : " " };
	const showWhenVisible = { display : visible ? " " : "none" };

	const toggleVisibility = useCallback(() => setVisible(!visible), [visible]);

	useImperativeHandle(ref, () => toggleVisibility, [toggleVisibility]);

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
});

Togglable.displayName = "Togglable";

export default Togglable;