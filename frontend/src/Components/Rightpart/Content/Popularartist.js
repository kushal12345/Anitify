import React, { useState,useEffect } from 'react'
import { FaPlayCircle } from "react-icons/fa";
import api from '../../../Services/api';
import { baseURL } from '../../../Services/config';
import Loading from '../../Loading/Loading';
import FetchArtist from '../../Functions/Fetchartist';

const Popularartist = () => {
    const [loading, setloading] = useState(false);
    const [formData,setformData] = useState([]);

    useEffect(() => {
      setloading(true);
      FetchArtist('all',setformData);
      setloading(false);     
    },[setformData])


if(loading) {return(<div className='w-full h-full'><Loading/></div>)}

    return (

    <div className='text-white h-auto py-3  w-full'>
            {/*Head part */}
            <div className='h-1/6  grid grid-cols-6'>
                <div className=' col-start-1 py-3 col-end-5 flex px-3 items-center '>
                    <h2><span className='font-bold text-xl'>POPULAR ARTISTS</span></h2>
                </div>

                <div className='col-start-5   px-4 col-end-7 flex items-center justify-end'>
                    <span className='underline'>See all</span>
                </div>
            </div>
            {/*body part */}
            
            <div className='h-5/6   mb-1 w-full grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1 '>
              {
                formData.slice(0, 6).map((data, index) => {
                  return (
                    <div className='w-full h-auto group' key={index}>
                      {/* image and text content */}
                      <div className='w-full h-auto flex items-center justify-center'>
                        <div className='w-11/12 bg-white relative aspect-square rounded-full  overflow-hidden shadow-xl '>
                          <img src={data.image?`${baseURL}/${data.name}/profile/${data.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'} 
                            className='w-full h-full object-contain'
                            alt='Image description'/>
                          <div className='absolute bottom-3 right-5 text-gray-500 aspect-square rounded-full hidden group-hover:block'>
                            <FaPlayCircle color='#1E90FF' size="36px"  />
                          </div>    
                        </div>
                      </div>
                      <div className='w-full flex justify-center h-auto my-5'>
                        {data.name}
                      </div>
                    </div>
                  );
                })
              }
            </div>

        </div>
  )
}

export default Popularartist