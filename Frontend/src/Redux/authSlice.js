import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        savedJobs: []
    }, reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload
        }
    }
})

export const { setLoading, setUser, setSavedJobs } = authSlice.actions;
export default authSlice.reducer;