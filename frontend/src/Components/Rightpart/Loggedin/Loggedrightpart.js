import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import Footer from '../../Footer/Footer';
const Loggedrightpart = () => {

    const {cookies} = useContext(AuthContext);

  return (
    <div className='h-full p-2 pl-5 -z-[1] overflow-y-scroll '>
                
        {/* Tag part  */}
        <div className='flex items-center h-auto w-full items-center gap-3 overflow-x-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] '  >
            
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
        
        <div className="h-auto grid my-4 grid-cols-4 grid-rows-2 gap-2">
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
        
        <div className='bg-white overflow-y-scroll p-2 bg-opacity-20 w-full h-auto rounded-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            
             {/* row 1 */}
             <div className='py-4 '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                    <div>
                         <span className='text-[1.8rem] font-bold'>Hello {cookies.User.name} </span>
                    </div>
                    <div>
                         <span className='text-[1rem] font-bold'>See all</span>
                    </div>

                </div>
                
                <div className=" h-auto w-full  grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1  gap-4">
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
                <div className=" h-auto w-full  grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1  gap-4">
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
                            <span className='text-[1.8rem] font-bold'>Made for { }</span>
                        </div>
                        <div>
                            <span className='text-[1rem] font-bold'>See all</span>
                        </div>

                    </div>                
                <div className=" h-auto w-full  grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1  gap-4">
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
                            <span className='text-[1.8rem] font-bold'>Made for {console.log(cookies.User) }</span>
                        </div>
                        <div>
                            <span className='text-[1rem] font-bold'>See all</span>
                        </div>

                    </div>                
                    <div className=" h-auto w-full  grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1  gap-4">
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

        <Footer/>
      

    </div>
  )
}

export default Loggedrightpart