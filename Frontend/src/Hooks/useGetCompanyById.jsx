import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/Redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/company/get/${companyId}`, { withCredentials: true });
                if (res?.data?.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyById();
    }, [companyId, dispatch]);

}

export default useGetCompanyById