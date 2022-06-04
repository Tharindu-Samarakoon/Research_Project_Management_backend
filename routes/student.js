import express from "express";

import { getStudent, addStudent, studentAuthentication} from "../controllers/student.js";
import { validate } from "../models/studentDetails.js";

const router = express.Router();

router.get('/', getStudent);
router.post('/register', addStudent);
router.post('/auth', studentAuthentication);


// router.post('/hello', (req, res)=>{
//     const anw = validate(req.body);
//     console.log(anw);
//     res.json(anw)
// })

export default router;