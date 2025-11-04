import React, { useState } from 'react'
import Navbar from '../Main/Navbar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/Redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("")

    const handleSubmit = async () => {
        try {
            console.log(companyName);

            const res = await axios.post('http://localhost:3000/api/company/register', { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.company));
                toast.success("Company Created Successfully")
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                {/* Input for Company Name */}
                <Label>Company Name</Label>
                <Input type="text" className="my-2"
                    onChange={(e) => { setCompanyName(e.target.value) }}
                    placeholder="JobHunt, Microsoft etc."
                />
                {/* Buttons */}
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={handleSubmit}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany