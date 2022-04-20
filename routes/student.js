import express from "express";

import { getStudnet, addStudent } from "../controllers/student.js";

const router = express.Router();

router.get('/', getStudnet);
router.post('/', addStudent);

export default router;