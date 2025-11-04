import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector((state) => state.job)
    console.log("Home", allJobs);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-2xl md:text-4xl text-center font-bold mb-10'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='p-8 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>Jobs Not There...</span> : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>

            <div className="flex justify-center mb-20">
                <Link to={'/jobs'}>
                    <button className="bg-gradient-to-r from-[#6A38C2] to-[#4C00A8] text-white text-lg font-medium px-8 py-2 rounded-full shadow-md hover:shadow-[#6A38C2]/40 hover:scale-105 transition-all duration-300">
                        View All Jobs
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default LatestJobs