import { setApplicants } from '@/Redux/applicantsSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllApplicants = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllApplicants = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/application/${id}/applicants`, { withCredentials: true });
                console.log(res);
                dispatch(setApplicants(res.data.jobs));

            } catch (error) {
                console.log(error);
            }
        }
        getAllApplicants();
    }, [id])
}

export default useGetAllApplicants