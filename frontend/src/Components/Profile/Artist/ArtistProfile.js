import React, { useEffect, useRef } from 'react'
import { useState, ChangeEvent, FormEvent } from 'react';
import { FaUser } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import api from '../../../Services/api';
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { baseURL } from '../../../Services/config';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import FetchArtist from '../../Functions/Fetchartist.js';

const ArtistProfile = () => {
  const [avatar,setavatar] = useState("");
  const {cookies} = useContext(AuthContext);
  const [image,setimage] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const imageref = useRef(null);
  const User = cookies.User;

  
    const [formData,setFormData] = useState({
    country:"",
    email:"",
    bio:"",
    name:"",
    image:""
  });


  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    });
  }


  const handleImageUpload = (e) => {
    const file = e.target.files[0]?e.target.files[0]:null;
    const filename = file.name;
    const fileExtension = filename.split('.').pop().toUpperCase();

    if (fileExtension === 'JPG' || fileExtension === 'JPEG') {
      // Allow JPG or JPEG files
      setavatar(e.target.files[0]);
    } else {
      // Reject other file types
      //console.error('Only JPG or JPEG files are allowed');
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(formData.name && formData.email && formData.country) {
      try {
        const formelement = new FormData();
        formelement.append('name', formData.name);
        formelement.append('email',formData.email);
        formelement.append('bio',formData.bio);
        formelement.append('country',formData.country);
        formelement.append('auth', cookies.Authority);
        formelement.append('image',avatar);
        
      
        try {
          api.post(`/api/artist/${User.name}/profile/${User._id}`,formelement)
          .then((response) => {
            if(response.data.success===true){
              setLoading(false);
              navigate("/home");
            }
          })
          .catch((error)=>{
            //console.log(error);
            setLoading(false)
          })
          .finally(() =>{
            setLoading(false)
          })
        } catch (error) {
          //console.log(error);
          setLoading(false);
        }
        
      } catch (error) {
        //console.log(error);
        setLoading(false);
      }
    }else{
      //console.log("Please Input all Data");
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    if(User){
      FetchArtist(User._id, setFormData);
    }
    setimage(formData.image);
  },[User._id,setFormData,formData,setimage])
    
     if(loading){return(<div className='w-screen h-screen'><Loading/></div>)}
    
  return (
    <div className='w-screen flex items-center justify-center h-auto'>
  <form onSubmit={handleSubmit} className="w-1/2 text-black px-4 py-8 sm:px-6 lg:px-8 ">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div>
          <Link to="/home"><IoMdArrowRoundBack/></Link>
        </div>
        <h2 className="w-full flex justify-center text-3xl font-bold mb-4">Edit Profile</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
          <img 
                src={ 
                  (!avatar && !image) 
                    ? "https://placehold.co/100x100"
                    : avatar 
                      ? URL.createObjectURL(avatar) 
                      : `${baseURL}/${User.name}/profile/${image}`
                } 
                alt="Avatar" 
                className="w-full h-full object-contain" 
              />
          </div>
          <div className="flex-grow">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              name='avatar-upload'
              ref={imageref}
              onChange={handleImageUpload}
            />
            
            <label htmlFor="avatar-upload">
              <button type="button" className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-100 w-full sm:w-auto" onClick={()=>{imageref.current.click();}}>
                Change Avatar
              </button>
            </label>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <label htmlFor="bio" className="block font-medium">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows={4}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
      
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="space-y-2">
            <label htmlFor="location" className="block font-medium">Location</label>
            <input
              id="location"
              name="location"
              placeholder="City, Country"
              value={formData.country}
              onChange={handleChange}
              className=" border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
         
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" >
          Save Changes
        </button>
      </div>
    </form>
    </div>
  )
}

export default ArtistProfile