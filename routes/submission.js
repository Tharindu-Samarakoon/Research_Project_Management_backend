import express from "express";
import { addSubmission, getSubmission } from "../controllers/submission.js";


const router = express.Router();

router.post('/add', addSubmission);
router.get('/get', getSubmission);

export default router;