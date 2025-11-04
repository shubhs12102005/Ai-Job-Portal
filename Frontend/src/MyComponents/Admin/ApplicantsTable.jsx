import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const statusColors = {
    Accepted: "bg-green-600 text-white",
    Rejected: "bg-red-600 text-white"
};

const ApplicantsTable = () => {
    const shortlistingStatus = ["Accepted", "Rejected"];
    const { applicants } = useSelector((state) => state.application);

    // Track status for each applicant row
    const [rowStatus, setRowStatus] = useState({});

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/application/status/${id}/update`,
                { status },
                { withCredentials: true }
            );
            if (res?.data?.success) {
                toast.success(res.data.message);
                setRowStatus((prev) => ({ ...prev, [id]: status }));
            }
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants &&
                        applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item.applicant?.profile?.resume ?
                                        <a className="text-blue-600 cursor-pointer"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeName}
                                        </a>
                                        : <span>NA</span>}
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    {
                                        rowStatus[item._id] ? (
                                            <span className={`px-3 py-1 rounded-full font-semibold text-xs ${statusColors[rowStatus[item._id]]}`}>
                                                {rowStatus[item._id]}
                                            </span>
                                        ) : (
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    {
                                                        shortlistingStatus.map((status, index) => (
                                                            <div
                                                                onClick={() => statusHandler(status, item?._id)}
                                                                key={index}
                                                                className='flex w-fit items-center my-2 cursor-pointer hover:underline'
                                                            >
                                                                <span>{status}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </PopoverContent>
                                            </Popover>
                                        )
                                    }
                                </TableCell>
                            </tr>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
