import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		updateFilter: function(state, action) {
			return action.payload;
		}
	}
});

export default filterSlice.reducer;
export const { updateFilter } = filterSlice.actions;