import React from 'react'
import Navbar from '../Main/Navbar'
import ApplicantsTable from './ApplicantsTable'
import useGetAllApplicants from '@/Hooks/useGetAllApplicants'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Applicants = () => {
  const params = useParams();
  const id = params.id
  useGetAllApplicants(id)

  const { applicants } = useSelector((state) =>state.application)
  console.log(applicants);
  

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants