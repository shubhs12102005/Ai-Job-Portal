import React, { useEffect, useState } from 'react'
import Navbar from '../Main/Navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobTable from './AdminJobTable'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'
import { setFilterJobText } from '@/Redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    useEffect(() => {
        dispatch(setFilterJobText(input));
    }, [input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    {/* Filter companies by search */}
                    <Input onChange={(e) => { setInput(e.target.value) }} className="w-fit" placeholder="Filter by name or role" />
                    <Button onClick={() => navigate("/admin/job/create")}>New Job</Button>
                </div>

                {/* All companies will come here */}
                <AdminJobTable />
            </div>
        </div>
    )
}

export default AdminJobs