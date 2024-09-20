import React,{useState} from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Bodylayout = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return ( 
    <div className='grid grid-cols-10  h-auto gap-2'>
        <div className={`col-span-2 w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl h-screen overflow-hidden flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 `}>
          <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setSidebarOpen(!setSidebarOpen)}>
            <X size={24} />
          </Button>
            <Sidebar/>
        </div>
        <div className='col-span-8 w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-visible  '>
            {children}
        </div>
    </div>
  )
}

export default Bodylayout