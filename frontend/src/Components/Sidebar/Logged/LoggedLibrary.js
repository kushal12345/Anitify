import React,{useState} from 'react'

const LoggedLibrary = () => {
  return (
    <div className='flex w-full h-screen'>
           
        {/* Tag part  */}
        <div className='w-full px-2 h-[8%]'>
            <div className='flex items-center h-full w-full items-center gap-3'  >
            
                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px] ' >
                        Playlist
                    </div>

                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex  rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px]'>
                        Artists
                    </div>

                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto min-w-[100px]'>
                        Albums
                    </div>

                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 w-full '>
                        Podcasts
                    </div>
            </div>
        </div>

    </div>
  )
}

export default LoggedLibrary