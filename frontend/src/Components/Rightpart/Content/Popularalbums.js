import React, { useState, useEffect } from 'react';
import { FaPlayCircle } from "react-icons/fa";
import api from '../../../Services/api';
import { baseURL } from '../../../Services/config';
import Loading from '../../Loading/Loading';
import fetchAlbums from '../../Functions/Fetchalbums';

const Popularalbums = ({setsecondPage, setshow}) => {
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData,setformData] = useState([]);
  const [finalalbum,setfinalalbum] = useState([]);


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
          finalalbum[0] && finalalbum[0].slice(0,6).map((album,index) => {
            if (!album || !artistName.name || !album.title || !album.image) {
              return null;
            }
            return (
            <div className='w-full px-1 items-center group' key={index} onClick={()=>{setsecondPage("albums");setshow([album,finalalbum[1]])}}> {/* Use a unique key */}
              {/* Image and text content */}
              <div className='w-full h-auto flex items-center justify-center'>
                <div  className='w-11/12  relative aspect-square overflow-hidden shadow-xl'>
                  <img src={album.image?`${baseURL}/${artistName.name}/${album.title}/${album.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'}
                    
                    className='h-full w-full object-cover'
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
                <span className='text-sm'>By {artistName.name ? artistName.name : 'Unknown Artist'}</span>
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Popularalbums;