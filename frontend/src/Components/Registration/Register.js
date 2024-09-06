import React, { useState } from 'react'
import { TbBrandSpotify } from "react-icons/tb";
//import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const  API_ADDRESS = `http://localhost:9000`;

  const countries= [
    {
      "name": "Nepal",
      "code": "NP"
    },
    {
      "name": "India",
      "code": "IN"
    }
  ];

  const [user,setUser] = useState({
    name:"",
    email: "",
    password: "",
    cpassword:"",
    country: ""
  });

  const handleChange = (e) => {
    const {name,value}=e.target;
    setUser({
      ...user,
      [name]:value
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.name && user.email && user.password && user.cpassword && user.country){
      if(user.password === user.cpassword){
        try {
          axios.post(`${API_ADDRESS}/register`)
          .then(res=>{
            console.log(res.data);
          })          
        } catch (error) {
          console.log(`${API_ADDRESS} not found`);
          
        }
      }else{
        console.log("password and confirmed password didn't matched");
      }
    }else{
      console.log("Please input all data");
    }
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
                <form  action='' onSubmit={handleSubmit}>
                  <div className='my-3 mb-5'>
                    <label htmlFor="name" className="block mb-2 text-sm font-bold">Full Name</label>
                    <input className=' text-black text-xxl color-red' name='name' id='name' value={user.name} onChange={handleChange} required /><br/>
                  </div>

                  <div className='my-3 mb-5'>
                    <label htmlFor="email" className="block mb-2 text-sm font-bold">Email</label>
                    <input className='text-xxl text-black' name='email' id='email' value={user.email} onChange={handleChange} required/><br/>
                  </div>
                  
                  <div className='my-3 '>
                  <label htmlFor="password" className="block mb-2 text-sm font-bold">Password</label>
                  <input className='text-xxl text-black' name='password' id='password' value={user.password} onChange={handleChange}  required/><br/>
                  </div>

                  <div className='my-3 '>
                    <label htmlFor="cpassword" className="block mb-2 text-sm font-bold">Confirm Password</label>
                    <input className='text-xxl text-black' name='cpassword' id='cpassword' value={user.cpassword} onChange={handleChange} required/><br/>
                  </div>
                  
                  <div className='my-3'>
                    <label htmlFor="country" className="block mb-2 text-sm font-bold">Country</label>
                    <select id="country" name="country" value={user.country} onChange={handleChange} className="text-xxxl hover:border-slate-400 p-1 pl-12 text-gray-700">
                      <option value="">Select a country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                      ))}
                    </select>
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