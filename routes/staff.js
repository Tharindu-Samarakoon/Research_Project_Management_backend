import express from "express";

import { getStaffs, getStaff, addStaff, staffAuthentication,updateStaff } from "../controllers/staff.js";
import { validate } from "../models/staffDetails.js";

const router = express.Router();

router.get('/', getStaffs);
router.get('/:id', getStaff);
router.post('/register', addStaff);
router.post('/auth', staffAuthentication);
router.patch('/:id',updateStaff);

// router.post('/hello', (req, res)=>{
//     const anw = validate(req.body);
//     console.log(anw);
//     res.json(anw)
// })

export default router;