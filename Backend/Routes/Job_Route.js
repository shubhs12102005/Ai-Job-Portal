import express from 'express';
import { isAuthenticated } from '../Middlewares/isAuthenticated.js';
import { createJob, deleteJobById, getAllJobs, getJobById, getRecruiterJobs, getRelatedJobs, getUserSavedJob, saveForLaterJob, unSaveJob } from '../Controller/Job_Controller.js';
const router = express.Router();

router.post('/create', isAuthenticated, createJob);
router.get('/get', isAuthenticated, getAllJobs);
router.get('/get/:id', isAuthenticated, getJobById);
router.get('/recruiter/get', isAuthenticated, getRecruiterJobs);
router.get('/delete/:id', isAuthenticated, deleteJobById);
router.get('/get/relatedjob/:id', isAuthenticated, getRelatedJobs);
router.post('/saveForLater', isAuthenticated, saveForLaterJob);
router.post('/unSaveJob', isAuthenticated, unSaveJob);
router.get('/get-allSavedJobs', isAuthenticated, getUserSavedJob);

export default router;