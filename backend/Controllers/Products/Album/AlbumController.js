import Catchasyncerror from "../../../Middleware/Catchasyncerror.js";
import Album from "../../../Models/Products/Album/Albummodel.js";
import Track from "../../../Models/Products/Track/Trackmodel.js";
import logger from "../../../Logger/config.js";
import fs from 'fs';
import path from "path";
import Artist from "../../../Models/Products/Artist/Artistmodel.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Buffer } from 'buffer';
import LikeAlbum from "../../../Models/Products/Album/LikeAlbum.js";
import Liketracks from "../../../Models/Products/Track/LikeTrack.js";

export const AlbumCreate = Catchasyncerror(async (req, res, next) => {
    const { name } = req.params;
    const { albumTitle, artist, genre, selectedDate } = req.body;
    const musicrawfile = req.files.music ? req.files.music : null;
    const musicFiles = req.files.music ? req.files.music.map(file => file.filename) : [];
    const albumCoverFile = req.files.albumCover ? req.files.albumCover[0].filename : null;

    if (!musicrawfile || musicrawfile.length === 0) {
        return res.status(400).json({ success: false, message: "Music files are required." });
    }
    
    // Check if album cover file is provided
    if (!albumCoverFile) {
        return res.status(400).json({ success: false, message: "Album cover file is required." });
    }

    console.log('Received data:', {
        username: req.params.name,
        albumTitle,
        artist,
        genre,
        selectedDate,
        musicFiles,
        albumCover: albumCoverFile
    });

    // Check if all required fields are present
    if (!name || !albumTitle || !artist || !genre || !selectedDate || musicFiles.length === 0 || !albumCoverFile) {
        return res.status(400).json({ success: false, message: "Received data is incomplete" });
    }

    // Check if the album already exists
    const album = await Album.findOne({ title: albumTitle });
    if (album) {
        console.log(`${albumTitle} already exists`);
        return res.status(400).json({ message: `${albumTitle} already exists` });
    }

    // Check for duplicate tracks
   /* for (const file of musicFiles) {
        const track = await Track.findOne({ title: file });
        if (track) {
            return res.status(400).json({ message: `${file} already exists` });
        }
    }*/

    //check for duplicates but improved approach
    const existingTracks = await Track.find({ title: { $in: musicFiles } });

    for (const file of musicFiles) {
        if (existingTracks.some(track => track.title === file)) {
            return res.status(400).json({ message: `${file} already exists` });
        }
    }    

    // Find the artist
    const artistas = await Artist.findOne({ name: name });
    if (!artistas) {
        return res.status(404).json({ message: 'Artist not found' });
    }

    try {
        const albumadd = await Album.create({
            title: albumTitle,
            artist: artistas._id,
            collabartist: artist,
            releaseDate: selectedDate,
            image: albumCoverFile,
        });

        if (albumadd) {
            for (const file of musicrawfile) {
                const Trackasas = await Track.create({
                    title: file.originalname,
                    duration: file.size,
                    album: albumadd._id // Associate the track with the album
                });

                // If track added, update Album model with Track ID for reference
                if (Trackasas) {
                    await Album.updateOne(
                        { _id: albumadd._id },
                        {
                            $push: {
                                tracks: Trackasas._id // Use $push to add Track ID to the array
                            }
                        }
                    );
                }
            }
            // Update Artist model with album model
            await Artist.updateOne(
                { _id: artistas._id },
                {
                    $push: {
                        albums: albumadd._id // Use $push to add Album ID to the array
                    }
                }
            );
        }

        return res.status(201).json({
            success: true,
            message: 'Album and tracks added successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const albumfetch = Catchasyncerror(async (req, res, next) => {
    const id = req.params.id;
    let artistfile;

   
    if(!id){
        return res.status(400).json({ success: false, message: "Missing album id"});
    }

    try {
        if (id === 'all') {
            const albums = await Album.find().populate('artist', 'name'); // Populate only the artist's name


            if (!albums || albums.length === 0) {
                return res.status(404).json({ success: false, message: 'No albums found' });
            }
        
            // Transform the albums to include only the necessary fields
            const albumsWithArtists = albums.map(album => {
                return {
                    ...album.toObject(), // Convert mongoose document to plain object
                    artist: album.artist ? album.artist.name : null // Set the artist name or null if not found
                };
            });

            
        
            return res.status(200).json({ success: true, result: albumsWithArtists });
        } else {
                const artist = await Artist.findById(id);
                
                if (!artist) {
                    return res.status(404).json({ success: false, message: "Artist not found"});
                }



                const albums = await Album.find({artist:id}).populate('artist', 'name'); // Populate only the artist's name

                if (!albums) {
                    return res.status(404).json({ success: false, message: 'Album not found' });
                }

                const albumsWithArtists = albums.map(album => {
                return {
                    ...album.toObject(), // Convert mongoose document to plain object
                        artist: album.artist ? album.artist.name : null // Set the artist name or null if not found
                    };
                });
                
                console.log(albumsWithArtists);
                return res.status(200).json({ success: true, result: albumsWithArtists });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});


export const trackfetch = Catchasyncerror(async (req, res, next) => {
    const id = req.params.id;  

    if(!id){
        return res.status(400).json({ success: false, message: 'Invalid request' });
    }

    try {
        const Tracks = await Track.find({album:id}).populate('album','title');

        if(!Tracks){
            return res.status(404).json({ success: false, message: 'Track not found'});
        }
        return res.status(200).json({ success: true, result: Tracks });
      
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
    
});







export const LikeAlbumController = Catchasyncerror(async (req, res, next) => {
    const id = req.params.albumid;
    const likelike = req.body.newLiked;
    const likedata = req.params.likedata;
    const Authority = req.body.Authority;
    const userId = req.params.logid;
    
    console.log("id",id);
    console.log("likelike",likelike);
    console.log("likedata",likedata);
    console.log("Authority",Authority);
    console.log("userId",userId);



    let dbdata,dblikedata,dbquery,artist;
    
    if(!id && !likelike && !userId && !likedata){
        console.log("Please provide details first");
        return res.status(400).json({ success: false, message: 'Please provide details on LikeAlbumController'});        
    }
    if(likedata==='album'){
        dbdata = Album;
        dbquery="albums";
        dblikedata=LikeAlbum;
        artist = await Artist.findOne({albums:id});

        if(!artist) {
            console.log("No user found");
            return res.status(404).json({ success: false, message: 'User not found'})
        }

    }else if(likedata ==='track'){
        dbdata = Track;
        dbquery="tracks";
        dblikedata = Liketracks;
        const tracke = await Track.findById(id).populate(`album`,`title`);
        const albumId = tracke.album._id;
        artist = await Artist.find({albums:albumId});

        if(!artist) {
            console.log("No user found");
            return res.status(404).json({ success: false, message: 'User not found'})
        }

    }else {
        return res.status(400).json({ success: false, message: 'Invalid likedata type' });
    }

    if (!dbdata) {
        return res.status(400).json({ success: false, message: 'Database model not found' });
    }
    
    // Check if the album exists
    const album = await dbdata.findById(id);
    if (!album) {
        console.log("No album found");
        return res.status(404).json({ success: false, message: 'Album not found' });
    }

  
    if(Authority !== 'artist' && Authority !== 'user'){
        console.log("Invalid Authority");
        return res.status(404).json({ success: false, message: 'Invalid Authority' });
    }
    
   

    // Check if a like record already exists for this album
    let likedAlbum;
    if(likedata==='album'){
        likedAlbum = await dblikedata.findOne({ album: id }) || await dblikedata.create({ album: id, likestate: false, users: [] });
    }else if(likedata ==='track'){
        likedAlbum = await dblikedata.findOne({ track: id }) || await dblikedata.create({ track: id, likestate: false, users: [] });
    }
    
    
    
    
    
    // Handle like and unlike requests
    if (likelike === true) {
        // Increase the like count
        if(!likedAlbum.users.includes(userId)) {
            console.log("passed")
            likedAlbum.likestate=likelike;
            likedAlbum.users.push(userId);

        }else{
            console.log("already liked");
        }
     
    } else if (likelike === false) {
        // Decrease the like count  

            if(likedAlbum.users.includes(userId)) {
                console.log("when disliked users is included inarray")
                likedAlbum.likestate=likelike;
                likedAlbum.users.pull(userId);
            }else{
                //increase like count
                console.log("you havenot liked yet");
            }

    } else {
        return res.status(400).json({ success: false, message: 'Invalid like status' });
    }
    await likedAlbum.save();
    console.log(`Updated like count for ${likedata} ${id}:`, likedAlbum.users.length);
    console.log(likedAlbum);
    return res.status(200).json({ success: true, likeCount: likedAlbum });
    
});


export const FetchLikealbum  = Catchasyncerror(async (req,res,next)=>{
    const id = req.params.albumid;
    const loggedinID = req.params.logid;
    const data = req.params.data;
    
    if(!id){
        return res.status(404).json({ success: false, message: 'Invalid album id'})
    }

    if(!data){
        return res.status(404).json({ success: false, message: 'Invalid data'});
    }

    
    if(data==='album'){
            const album = await LikeAlbum.find({album: id});
        
            if (album.length === 0) {
                return res.status(404).json({ success: false, message: 'Album not found' });
            }
            
            const abc =  album[0].users.includes(loggedinID);
            
            album.likestaus = abc;
            

            if(!album){
                return res.status(404).json({ success: false, message: 'Album not found'})
            }
            if (album.length === 0) {
                return res.status(404).json({ success: false, message: 'Album not found' });
            }
            
            return res.status(200).json({ success: true, result: album, likestatus: abc});

    }else if(data==='track'){
  
        let album;
            album = await Liketracks.find().populate('track','title') || await Liketracks.create({ track: id, likestate: false, users: [] }) ;

            if(!album){
                return res.status(404).json({ success: false, message: 'Track not found'});
            }
            const abc =  album && album.length > 0 ? album[0].users.includes(loggedinID):null;   
            album.likestatus = abc;
            

            return res.status(200).json({ success: true, result: album, likestatus: abc});
    }

})