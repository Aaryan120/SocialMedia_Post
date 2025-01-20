import React from 'react'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login } from '../services/operations/adminAPI';
function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm()
    const loginHandle = async () =>{
        const formData = new FormData();
        const currentValues = getValues();
        console.log("PRINTING CURRENT VALUES",currentValues);
        formData.append("username",currentValues.username);
        formData.append("password",currentValues.password);
        const result = await login(formData,navigate,dispatch);
    }
  return (
    <div>
        <div>
            <p className='text-3xl font-semibold mb-5'>Admin Login</p>
        </div>
        <form onSubmit={handleSubmit(loginHandle)}>
            <div>
                <label>
                    <p>Username:</p>
                    <input
                    type='text'
                    name='username'
                    {...register('username',{required:true})}
                    className="px-2 border border-richblack-900 rounded-md my-2 text-black w-[90%] py-2"/>
                    {
                        errors.username && <span>
                            Please enter username
                        </span>
                    }
                </label>
                <label>
                    <p>Password:</p>
                    <input
                    type='text'
                    name='password'
                    {...register('password',{required:true})}
                    className=" px-2 border border-richblack-900 rounded-md my-2 text-black w-[90%] py-2"
                    />
                    {
                        errors.password && <span>
                            Please enter password
                        </span>
                    }
                </label>
            </div>
            <div>
                <button type='submit'
                className='py-[8px] px-[12px] bg-richblack-700 border-1 rounded-md text-white'>
                    Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default AdminLogin