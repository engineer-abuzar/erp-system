import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: false,
    reducers:
    {
        setAuthenticaionSlice: (state, action) => {
            return action.payload
        }
    }

})
export const { setAuthenticaionSlice } = authenticationSlice.actions;
export default authenticationSlice.reducer