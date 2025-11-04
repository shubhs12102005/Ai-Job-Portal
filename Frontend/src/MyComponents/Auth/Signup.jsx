import React, { useState, useEffect } from 'react'
import Navbar from '../Main/Navbar'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { RadioGroup } from '../../components/ui/radio-group'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/Redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.auth)

  const [input, setInput] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  })

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const formData = new FormData()
      formData.append('fullName', input.fullName)
      formData.append('email', input.email)
      formData.append('phoneNumber', input.phoneNumber)
      formData.append('password', input.password)
      formData.append('role', input.role)
      if (input.file) {
        formData.append('file', input.file)
      }
      const res = await axios.post('http://localhost:3000/api/user/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unknown error')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      <div className="flex items-center justify-center max-w-6xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-1/2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8 my-10"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-white">Sign Up</h1>

          {/* Full Name */}
          <div className="my-3 space-y-2">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={inputHandler}
              placeholder="Shubham Jakkula"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#6A38C2] transition"
            />
          </div>

          {/* Email */}
          <div className="my-3 space-y-2">
            <Label className="text-gray-300">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={inputHandler}
              placeholder="Shubham@gmail.com"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#6A38C2] transition"
            />
          </div>

          {/* Phone Number */}
          <div className="my-3 space-y-2">
            <Label className="text-gray-300">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={inputHandler}
              placeholder="8080808080"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#6A38C2] transition"
            />
          </div>

          {/* Password */}
          <div className="my-3 space-y-2">
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={inputHandler}
              placeholder="abc@#88"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#6A38C2] transition"
            />
          </div>

          {/* Role and Profile Upload */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-4">
            {/* Role */}
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={inputHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-300">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={inputHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="text-gray-300">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>

            {/* Profile Photo */}
            <div className="flex items-center gap-2 ml-8">
              <Label className="text-gray-300">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={fileHandler}
                className="cursor-pointer bg-gray-700 text-gray-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-5 flex justify-center items-center" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-5 bg-[#6A38C2] hover:bg-[#5b30a6] text-white transition transform hover:scale-[1.02]"
            >
              Signup
            </Button>
          )}

          {/* Login Link */}
          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6A38C2] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
