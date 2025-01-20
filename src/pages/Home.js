import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
  return (
    <div className='space-x-4 place-items-center mx-auto w-11/12 max-w-maxContent flex items-center justify-center mt-52'>
        <button 
        className='py-[8px] px-[12px] bg-richblack-700 border-1 rounded-md text-white'
        onClick={() => navigate("/userSubmission")}>
            User Submission
        </button>
        <button
        className='py-[8px] px-[12px] bg-richblack-700 border-1 rounded-md text-white'
        onClick={() => navigate("/adminLogin")}>
            Admin Login
        </button>
    </div>
  )
}

export default Home