import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logOut } from '../services/operations/adminAPI';
import io from "socket.io-client"
import { useNavigate } from 'react-router-dom';
const socket = io("http://localhost:4000"); //connect to the server
function AdminDashboard() {
    const {token} = useSelector((state) => state.auth);
    const [userData,setUserData] = useState([]);
    useEffect(() =>{
        const getUserData = async () =>{
            try {
                const result = await getUserDetails(token);

                console.log("PRINTING USER DETAILS RESULT",result);
                setUserData(result.data);
            } catch (error) {
                console.log("ERROR FETCHING USER DETAILS",error);
            }
        }
        getUserData();


        socket.on("newSubmission",(data) =>{
            console.log("New submission received",data);
            setUserData((prevData) =>[...prevData,data]);
        })
    },[])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = async () =>{
        await logOut(dispatch,navigate);
    }
  return (

    <div>
        <h1 className='text-4xl font-semibold mt-5 mb-5'>Admin dashboard</h1>
        <div>
            {
                userData === null ? (<div><p>No Data Found</p></div>) : 
                    (
                        <div className="flex flex-col gap-6 border-b-1 border-b-richblack-700">
                            {userData.map((user,index) =>{
                            return (
                                <div key={index} className='flex flex-col border-b-2 p-2 border-b-richblack-700'>
                                    <div>
                                        <p className='text-2xl font-semibold'>Name: {user.name}</p>
                                        <p className='text-2xl font-semibold'>Handle: {user.handle}</p>
                                    </div>
                                    <div className='space-y-5'>
                                        {
                                            user.images.map((image) =>{
                                                return (
                                                    <div className='space-y-5 border p-2 w-fit rounded-md'>
                                                        <img src={`${image}`} alt='userImage' className=' h-[350px] w-[550px] object-cover' loading='lazy'></img>
                                                    </div>    
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                            })}
                        </div>
                    ) 
            }
        </div>
        <div className='mt-5 place-items-center flex items-center justify-center'>
            <button 
            onClick={() => handleLogOut()}
            className='py-[8px] px-[12px] bg-richblack-700 border-1 rounded-md text-white'>
                Log out
            </button>
        </div>
    </div>
  )
}

export default AdminDashboard