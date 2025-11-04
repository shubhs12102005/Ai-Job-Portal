import express from 'express';
import getReview from '../Controller/Ai_Controller.js'
const router = express.Router();

router.post('/get-review', getReview);

export default router;  