import React, { useState, useEffect } from 'react';
import { FaPlayCircle } from "react-icons/fa";
import api from '../../../Services/api';
import { baseURL } from '../../../Services/config';
import Loading from '../../Loading/Loading';


const Popularalbums = () => {
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/albums/all`);
        const albumsData = response.data;

        console.log(albumsData); // Log the entire response data

        if (albumsData.success) {
          setArtistName(albumsData.artistdetails[0]?.name); // Access the artist name
          setAlbums(albumsData.result[0] || []); // Access the first array of albums
        } else {
          setArtistName('');
          setAlbums([]);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
        setError("Failed to load albums.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) return <div><Loading/></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='text-white h-auto py-3 w-full'>
      {/* Head part */}
      <div className='h-1/6 my-4 grid grid-cols-6'>
        <div className='col-start-1 col-end-5 flex px-3 items-center'>
          <h2><span className='font-bold text-xl'>POPULAR ALBUMS</span></h2>
        </div>
        <div className='col-start-5 px-4 col-end-7 flex items-center justify-end'>
          <span className='underline'>See all</span>
        </div>
      </div>
      {/* Body part */}
      <div className='h-5/6 mb-5 w-full grid xs:grid-cols-3 xs:grid-rows-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-6 md:grid-rows-1 lg:grid-cols-6 lg:grid-rows-1 xl:grid-cols-6 xl:grid-rows-1'>
        {
          albums.slice(0,6).map((album,index) => (
            <div className='w-full px-1 items-center group' key={index}> {/* Use a unique key */}
              {/* Image and text content */}
              <div className='w-full h-auto flex items-center justify-center'>
                <div  className='w-11/12  relative aspect-square overflow-hidden shadow-xl'>
                  <img src={`${baseURL}/${artistName}/${album.title}/${album.image}`} 
                    className='object-cover'
                    alt={album.title} /> {/* Use the album title as the alt text */}
                  <div className='absolute bottom-3 right-5 text-gray-500 aspect-square rounded-full hidden group-hover:block'>
                    <FaPlayCircle color='#1E90FF' size="36px" />
                  </div>
                </div>
              </div>
              <div className='w-full flex mt-3 justify-center h-auto'>
                <span className='text-lg'>{album.title}</span> {/* Display the album title */}
              </div>
              <div className='w-full flex justify-center h-auto mt-2'>
                <span className='text-sm'>By {artistName}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Popularalbums;