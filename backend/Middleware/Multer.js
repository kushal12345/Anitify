import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { exit } from 'process';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define storage with a dynamic destination based on req.body.name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Access the name from req.body
    const name = req.params.name; // Fallback to 'default' if name is not provided
    const albumTitle = req.params.albumTitle;
    const profile = req.params.profile;
    let uploadPath;
    if(albumTitle && name ) {
      uploadPath = path.join(__dirname, '..', 'uploads', name, albumTitle); // Create path based on name
    }else if(name && profile) {
      uploadPath = path.join(__dirname, '..', 'uploads', name, profile); // Create path based on name      
    } else {
      uploadPath = path.join(__dirname, '..', 'uploads', 'default'); // Default upload path
    }

    // Ensure the directory exists (you may need to create it if it doesn't)
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use the original name or generate a unique name
    cb(null, file.originalname);
  }
});



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 18000000 // 1MB
  },
  fileFilter(req, file, cb) {
  
    if (!file.originalname.match(/\.(mp3|jpg|jpeg|JPG|jpeg)$/)) {
      return cb(new Error('Only mp3, jpg, and jpeg files are allowed'));
    }
    cb(null, true);
  }
});

export default upload