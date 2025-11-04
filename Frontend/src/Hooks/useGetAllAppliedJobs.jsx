import { setAllAppliedJobs } from '@/Redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/application/get`, { withCredentials: true });
                console.log(res);
                dispatch(setAllAppliedJobs(res.data.applications));
            } catch (error) {
                console.log(error);
            }
        }
        getAllAppliedJobs();
    }, [])
}

export default useGetAllAppliedJobs