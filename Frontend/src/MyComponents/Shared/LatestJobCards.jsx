import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    // Calculating Time Diff 
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div
            onClick={() => navigate(`/job/description/${job?._id}`)}
            className=" bg-gray-900 border border-gray-800 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl shadow-md  cursor-pointer hover:shadow-lg transition"
        >
            {/* Left: Logo */}
            <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mx-auto sm:mx-0">
                <img
                    src={job?.company?.logo}
                    alt={job?.company?.name}
                    className="w-12 h-12 object-contain"
                />
            </div>

            {/* Middle: Job Details */}
            <div className="flex-1 text-center sm:text-left px-2">
                {/* Job Title */}
                <h2 className="text-lg font-semibold text-gray-100">{job?.title}</h2>

                {/* Company + Location */}
                <p className="text-sm text-gray-500 flex flex-wrap justify-center sm:justify-start items-center gap-2">
                    <span className='text-gray-400'>{job?.company?.name}</span>
                    <span className="flex items-center md:gap-1">
                        <MapPin className="w-4 h-4" /> {job?.location}
                    </span>
                </p>

                {/* Salary */}
                <p className="text-sm font-medium text-gray-700 mt-1">
                    {job?.salary} LPA
                </p>
            </div>

            {/* Right: Job Type + Time */}
            <div className="flex flex-col items-center sm:items-end gap-2">
                <Badge
                    variant="outline"
                    className="px-4 py-1 border-blue-500 text-blue-600 font-medium rounded-full"
                >
                    {job?.jobType}
                </Badge>
                <span className="text-xs text-gray-400">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
            </div>
        </div>
    )
}

export default LatestJobCards
