import React from 'react'
import { FaPlayCircle } from "react-icons/fa";

const Popularalbums = () => {
  return (
    <div className=' h-2/4 w-full'>
            {/*Head part */}
            <div className='h-1/6  grid grid-cols-6'>
                <div className=' col-start-1 col-end-3 flex px-3 items-center '>
                    <h2><span className='font-bold text-xl'>POPULAR ALBUMS</span></h2>
                </div>

                <div className='col-start-5   px-4 col-end-7 flex items-center justify-end'>
                    <span className='underline'>See all</span>
                </div>
            </div>
            {/*body part */}
            <div className='h-5/6 w-full flex '>
                {
                    Array(6).fill(0).map((_, index) => {
                    return (
                        <div className='w-1/6 h-full group ' key={index} >
                        <div className='w-full h-5/6 flex items-center justify-center '>
                            <div className='w-11/12 relative h-full border-white overflow-hidden shadow-xl '>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png' 
                                className='w-full h-full object-cover'
                                alt='Image description'/>
                            <div className='absolute bottom-0 right-0 text-gray-500 aspect-square rounded-full hidden group-hover:block'>
                              <FaPlayCircle color='#1E90FF' size="36px"  />
                            </div>    
    
                            </div>
                        </div>
                        <div className='w-full flex justify-center pt-2 h-1/6'>
                            No Name
                        </div>
                        </div>
                    );
                    })
                }
            </div>
        </div>
  )
}

export default Popularalbums