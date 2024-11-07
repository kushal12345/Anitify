import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import Footer from '../../Footer/Footer';
import fetchAlbums from '../../Functions/Fetchalbums.js';
import Loading from '../../Loading/Loading.js';
import { baseURL } from '../../../Services/config.js';
import FetchArtist from '../../Functions/Fetchartist.js';

const Loggedrightpart = ({setsecondPage, setshow}) => {

    const {cookies} = useContext(AuthContext);
    const [albums,setAlbums] = useState([]);
    const [formData,setformData] = useState([]);
    const [finalalbum,setfinalalbum] = useState([]);
    const [artistName, setArtistName] = useState(cookies.User ? cookies.User.name : null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [artist,setartist] = useState([]);

    useEffect(() => {
        setLoading(true);
        FetchArtist('all',setartist);
        setLoading(false);     
      },[setartist])
  

    useEffect(() => {
        const loadAlbums = async () => {
            setLoading(true);
            await fetchAlbums('all', setformData, setAlbums, setArtistName);
            setLoading(false);
            };
        
            loadAlbums();
        }, [setformData, setAlbums, setArtistName]);
        
        
        useEffect(() => {
            setfinalalbum([albums, artistName]);
        }, [albums, artistName]); 
        
    // Run this effect whenever albums or artistName changes
    if (loading) return <div><Loading/></div>;
    if (error) return <div>{error}</div>;
    

  return (
    <div className='h-full py-1 -z-[1] overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] '>
                
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
            {Array(8).fill(0).map((_, index) => {
               
                return(
                <div key={index} className=" h-15 ">
                    <div className='flex text-[1rem] bg-white bg-opacity-20 hover:bg-opacity-35 w-full h-auto'>
                    {/* Image part  */}
                        <div className=' w-[25%] aspect-square p-1'>
                        <img src="https://picsum.photos/400/400" className='w-20% aspect-square' />
                        </div> 
                    {/* Playlist Details */}
                        <div  className=' w-[70%]'>
                            <div className='w-full font-bold flex items-center  h-[100%]'>
                                English{index + 1}
                            </div>
                        </div> 
                    </div>
                </div>
            )
             })}
        </div>
        
        <div className='bg-white overflow-y-scroll p-2 bg-opacity-20 w-full h-auto rounded-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <span className='text-[1.8rem] my-3 font-bold'>Hello {cookies.User.name} </span>

            <div className='py-4 '>
                    <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div>
                            <span className='text-[1.4rem] font-bold'>Popular Artists</span>
                        </div>
                        <div>
                            <span className='text-[1rem] font-bold'>See all</span>
                        </div>

                    </div>                
                <div className=" h-auto w-full  grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1  gap-4">
                {artist.slice(0, 6).map((data, index) => (
                    <div key={index} className=" w-full h-auto px-3 py-3">
                        <div className='text-[1rem] w-full h-auto hover:bg-opacity-25 hover:bg-white'>
                            {/* Image part */}
                            <div className=' w-11/12 bg-white relative aspect-square rounded-full  overflow-hidden shadow-xl'>
                                <img src={data.image?`${baseURL}/${data.name}/profile/${data.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'} className='w-full h-full object-cover' />
                            </div> 
                            {/* Playlist Details */}
                            <div className='  w-full  h-auto py-3'>
                                <div className='w-full justify-center font-bold flex items-center h-[100%]'>
                                    {data.name}
                                </div>
                            </div> 
                        </div>
                    </div>
                ))}
                </div>
            </div>
             {/* row 1 */}
             <div className='py-4 '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                    <div>
                         <span className='text-[1.4rem] font-bold'>Popular albums </span>
                    </div>
                    <div>
                         <span className='text-[1rem] font-bold'>See all</span>
                    </div>
                </div>
                
                <div className=" h-auto w-full  grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1  gap-4">
                {finalalbum[0] && finalalbum[0].slice(0, 4).map((album, index) => {
                     if (!album || !album.title || !album.image) {
                        return null;
                    }
                    return(
                    <div key={index} className=" w-full h-auto px-3 py-3" onClick={()=>{setsecondPage("albums");setshow([album,finalalbum[1]])}}>
                        <div className='text-[1rem] w-full h-auto hover:bg-opacity-25 hover:bg-white'>
                            {/* Image part */}
                            <div className='w-full aspect-square p-2'>
                                <img src={album.image?`${baseURL}/${artistName.name}/${album.title}/${album.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'} className='w-full h-full object-cover' />
                            </div> 
                            {/* Playlist Details */}
                            <div className='  w-full  h-auto py-3'>
                                <div className='w-full justify-center font-bold flex items-center h-[100%]'>
                                    {album.title}
                                </div>
                                <div className='w-full flex justify-center h-auto mt-2'>
                                    <span className='text-sm'>By {artistName.name ? artistName.name : 'Unknown Artist'}</span>
                                </div>
                            </div> 
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>


            {/* row 2 */}
           
        </div>

        <Footer/>
      

    </div>
  )
}

export default Loggedrightpart