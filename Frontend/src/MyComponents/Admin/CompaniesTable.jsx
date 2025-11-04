import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CompaniesTable = () => {
    const navigate = useNavigate();
    const { companies, filterCompanyText } = useSelector((state) => state.company)
    const [filterCompany, setFilterCompany] = useState(companies);

    const handleDelete = async (companyId) => {
        try {
            console.log("in frontend api");

            const res = await axios.get(`http://localhost:3000/api/company/delete/${companyId}`, { withCredentials: true })
            if (res?.data?.success) {
                toast.success(res?.data?.message || "Company Deleted Successfully")

                // Update UI by filtering out the deleted job
                setFilterCompany(prev => prev.filter(company => company._id !== companyId));
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!filterCompanyText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(filterCompanyText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    }, [companies, filterCompanyText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                {/* Header */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length <= 0 ? (
                            <div>No companies found</div>
                        ) : (
                            filterCompany.map((company) => (
                                <tr>
                                    {/* Logo */}
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    {/* Company Details */}
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        {/* Edit Buttons */}
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span onClick={() => { navigate(`${company._id}`) }}>Edit</span>
                                                </div>

                                                <div onClick={() => { handleDelete(company._id) }} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Trash2 className='w-4' />
                                                    <span>Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            ))
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable