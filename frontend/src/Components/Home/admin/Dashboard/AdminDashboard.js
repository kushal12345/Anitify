import React,{useState,useEffect} from 'react'
import { useContext } from 'react'
import AuthContext from '../../../Hooks/Auth/AuthContext';
import { baseURL } from '../../../../Services/config';
import api from '../../../../Services/api';
import fetchAlbums from '../../../Functions/Fetchalbums';
import Loading from '../../../Loading/Loading';
import FetchArtist from '../../../Functions/Fetchartist';
import { FaPlayCircle } from "react-icons/fa";

const AdminDashboard = ({setsecondPage, setshow}) => {
    const {cookies} = useContext(AuthContext);
    const [albums,setAlbums] = useState([]);
    const [albumsas,setAlbumsas] = useState([]);
    const [formData,setformData] = useState([]);
    const [formDataspecific,setformDataspecific] = useState([]);
    const [finalalbum,setfinalalbum] = useState([]);
    const [finalalbumaa,setfinalalbumaa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formDataartist,setformDataartist] = useState([]);
   
    useEffect(() => {
      setLoading(true);
      FetchArtist('all',setformDataartist);
      setLoading(false);     
    },[setformData])



    useEffect(() => {
      setLoading(true);
      fetchAlbums(cookies.User._id, setformDataspecific, setAlbumsas)
      setLoading(false); // Set loading false after fetch
    }, [cookies]);
    
    useEffect(() => {
      setLoading(true);
      fetchAlbums('all', setformData, setAlbums)
      setLoading(false); // Set loading false after fetch
    }, []);

    useEffect(() => {
      //setfinalalbum([albums, artistName]);
      setfinalalbum(formData.result);
    }, [formData]);
    
    useEffect(() => {
      //setfinalalbum([albums, artistName]);
      setfinalalbumaa(formDataspecific.result);
    }, [formDataspecific]);



// Run this effect whenever albums or artistName changes
if (loading) return <div><Loading/></div>;
if (error) return <div>{error}</div>;
  return (
    <div> <main className="flex-1 p-8 pb-10 mb-10" >
    <h1 className="text-3xl font-bold mb-8">Good afternoon, {(cookies.User.name)?cookies.User.name:"User"}</h1>
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="glass p-4 rounded-lg">
        <h2 className="text-white">Monthly Listeners</h2>
        <p className="text-2xl font-bold">3.2M</p>
        <p className="text-green-700 ">+20.1% from last month</p>
      </div>
      <div className="glass  p-4 rounded-lg">
        <h2 className="text-white">Total Streams</h2>
        <p className="text-2xl font-bold">1.8B</p>
        <p className="text-green-700">+15.3% from last month</p>
      </div>
      <div className="glass p-4 rounded-lg">
        <h2 className="text-white">Followers</h2>
        <p className="text-2xl font-bold">108.6M</p>
        <p className="text-green-700">+2.5% from last month</p>
      </div>
      <div className="glass  p-4 rounded-lg">
        <h2 className="text-white">Revenue</h2>
        <p className="text-2xl font-bold">$42.8K</p>
        <p className="text-green-700">+8.2% from last month</p>
      </div>
    </div>
    <div className="mb-8">
      <button className="bg-white text-black px-4 py-2 rounded-full mr-2">For You</button>
      <button className="glass bg-opacity-40 text-white px-4 py-2 rounded-full mr-2">Recently Played</button>
      <button className="glass bg-opacity-40 text-white px-4 py-2 rounded-full">Artist Insights</button>
    </div>

    <h2 className={`text-2xl my-8 font-bold mb-4 `}> {finalalbumaa && finalalbumaa.length>=1 ? 'Your Total Albums':""}</h2>
    <div className="grid grid-cols-4 gap-4 my-5">
    {
            finalalbumaa && finalalbumaa.slice(0, 4).map((album, index)=>{
              if (!album || !album.title || !album.image) {
                return null;
              }
                return(
                    <div key={index} className="glass bg-opacity-35 w-full flex flex-col items-center justify-center p-4 rounded-lg hover:cursor-pointer" onClick={()=>{setsecondPage(true);setshow(album)}}>
                        <img src={`${baseURL}/${album.artist}/${album.title}/${album.image}`} alt="Artist 1" className="w-24 h-24 overflow-hidden rounded-full mb-4" />
                        <p className="text-center">{album.title}</p>
                    </div>
                )
            })
        }
    </div>


    <h2 className="text-2xl font-bold mb-4">Popular Albums Right Now</h2>
    <div className="grid grid-cols-4 gap-4 my-5"> 
        {
            finalalbum && finalalbum.slice(0, 4).map((album, index)=>{
              if (!album || !album.title || !album.image) {
                return null;
              }
                return(
                    <div key={index} className="glass bg-opacity-35 w-full flex flex-col items-center justify-center p-4 rounded-lg hover:cursor-pointer" onClick={()=>{setsecondPage(true);setshow(album)}}>
                        <img src={`${baseURL}/${album.artist}/${album.title}/${album.image}`} alt="Artist 1" className="w-24 h-24 overflow-hidden rounded-full mb-4" />
                        <p className="text-center">{album.title}</p>
                    </div>
                )
            })
        }
    </div>


  
    <h2 className={`text-2xl my-8 font-bold mb-4 `}>Popular Artist's Right Now </h2>
    <div className='h-5/6   mb-1 w-full grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1 '>
              {
                formDataartist.slice(0, 6).map((data, index) => {
                  return (
                    <div className='w-full h-auto group' key={index}>
                      {/* image and text content */}
                      <div className='w-full h-auto flex items-center justify-center'>
                        <div className='w-8/12 bg-white relative aspect-square rounded-full  overflow-hidden shadow-xl '>
                          <img src={data.image?`${baseURL}/${data.name}/profile/${data.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'} 
                            className='w-full h-full object-cover'
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
    
  </main></div>
  )
}

export default AdminDashboard