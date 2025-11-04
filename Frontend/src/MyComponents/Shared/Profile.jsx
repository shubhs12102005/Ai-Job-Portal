import React, { useState } from 'react'
import Navbar from '../Main/Navbar'
import { Contact, Edit, PlusCircle, Mail, Pen } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import AppliedJobTable from './AppliedJobTable'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import UpdateProfle from './UpdateProfle'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/Hooks/useGetAllAppliedJobs'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { setUser } from '@/Redux/authSlice'
import { toast } from 'sonner'

const Profile = () => {
  useGetAllAppliedJobs()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [resume, setResume] = useState(user?.profile?.resume || "")

  const isResume = Boolean(user?.profile?.resume)

  const onResumeClick = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    setResume(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:3000/api/user/profile/AddResume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to upload resume");
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl my-8 p-8 shadow-lg">
        {/* Profile Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 rounded-full border-2 border-[#6A38C2]">
              <AvatarImage
                className="h-24 w-24 rounded-full object-cover"
                src={user?.profile?.profilePhoto}
                alt="Profile"
              />
            </Avatar>
            <div>
              <h1 className="text-3xl font-semibold">{user?.fullName}</h1>
              <p className="text-gray-400 mt-1 max-w-md">{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-gray-900 transition"
          >
            <Pen /> Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail /> <span>{user?.email || 'Not Provided'}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Contact /> <span>{user?.phoneNumber || 'Not Provided'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length
              ? user.profile.skills.map((skill, i) => (
                <Badge key={i} className="bg-[#6A38C2] text-gray-900">
                  {skill}
                </Badge>
              ))
              : <span className="text-gray-400">NA</span>}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-8 max-w-sm">
          <Label className="block mb-2 text-lg font-bold">Resume</Label>

          {isResume ? (
            <div className="flex flex-row gap-3">
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[#6A38C2] hover:underline break-all"
              >
                {user.profile.resumeName || 'View Resume'}
              </a>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="updateResume"
                  className="cursor-pointer text-white bg-[#6A38C2] hover:bg-[#5930a3] font-medium rounded-full p-2 transition"
                >
                  <Edit />
                </Label>
                <Input
                  id="updateResume"
                  type="file"
                  accept="application/pdf"
                  onChange={onResumeClick}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              <Label htmlFor="file" className='font-semibold'>Add Resume</Label>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={onResumeClick}
                className="col-span-3"
              />
            </div>
          )}
        </div>

      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-6 mt-10 shadow-lg text-gray-200">
        <h2 className="font-bold text-2xl mb-6">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfle open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
