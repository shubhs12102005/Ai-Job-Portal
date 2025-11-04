import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { LogOut, Search, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/Redux/authSlice'
import { toast } from 'sonner'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { FaList } from "react-icons/fa";
import { setSearchedQuery } from '@/Redux/jobSlice'
import { Bookmark, Brain } from "lucide-react"

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSearchMode, setIsSearchMode] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
    setIsSearchMode(false);
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='w-full bg-gray-900 text-gray-300 border-b border-gray-800 shadow-md'>
      <div className='py-4 px-4 md:px-16 max-w-7xl mx-auto h-16 flex items-center justify-between'>

        {/* Logo */}
        <div className='flex gap-2 items-center'>
          <div className='mt-1'>
            <Brain size={30} className='text-[#00b2a9]' />
          </div>
          <h1
            onClick={() => navigate('/')}
            className='cursor-pointer text-2xl md:text-3xl font-bold text-white'
          >
            <span className='text-[#bbc1d1]'>Hire</span><span className='text-[#00b2a9]'>Mind</span>
          </h1>
        </div>

        {/* Desktop Search Bar */}
        {
          user?.role === 'student' && (
            <div className='hidden sm:flex lg:w-[50%] sm:w-[40%] bg-gray-800 text-gray-200 border border-gray-700 rounded-full items-center gap-4 mx-auto shadow-inner'>
              <input
                type="text"
                onChange={(e) => { setQuery(e.target.value) }}
                placeholder='Find your dream jobs'
                className='bg-transparent text-gray-200 placeholder-gray-400 outline-none border-none w-full pl-4'
              />
              <Button
                onClick={searchJobHandler}
                className='rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6]'
              >
                <Search className='h-5 w-5' />
              </Button>
            </div>
          )
        }

        {/* Mobile Search Button */}
        {
          user?.role === 'student' && (
            <Button
              className='sm:hidden ml-auto text-gray-200 hover:text-white'
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchMode(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
          )

        }

        {/* Right Section */}
        <div className='flex gap-4'>
          <ul className='flex items-center gap-3 md:gap-6 text-md md:text-lg font-semibold'>
            {user?.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies" className='hover:text-[#6A38C2] transition-colors'>Companies</Link></li>
                <li><Link to="/admin/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link></li>
              </>
            ) : (
              <div>
                <div className='hidden sm:flex gap-4'>
                  <li><Link to="/savedForLater" className='hover:text-[#6A38C2]'><Bookmark className='mt-1' /></Link></li>
                  <li><Link to="/" className='hover:text-[#6A38C2]'>Home</Link></li>
                  <li><Link to="/jobs" className='hover:text-[#6A38C2]'>Jobs</Link></li>
                  <li><Link to="/browse" className='hover:text-[#6A38C2]'>Browse</Link></li>
                </div>

                {/* Mobile Menu */}
                <div className='sm:hidden block gap-4'>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className='border-gray-600 text-gray-300 hover:bg-gray-800'>
                        <FaList />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="bg-gray-900 text-gray-200 border-l border-gray-700 w-[70%] sm:w-[300px] p-8"
                    >
                      <li><Link to="/" className='hover:text-[#6A38C2]'>Home</Link></li>
                      <li><Link to="/jobs" className='hover:text-[#6A38C2]'>Jobs</Link></li>
                      <li><Link to="/browse" className='hover:text-[#6A38C2]'>Browse</Link></li>
                      <li><Link to="/savedForLater" className='hover:text-[#6A38C2]'><Bookmark className='mt-1' /></Link></li>

                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            )}
          </ul>

          {/* User Menu */}
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='w-9 h-9 cursor-pointer border border-gray-600'>
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className='bg-gray-800 text-gray-200 border border-gray-700 w-50 rounded-lg shadow-lg'
              >
                {user?.role === 'student' && (
                  <div className='flex items-center mt-2 hover:text-[#6A38C2] transition-colors'>
                    <User2 className='mr-2' />
                    <Button variant="link" className='text-gray-300 hover:text-[#6A38C2]'>
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className='flex items-center hover:text-red-400 transition-colors'>
                  <LogOut className='mr-2' />
                  <Button variant="link" onClick={handleLogout} className='text-gray-300 hover:text-red-400'>Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to="/signup">
                <Button variant="outline" className='border-gray-600 text-gray-300 hover:bg-gray-800'>
                  Signup
                </Button>
              </Link>
              <Link to="/login">
                <Button className='bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6'>
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Input Overlay */}
      {isSearchMode && (
        <div className="sm:hidden fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-700 z-50 shadow-lg">
          <div className="flex items-center gap-2 px-8 py-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your dream jobs..."
              className="bg-gray-800 text-gray-200 placeholder-gray-400 outline-none border-none w-full rounded-full px-4 py-2"
              autoFocus
            />
            <Button
              onClick={searchJobHandler}
              className='bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-full'
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchMode(false)}
              className='text-gray-400 hover:text-white'
            >
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;
