import express from 'express'
import { Register,Login,ProtectRoute } from '../../Controllers/Users/Usercontroller.js';
import { VerifyToken } from '../../Middleware/VerifyToken.js';
import { ArtistRegister } from '../../Controllers/Artist/ArtistContoller.js';
import { Artistlogin } from '../../Controllers/Artist/ArtistContoller.js';
import { AlbumCreate } from '../../Controllers/Products/Album/AlbumController.js';
import upload from '../../Middleware/Multer.js';
import { albumfetch } from '../../Controllers/Products/Album/AlbumController.js';
import { trackfetch } from '../../Controllers/Products/Album/AlbumController.js';
import { Artistfetch } from '../../Controllers/Artist/ArtistContoller.js';
import { ArtistUpdate } from '../../Controllers/Artist/ArtistContoller.js';
const router = express.Router();

router.route("/register").post(Register).get((req,res)=>{
    res.send("Hello")
});

router.route(`/artistregister/:id`).post(ArtistRegister).get((req,res)=>{
    res.send("Hello Artist")
});

router.route("/login").post(Login).get((req,res)=>{
    res.send("Hello Login")
});


router.route("/Artistlogin").post(Artistlogin).get((req,res)=>{
    res.send("Hello Login")
});

router.route("/protected").post(VerifyToken,ProtectRoute).get((req,res)=>{
    res.send("protected route working")
});

router.route('/addtrack/:name/:albumTitle').post( upload.fields([{ name: 'music' }, { name: 'albumCover' }]), AlbumCreate );
router.route('/artist/:name/:profile/:id').post(upload.fields([{name:'image'}]), ArtistUpdate )
router.route('/albums/:id').get(albumfetch);
router.route('/artist/:id').get(Artistfetch);
router.route('/tracks/:id/:title').get(trackfetch);

   
//router.route("/login").post(Login);
export default router;