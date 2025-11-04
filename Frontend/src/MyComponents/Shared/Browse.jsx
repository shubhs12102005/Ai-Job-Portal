import React, { useEffect } from 'react'
import Navbar from '../Main/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/Redux/jobSlice'
import useGetAllJobs from '@/Hooks/useGetAllJobs'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector((state) => state.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''))
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-2xl mb-8">
          Search Results ({allJobs.length})
        </h1>
        {allJobs.length === 0 ? (
          <p className="text-red-400 text-center">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse
