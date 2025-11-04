import express from 'express';
import { isAuthenticated } from '../Middlewares/isAuthenticated.js';
import { deleteCompanyById, getCompanies, getCompanyById, registerCompany, updateCompany } from '../Controller/Company_Controller.js';
import { singleUpload } from '../Middlewares/Multer.js';
const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);
router.get('/get', isAuthenticated, getCompanies);
router.get('/get/:id', isAuthenticated, getCompanyById);
router.put('/update/:id', isAuthenticated, singleUpload, updateCompany);
router.get('/delete/:id', isAuthenticated, deleteCompanyById);

export default router;