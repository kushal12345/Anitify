import logger from "../../Logger/config.js";
import Catchasyncerror from "../../Middleware/Catchasyncerror.js";
import Usert from "../../Models/Users/Usermodel.js";
import Artist from "../../Models/Products/Artist/Artistmodel.js";

export const ArtistRegister = Catchasyncerror(async (req, res, next) => {
    try {
        const { id } = req.params;

        const userfind = await Usert.findById(id);
        
        if (userfind) {
            // Check if the artist already exists
            const existingArtist = await Artist.findOne({ email: userfind.email });
            if (existingArtist) {
                return res.status(400).json({ success: false, message: "An artist with this email already exists." });
            }

            try {
                await Artist.create({
                    _id: id,
                    name: userfind.name,
                    email: userfind.email,
                    country: userfind.country,
                });
                return res.status(200).json({ success: true, message: "Successfully Registered as Artist" });
            } catch (error) {
                //console.error("During Registration artist:", error);
                return res.status(500).json({ success: false, message: "Something went wrong during registration." });
            }            
        } else {
            return res.status(400).json({ success: false, message: "You are not registered in Aurora. Please register first." });
        }

    } catch (error) {
        //console.error(error);
        logger(error);
        res.status(500).json({ success: false, message: "Unknown error occurred during registration." });    
    }
});

export const ArtistUpdate = Catchasyncerror(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nameprarms } = req.params.name;
        const { name, email, bio,auth, country } = req.body;
        const avatar = req.files.image ? req.files.image[0].filename : null;
        let userfind;

        if(auth==='artist'){
            userfind = await Artist.findById(id);
            if (userfind) {
                try {
                    const updatedArtist = await Artist.findByIdAndUpdate(id, {
                        name,
                        email,
                        bio,
                        country,
                        image: avatar
                    }, { new: true }); // Return the updated document
    
                    if (updatedArtist) {
                        return res.status(200).json({ success: true, message: "Successfully Updated Artist", artist: updatedArtist });
                    }
                } catch (error) {
                    //console.error("During Updating artist:", error);
                    return res.status(500).json({ success: false, message: "Something went wrong during update." });
                }            
            } else {
                return res.status(400).json({ success: false, message: "You are not registered in Aurora. Please register first." });
            } 
        }else if(auth === 'user'){
            userfind = await Usert.findById(id);
            if (userfind) {
                try {
                    const updatedArtist = await Usert.findByIdAndUpdate(id, {
                        name,
                        email,
                        country,
                        image: avatar
                    }, { new: true }); // Return the updated document
    
                    if (updatedArtist) {
                        return res.status(200).json({ success: true, message: "Successfully Updated Artist", artist: updatedArtist });
                    }
                } catch (error) {
                    //console.error("During Updating artist:", error);
                    return res.status(500).json({ success: false, message: "Something went wrong during update." });
                }            
            } else {
                //console.log("No user found");
                return res.status(400).json({ success: false, message: "You are not registered in Aurora. Please register first." });
            } 
        }


    } catch (error) {
        //console.error(error);
        logger(error);
        res.status(500).json({ success: false, message: "Unknown error occurred during update." });    
    }
});





export const Artistlogin = Catchasyncerror(async (req, res, next) => {
    try {
        // Implement login logic here
    } catch (error) {
        //console.error(error);
        logger(error);
        res.status(500).json({ success: false, message: "Unknown error occurred during login." });
    }
}); 

export const Artistfetch = Catchasyncerror(async (req, res, next) => {
    const { id } = req.params;
    let artist;
    try {
        // Check if ID is empty or not
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide Artist id" });
        }

        if (id === "all") {
            artist = await Artist.find();
            if (!artist || artist.length === 0) {
                return res.status(404).json({ success: false, message: "We currently don't have any artists" });
            }
        } else {
            artist = await Artist.findById(id);
            if (!artist) {
                artist = await Usert.findById(id);
                //return res.status(404).json({ success: false, message: "Artist not found" });
            }
        }

        return res.status(200).json({ success: true, result: artist });
    } catch (error) {
        //console.error(error);
        logger(error);
        res.status(500).json({ success: false, message: "Unknown error occurred during fetching artist." });
    }
});

export const Userfetch = Catchasyncerror(async (req, res, next) => {
    const { id } = req.params;
    let artist;
    try {
        // Check if ID is empty or not
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide Artist id" });
        }

        if (id === "all") {
            artist = await Usert.find();
            if (!artist || artist.length === 0) {
                return res.status(404).json({ success: false, message: "We currently don't have any artists" });
            }
        } else {
            artist = await Usert.findById(id);
            if (!artist) {
                artist = await Usert.findById(id);
                //return res.status(404).json({ success: false, message: "Artist not found" });
            }
        }

        return res.status(200).json({ success: true, result: artist });
    } catch (error) {
        console.error(error);
        logger(error);
        res.status(500).json({ success: false, message: "Unknown error occurred during fetching artist." });
    }
});