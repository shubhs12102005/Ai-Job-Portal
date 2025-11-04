import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AdminJobTable = () => {
    const navigate = useNavigate();
    const { allAdminJobs, filterJobText } = useSelector((state) => state.job)
    const [filterJob, setFilterJob] = useState(allAdminJobs);

    // Deletes a Job
    const handleDelete = async (jobId) => {
        try {
            console.log("in frontend api");

            const res = await axios.get(`http://localhost:3000/api/job/delete/${jobId}`, { withCredentials: true })
            if (res?.data?.success) {
                toast.success(res?.data?.message || "Job Deleted Successfully")

                // Update UI by filtering out the deleted job
                setFilterJob(prev => prev.filter(job => job._id !== jobId));
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!filterJobText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(filterJobText.toLowerCase()) || job?.company?.name.toLowerCase().includes(filterJobText.toLowerCase());
        })
        setFilterJob(filteredJob);
    }, [allAdminJobs, filterJobText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your all Jobs</TableCaption>
                {/* Header */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob.length <= 0 ? (
                            <div>No companies found</div>
                        ) : (
                            filterJob.map((job) => (
                                <tr>
                                    {/* Company Details */}
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        {/* Edit Buttons */}
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>

                                                <div onClick={() => { handleDelete(job._id) }} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
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

export default AdminJobTable