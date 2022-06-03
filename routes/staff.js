import express from "express";

import { getStaff, addStaff, staffAuthentication, getSupervisors } from "../controllers/staff.js";
import { validate } from "../models/staffDetails.js";

const router = express.Router();

router.get('/', getStaff);
router.post('/register', addStaff);
router.post('/auth', staffAuthentication);
router.get('/getSupervisors', getSupervisors);

// router.post('/hello', (req, res)=>{
//     const anw = validate(req.body);
//     console.log(anw);
//     res.json(anw)
// })

export default router;