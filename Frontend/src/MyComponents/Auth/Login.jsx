import React, { useState, useEffect } from 'react'
import Navbar from '../Main/Navbar'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/Redux/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.auth)

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post('http://localhost:3000/api/user/login', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unknown error')
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
          className="w-full sm:w-1/2 border border-gray-700 rounded-lg shadow-lg p-8 my-10 bg-gray-800"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-white">Login</h1>

          {/* Email */}
          <div className="my-3 space-y-2">
            <Label className="text-gray-300">Email</Label>
            <Input
              type="email"
              name="email"
              onChange={inputHandler}
              placeholder="Shubham@gmail.com"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="my-3 space-y-2">
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={inputHandler}
              placeholder="abc@#88"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-5 flex justify-center items-center" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-5 hover:scale-[1.02] transition-transform duration-200 bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
            >
              Login
            </Button>
          )}

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#6A38C2] hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
