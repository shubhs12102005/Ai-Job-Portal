import { setAllJobs } from '@/Redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((state) => state.job)

    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/job/get?keyword=${searchedQuery}`, { withCredentials: true });
                console.log(res);

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllJobs();
    }, [])
}

export default useGetAllJobs