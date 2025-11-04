import express from 'express';
import { AddUpdateResume, Login, Logout, Signup, updateProfile } from '../Controller/User_Controller.js';
import { isAuthenticated } from '../Middlewares/isAuthenticated.js';
import { singleUpload } from '../Middlewares/Multer.js';
const router = express.Router();

router.post('/signup', singleUpload, Signup);
router.post('/login', Login);
router.get('/logout', Logout);
router.post('/profile/update', isAuthenticated, singleUpload, updateProfile);
router.post('/profile/AddResume', isAuthenticated, singleUpload, AddUpdateResume);

export default router;