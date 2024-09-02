import React from 'react'
import { TbBrandSpotify } from "react-icons/tb";
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from 'react-router-dom';


const Register = () => {

  const {register, handleSubmit, formState} = useForm();

  const onSubmitHandler = (data) => {
    console.log(data);
  }

  return (
    <div className='flex grid grid-rows-1   items-center justify-center py-5'>
        <div>
            <div className="  w-full flex items-center justify-center flex py-1 items-center primary_text gap-0 "> 
              <Link to="/">
                <TbBrandSpotify  style={{ width: 82, height: 82 }}/><br/>
              </Link>  
            </div>
            <br/>
            <div className='w-full flex items-center my-3'>
                <span className='font-bold text-[2.5rem]'>
                    Sign Up to
                </span>
           </div>
           <div className='w-full flex items-center justify-center my-3'>
                <span className='font-bold text-[2.5rem]'>
                    Start Listening.
                </span>
           </div>
           <div className='h-2/4   py-4'>
                <form  action='' onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className='my-3 mb-5'>
                    <span className='text-xl font-bold'>Full Name</span><br/>
                    <input className='text-xxl color-red' {...register("name")}/><br/>
                  </div>

                  <div className='my-3 mb-5'>
                    <span className='text-xl font-bold'>Email</span><br/>
                    <input className='text-xxl color-red' {...register("email")}/><br/>
                  </div>
                  
                  <div className='my-3 '>
                    <span className='text-xl font-bold'>Password</span><br/>
                    <input className='text-xxl' {...register("password")}/><br/>
                  </div>

                  <div className='w-full flex items-center justify-center '>
                    <button className='bg-accent-red px-4 py-2 rounded-xl' type='submit'>Submit</button>
                  </div>
                </form>
           </div>
        </div>
    </div>
  )
}

export default Register