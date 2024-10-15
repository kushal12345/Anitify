import React,{useState} from 'react'
import { Button } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import {TextField,MenuItem} from '@mui/material';
import { styled } from '@mui/material/styles';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

const Addtrack = ({onClose}) => {
  const [music, setMusic] = useState([]);
  const [albumCover, setAlbumCover] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');

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

  const handleMusicUpload = (event) => {
    console.log(event);
    setMusic(event.target.files);
  };

  const handleAlbumCoverUpload = (event) => {
    setAlbumCover(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submission logic here
    console.log('Form submitted:', {
      music,
      albumCover,
      releaseDate,
      albumTitle,
      artist,
      genre,
    });
  };


  return (
    <div className='w-full aspect-square overflow-y-scroll text-blue-600 grid grid-rows [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        <div className='flex items-center justify-end'>
             <RxCross2  className=' cursor-pointer' onClick={onClose}  />
        </div>
        <div className=''>
            <h1 className='text-4xl font-bold text-center mb-2'>Upload Music</h1>
            <span className='w-full flex items-center justify-center text-sm mb-4'>Upload your music files and add album details here.</span>
            <div className='  grid grid-rows'>
            <form onSubmit={handleSubmit }>
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
                                onChange={() => handleMusicUpload}
                                multiple
                              />
                            </Button>
                            {music && (music)}
                    </div>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="cover"  className='font-bold'>Album Cover</label>
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
                                onChange={() => handleAlbumCoverUpload}
                              />
                            </Button>
                    </div>
                      {albumCover && (
                        <img src={albumCover} alt="Album cover preview" className="w-16 h-16 object-cover rounded" />
                      )}
                    </div>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="releaseDate" className='font-bold'>Release Date</label>
                    <div className="relative">
                      <Button
                        variant="contained"
                        className={`
                          justify-start text-left font-normal
                          ${!releaseDate && 'text-gray-400'}
                        `}
                      >
                        {releaseDate ? "" : <span>Pick a date</span>}
                      </Button>
                      <div className="absolute top-0 right-0">
                        
                      </div>
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
  )
}

export default Addtrack