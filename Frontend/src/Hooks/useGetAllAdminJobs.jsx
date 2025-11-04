import { setAllAdminJobs } from '@/Redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllAdminJobs = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/job/recruiter/get', { withCredentials: true });
                console.log(res);

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs