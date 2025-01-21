import React,{useState,useEffect} from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import { useContext } from 'react'
import AuthContext from '../Components/Hooks/Auth/AuthContext'
import Playbar from '../Components/Playbar/Playbar'
import { ProtectRoutes } from '../Components/Hooks/Protectroutes/protect'
import Playlisthome from '../Components/Playlist/Playlisthome';
import TrackContext from '../Components/Hooks/Auth/TrackContext';

const Bodylayout = ({children}) => {
  const { currentTrackUrl,currentTitle,currentArtist,currentPlayingid } = useContext(TrackContext);

  const {sidebarOpen, setSidebarOpen }= useContext(AuthContext);
  const [playlistpage, setplaylistpage] = useState(false);
  const [fdata,setfdata]= useState(null);

  return ( 
    <div className='h-screen'>
      <div className='grid grid-cols-10 h-[90%] overflow-hidden gap-2'>
        <div className={` w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl h-auto overflow-hidden  transform ${sidebarOpen ? 'xs:col-span-10 sm:col-span-10 md:col-span-2 lg:col-span-2 xl:col-span-2' : 'xs:hidden  sm:hidden md:block  md:col-span-2  lg:block lg:col-span-2 xl:block  xl:col-span-2'} transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 `}>
            <Sidebar setplaylistpage={setplaylistpage} setfdata={setfdata} setSidebarOpen={setSidebarOpen}/>
        </div>
        <div className={` h-screen  w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-visible flex flex-col transform ${sidebarOpen ? ' xs:hidden  sm:hidden  md:block  md:col-span-8 lg:block  lg:col-span-8 xl:block  xl:col-span-8' : ' xs:col-span-10 sm:col-span-10 md:col-span-8  lg:col-span-8  xl:col-span-8 '} transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0  `}>
            { playlistpage?<Playlisthome setplaylistpage={setplaylistpage} fdata={fdata} />:children}
        </div>
      </div>
      <div className='w-full h-[10%]'>
        {
              <Playbar url={currentTrackUrl?currentTrackUrl:null} title={currentTitle?currentTitle:null} artist={currentArtist?currentArtist:null} id={currentPlayingid?currentPlayingid:null} />
        }       
      </div>
    </div>
    
  )
}

export default Bodylayout