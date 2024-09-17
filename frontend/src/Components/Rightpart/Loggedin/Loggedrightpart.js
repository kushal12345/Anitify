import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';

const Loggedrightpart = () => {

    const {cookies} = useContext(AuthContext);

  return (
    <div className=' p-2 pl-5 -z-[1] '>
                
        {/* Tag part  */}
        <div className='flex items-center h-full w-full items-center gap-3 overflow-x-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] '  >
            
            <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px] ' >
                All
            </div>
            
            <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px] ' >
                Playlist
            </div>

            <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex  rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px]'>
                Artists
            </div>

            <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto min-w-[100px]'>
                Albums
            </div>

            <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 min-w-[100px] '>
                Podcasts
            </div>
        </div>

        {/* playlist main part  */}
        
        <div className="grid  my-4 grid-cols-4 grid-rows-2 gap-2">
            {Array(8).fill(0).map((_, index) => (
                <div key={index} className=" h-15 ">
                    <div className='flex text-[1rem] bg-white bg-opacity-20 hover:bg-opacity-35 w-full h-auto'>
                    {/* Image part  */}
                        <div className=' w-[30%] aspect-square p-1'>
                        <img src="https://picsum.photos/400/400" className='w-30% aspect-square' />
                        </div> 
                    {/* Playlist Details */}
                        <div  className=' w-[70%]'>
                            <div className='w-full font-bold flex items-center  h-[100%]'>
                                English{index + 1}
                            </div>
                        </div> 
                    </div>
            </div>
            ))}
        </div>
        
        <div className='bg-white overflow-y-scroll p-2 bg-opacity-20 w-full h-[58vh] rounded-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            
             {/* row 1 */}
             <div className='py-4 '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                    <div>
                         <span className='text-[1.8rem] font-bold'>Made for {cookies.User.user.name}</span>
                    </div>
                    <div>
                         <span className='text-[1rem] font-bold'>See all</span>
                    </div>

                </div>
                
                <div className="grid h-auto w-full grid-cols-6 gap-4">
                {Array(6).fill(0).map((_, index) => (
                    <div key={index} className=" w-full h-auto px-3 py-3">
                        <div className='text-[1rem] w-full h-auto hover:bg-opacity-25 hover:bg-white'>
                            {/* Image part */}
                            <div className='w-full aspect-square p-2'>
                                <img src="https://picsum.photos/400/400" className='w-30% aspect-square' />
                            </div> 
                            {/* Playlist Details */}
                            <div className='  w-full  h-auto py-3'>
                                <div className='w-full justify-center font-bold flex items-center h-[100%]'>
                                    English{index + 1}
                                </div>
                            </div> 
                        </div>
                    </div>
                ))}
                </div>
            </div>


            {/* row 2 */}
            <div className='py-4 '>
                    <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div>
                            <span className='text-[1.8rem] font-bold'>Jump Back In</span>
                        </div>
                        <div>
                            <span className='text-[1rem] font-bold'>See all</span>
                        </div>

                    </div>                
                <div className="grid h-auto w-full grid-cols-6 gap-4">
                {Array(6).fill(0).map((_, index) => (
                    <div key={index} className=" w-full h-auto px-3 py-3">
                        <div className='text-[1rem] w-full h-auto hover:bg-opacity-25 hover:bg-white'>
                            {/* Image part */}
                            <div className='w-full aspect-square p-2'>
                                <img src="https://picsum.photos/400/400" className='w-30% aspect-square' />
                            </div> 
                            {/* Playlist Details */}
                            <div className='  w-full  h-auto py-3'>
                                <div className='w-full justify-center font-bold flex items-center h-[100%]'>
                                    English{index + 1}
                                </div>
                            </div> 
                        </div>
                    </div>
                ))}
                </div>
            </div>


             {/* row 3 */}
             <div className='py-4 '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div>
                            <span className='text-[1.8rem] font-bold'>Made for {cookies.User.user.name}</span>
                        </div>
                        <div>
                            <span className='text-[1rem] font-bold'>See all</span>
                        </div>

                    </div>                
                <div className="grid h-auto w-full grid-cols-6 gap-4">
                {Array(6).fill(0).map((_, index) => (
                    <div key={index} className=" w-full h-auto px-3 py-3">
                        <div className='text-[1rem] w-full h-auto hover:bg-opacity-25 hover:bg-white'>
                            {/* Image part */}
                            <div className='w-full aspect-square p-2'>
                                <img src="https://picsum.photos/400/400" className='w-30% aspect-square' />
                            </div> 
                            {/* Playlist Details */}
                            <div className='  w-full  h-auto py-3'>
                                <div className='w-full justify-center font-bold flex items-center h-[100%]'>
                                    English{index + 1}
                                </div>
                            </div> 
                        </div>
                    </div>
                ))}
                </div>
            </div>


            {/* row 4 */}
            <div className='py-4 '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div>
                            <span className='text-[1.8rem] font-bold'>Made for {cookies.User.user.name}</span>
                        </div>
                        <div>
                            <span className='text-[1rem] font-bold'>See all</span>
                        </div>

                    </div>                
                <div className="grid h-auto w-full grid-cols-6 gap-4">
                {Array(6).fill(0).map((_, index) => (
                    <div key={index} className=" w-full h-auto px-3 py-3">
                        <div className='text-[1rem] w-full h-auto hover:bg-opacity-25 hover:bg-white'>
                            {/* Image part */}
                            <div className='w-full aspect-square p-2'>
                                <img src="https://picsum.photos/400/400" className='w-30% aspect-square' />
                            </div> 
                            {/* Playlist Details */}
                            <div className='  w-full  h-auto py-3'>
                                <div className='w-full justify-center font-bold flex items-center h-[100%]'>
                                    English{index + 1}
                                </div>
                            </div> 
                        </div>
                    </div>
                ))}
                </div>
            </div>
            
        </div>

        
      

    </div>
  )
}

export default Loggedrightpart