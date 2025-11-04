import React, { useEffect, useState } from 'react'
import Navbar from '../Main/Navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setFilterCompanyText } from '@/Redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    useEffect(() => {
        dispatch(setFilterCompanyText(input));
    }, [input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    {/* Filter companies by search */}
                    <Input onChange={(e) => { setInput(e.target.value) }} className="w-fit" placeholder="Filter by name" />
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>

                {/* All companies will come here */}
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies