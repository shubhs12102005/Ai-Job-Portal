import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        filterJobText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        relatedJobs: []
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setFilterJobText: (state, action) => {
            state.filterJobText = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        setRelatedJobs: (state, action) => {
            state.relatedJobs = action.payload
        }
    }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs, setFilterJobText, setAllAppliedJobs, setSearchedQuery, setRelatedJobs } = jobSlice.actions;
export default jobSlice.reducer;