import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import Navbar from '../Main/Navbar'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((state) => state.job)
  const [filterJobs, setFilterJobs] = useState(allJobs);
  console.log("Jobs:", allJobs, searchedQuery);


  useEffect(() => {
    // Query for searching jobs by filtering
    if (searchedQuery) {
      const filteredJob = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJob)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='sm:flex gap-5'>
          {/* Filter section for big screen */}
          <div className='hidden sm:flex w-20%'>
            <FilterCard />
          </div>

          {/* Filter Sidebar (for Mobile) */}
          <div className="sm:hidden block text-right mr-6 mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline"><Filter /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[60%] sm:w-[300px] p-4">
                <FilterCard />
              </SheetContent>
            </Sheet>
          </div>

          {
            filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center" >
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center w-full sm:w-auto"
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Jobs