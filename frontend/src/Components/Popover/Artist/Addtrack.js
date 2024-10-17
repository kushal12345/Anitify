import React,{useRef, useState} from 'react'
import { Button } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import {TextField,MenuItem} from '@mui/material';
import { styled } from '@mui/material/styles';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import api from '../../../Services/api';
import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';

const Addtrack = ({onClose}) => {
  const [music, setMusic] = useState([]);
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverdemo, setAlbumCoverdemo] = useState(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const {cookies} = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
 
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  const genres = [
    {
      "name": "Rock"
    },
    {
      "name": "Pop"
    },
    {
      "name": "Hip Hop"
    },
    {
      "name": "Jazz"
    },
    {
      "name": "Classical"
    },
    {
      "name": "Electronic"
    },
    {
      "name": "Reggae"
    },
    {
      "name": "Country"
    },
    {
      "name": "Blues"
    },
    {
      "name": "Metal"
    },
    {
      "name": "Folk"
    },
    {
      "name": "R&B"
    },
    {
      "name": "Indie"
    },
    {
      "name": "Latin"
    },
    {
      "name": "Punk"
    },
    {
      "name": "Disco"
    },
  ];

  const handleMusicUpload = (e) => {
    const song = Array.from(e.target.files);
   /* const musicFiles = [];
    for (let x of song) {
      musicFiles.push(song[x]);
    }
    setMusic(musicFiles);*/
    setMusic(song);
  };

  const handleAlbumCoverUpload = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toUpperCase();

    if (fileExtension === 'JPG' || fileExtension === 'JPEG') {
      // Allow JPG or JPEG files
      setAlbumCoverdemo(URL.createObjectURL(file));
      setAlbumCover(event.target.files[0]);

    } else {
      // Reject other file types
      console.error('Only JPG or JPEG files are allowed');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (music.length === 0) {
      snackbar.current.setAlert("Please select at least one music file.", "error");
          return;
      }
    // Add your submission logic here
    console.log('Form submitted:', {
      music,
      albumCover,
      selectedDate,
      albumTitle,
      artist,
      genre,
    });
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < music.length; i++) {
        formData.append('music', music[i]);
    }
    formData.append('albumCover',albumCover);
    formData.append('selectedDate',selectedDate);
    formData.append('albumTitle',albumTitle);
    formData.append('artist',artist);
    formData.append('genre',genre);
    console.log(formData);
    try {
      api.post(`/api/addtrack/${cookies.User.name}/${albumTitle}`,formData)
      .then(res=>{
        console.log(res.data);
        snackbar.current.setAlert("Sucessfully Added","success");
        const timerId = setTimeout(()=>{
          onClose();
        },1000);
        return ()=> {
          clearTimeout(timerId);
        }
      })
      .catch(error=>{
        console.log(error.response.data.message);
        snackbar.current.setAlert(`${error.response.data.message}`, "error");
      })
      .finally(()=>{
        setLoading(false);
      })
    } catch (error) {
      console.log(`${api} not found`);
      console.log(`Error part ${error.json}`);
      snackbar.current.setAlert(`${api} not Found`,"error");
      setLoading(false);
    }

  };

  const snackbar = useRef(null);

  return (
    <div className='w-full aspect-square overflow-y-scroll text-blue-600 grid grid-rows [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      <SnackbarAlert ref={snackbar}/>
      {
        loading?
        <Loading/>
        :
        <div>
            <div className='flex items-center justify-end'>
                  <RxCross2  className=' cursor-pointer' onClick={onClose}  />
              </div>
              <div className=''>
                  <h1 className='text-4xl font-bold text-center mb-2'>Upload Music</h1>
                  <span className='w-full flex items-center justify-center text-sm mb-4'>Upload your music files and add album details here.</span>
                  <div className='  grid grid-rows'>
                  <form onSubmit={handleSubmit } encType='multipart/form-data'>
                      <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <label htmlFor="albumTitle" className='font-bold'>Album Title</label>
                          <TextField                     
                            id="albumTitle"
                            name='albumTitle'
                            type='text'
                            placeholder="Enter album title" 
                            value={albumTitle} 
                            size="small" 
                            onChange={(event) => setAlbumTitle(event.target.value)} 
                            required
                          />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <label htmlFor="artist" className='font-bold'>Collaboration Artist</label>
                          <TextField
                            id="artist" 
                            name='artist'
                            type='text'
                            placeholder="Enter artist name" 
                            size="small" 
                            value={artist} 
                            onChange={(event) => setArtist(event.target.value)} 
                          />  
                        </div>
                        {artist?cookies.User.name+" ft."+artist:""}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <label htmlFor="music" className='font-bold'>Music Files (Multiple)</label>
                          <div className='w-[60%]'>
                          <Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              startIcon={<AudiotrackIcon />}
                            >
                              Upload tracks
                              <VisuallyHiddenInput
                                type="file"
                                name="music"
                                onChange={(event) => handleMusicUpload(event)}
                                multiple
                              />
                            </Button>
                            {music.length > 0 && (
                                <div>
                                    <h3>Selected Music Files:</h3>
                                    <ul>
                                        {music.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                                                      </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <label htmlFor="albumCover"  className='font-bold'>Album Cover</label>
                          <div className="flex items-center gap-4">
                            <div className='w-[60%]'>
                            <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<ArtTrackIcon />}
                                  >
                                    Upload Album Cover
                                    <VisuallyHiddenInput
                                      type="file"
                                      name="albumCover"
                                      onChange={(e) => handleAlbumCoverUpload(e)}
                                    />
                                  </Button>
                          </div>
                            {albumCoverdemo && (
                              <img src={albumCoverdemo} alt="Album cover preview" className="w-16 h-16 object-cover rounded" />
                            )}
                          </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <label htmlFor="releaseDate" className='font-bold'>Release Date</label>
                          <div className="relative">
                          <TextField
                            type="date"
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                            size='small'
                          />
                              {selectedDate ? selectedDate : ""}
                          </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <label htmlFor="genre" className='font-bold'>Genre</label>
                          <TextField
                                      select
                                      id="genre"
                                      name='genre'
                                      size='small'
                                      value={genre} 
                                      onChange={(event) => setGenre(event.target.value)}
                                      sx={{ width: '100%',color:'black' }}
                                      required
                                    >
                                      <MenuItem sx={{ color: 'black' }} value=""><em>Select Genre</em></MenuItem >
                                      {genres.map((genre, index) => (
                                        <MenuItem sx={{ color: 'black' }}  key={index} value={genre.name}>{genre.name}</MenuItem >
                                      ))}
                                    </TextField>
                        </div>
                      </div>
            <div className="flex justify-center gap-4 py-4">
              <Button variant='contained' type="submit">Upload</Button>
            </div>
          </form>
                  
                  </div>

              </div>

        </div>  
      }
         
    </div>
  )
}

export default Addtrack