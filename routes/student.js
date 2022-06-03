import express from "express";

import { getStudnet, addStudent, studentAuthentication, updateStudentDetails } from "../controllers/student.js";
import { validate } from "../models/studentDetails.js";

const router = express.Router();

router.get('/', getStudnet);
router.post('/register', addStudent);
router.post('/auth', studentAuthentication);
router.patch('/update/:id', updateStudentDetails);

// router.post('/hello', (req, res)=>{
//     const anw = validate(req.body);
//     console.log(anw);
//     res.json(anw)
// })

export default router;