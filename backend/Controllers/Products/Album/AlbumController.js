import Catchasyncerror from "../../../Middleware/Catchasyncerror.js";
import Album from "../../../Models/Products/Album/Albummodel.js";
import Track from "../../../Models/Products/Track/Trackmodel.js";
import logger from "../../../Logger/config.js";
import fs from 'fs';
import path from "path";
import Artist from "../../../Models/Products/Artist/Artistmodel.js";

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