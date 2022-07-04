import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
		name: "notification",
		initialState,
		reducers: {
			createNotification: function(state, action) {
				return action.payload;
			},

			deleteNotification: function(state, action) {
				return null;
			}
		}
});

export default notificationSlice.reducer;
export const { createNotification, deleteNotification } = notificationSlice.actions;

let timeoutId;

export const setNotification = (msg, timeInSeconds) => {
	const funcToReturn = (dispatch, getState) => {
		clearTimeout(timeoutId);

		dispatch(createNotification(msg));

		timeoutId = setTimeout(() => {
			timeoutId = undefined;
			dispatch(deleteNotification())
		}, timeInSeconds * 1000);
	};

	return funcToReturn;
};