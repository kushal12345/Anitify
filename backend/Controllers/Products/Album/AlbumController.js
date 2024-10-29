import Catchasyncerror from "../../../Middleware/Catchasyncerror.js";
import Album from "../../../Models/Products/Album/Albummodel.js";
import Track from "../../../Models/Products/Track/Trackmodel.js";
import logger from "../../../Logger/config.js";
import fs from 'fs';
import path from "path";
import Artist from "../../../Models/Products/Artist/Artistmodel.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Buffer } from 'buffer'; // Import Buffer if needed

export const AlbumCreate = Catchasyncerror(async (req, res, next) => {
    const { name } = req.params;
    const { albumTitle, artist, genre, selectedDate } = req.body;
    const musicrawfile = req.files.music ? req.files.music : null;
    const musicFiles = req.files.music ? req.files.music.map(file => file.filename) : [];
    const albumCoverFile = req.files.albumCover ? req.files.albumCover[0].filename : null;


    console.log('Received data:', {
        username: req.params.name,
        albumTitle,
        artist,
        genre,
        selectedDate,
        musicFiles,
        albumCover: albumCoverFile
    });

    if (name && albumTitle && artist && genre && selectedDate && musicFiles.length > 0 && albumCoverFile) {
        const album = await Album.findOne({ title: albumTitle });
        if (album) {
            console.log(`${albumTitle} already exists`);
            return res.status(400).json({ message: `${albumTitle} already exists` });
        }

        for (const file of musicFiles) {
            const track = await Track.findOne({ title: file }); 
            if (track) {
                return res.status(400).json({ message: `${file} already exists` });
            }
        }

        const artistas = await Artist.findOne({name: name});

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
                        album: albumadd._id// Associate the track with the album
                    });

                    //if track added update albummodel with Track id for ref
                    if(Trackasas){
                        // Update Album model with Track ID for reference
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
                //update Artist model with album model
                await Artist.updateOne(
                    { _id: artistas._id }, // Use artistas._id instead of albumadd._id
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
    } else {
        return res.status(400).json({ success: false, message: "Received data is empty" });
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const albumfetch = Catchasyncerror(async (req, res, next) => {
    const id = req.params.id;
    let artistfile;
   

    try {
        if (id === 'all') {
            artistfile = await Artist.find();
        } else {
            artistfile = await Artist.findById(id);
            if (!artistfile) {
                return res.status(404).json({ success: false, message: 'Artist not found' });
            }
        }
        let uploadsPath;
        let imageBlob;
        if (Array.isArray(artistfile)) {
            const albumsPromises = artistfile.map(async (artist) => {
                return await Promise.all(artist.albums.map(async (file) => {
                    const album = await Album.findById(file._id);
                    /*if (album && album.image) {
                        uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads',artistfile.name,album.title); // Adjusting the path to reach the uploads directory
                        const imagePath = path.join(uploadsPath, album.image); // Use the corrected uploads path
                        const imageBuffer = fs.readFileSync(imagePath);
                        const blob = Buffer.from(imageBuffer).toString('base64');
                        album.imageBlob = `data:image/jpeg;base64,${blob}`;
                    }*/
                    return album;
                }));
            });

            const albums = await Promise.all(albumsPromises);
            return res.status(200).json({ success: true, result: albums, artistdetails:artistfile });
        } else {
            const albums = await Promise.all(artistfile.albums.map(async (file) => {
                const album = await Album.findById(file._id);
             
               /* if (album && album.image) {
                    uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads',artistfile.name,album.title); // Adjusting the path to reach the uploads directory
                    const imagePath = path.join(uploadsPath, album.image); // Use the corrected uploads path
                    const imageBuffer = fs.readFileSync(imagePath);
                    const blob = Buffer.from(imageBuffer).toString('base64');
                    imageBlob = `data:image/jpeg;base64,${blob}`;
                }*/
                return album;
            }));
            return res.status(200).json({ success: true, result: albums, artistdetails:artistfile });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});


export const trackfetch = Catchasyncerror(async (req, res, next) => {
    const id = req.params.id;
    const title = req.params.title;

    try {
        if (!id || !title) {
            return res.status(400).json({ success: false, message: 'Please provide both id and title' });
        }

        // Await the database calls to get the actual artist and album
        const artist = await Artist.findById(id);
        console.log("Track searching artist:", artist);

        if (!artist) {
            return res.status(404).json({ success: false, message: 'Artist not found' });
        }

        const albumt = await Album.findOne({ title: title }); // Use findOne to get a single album
        console.log("Track Searching album:", albumt);

        // Check if the album was found
        if (!albumt) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }

        // Ensure artist.albums is an array
        if (Array.isArray(artist.albums)) {
            // Convert artist.albums to strings for comparison
            const albumIds = artist.albums.map(albumId => albumId.toString());

            if (albumIds.includes(albumt._id.toString())) {
                console.log("album._id is in artist.albums");
                const tracks = await Track.find({ album: albumt._id });
                return res.status(200).json({ success: true, result: tracks });
            } else {
                console.log("album._id is not in artist.albums");
                return res.status(404).json({ success: false, message: 'Album not found in artist albums' });
            }
        } else {
            console.error("artist.albums is not an array");
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});