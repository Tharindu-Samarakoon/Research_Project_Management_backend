import express from "express";

import {
  getMarkingSchemes,
  getMarkingScheme,
  addMarkingScheme,
  updateMarkingScheme,
  deleteMarkingScheme,
} from "../controllers/markingSchemes.js";
// import { validate } from "../models/studentDetails.js";

const router = express.Router();

router.get("/markingschemes", getMarkingSchemes);
router.post("/markingscheme/:id", getMarkingScheme);
router.post("/add-markingscheme", addMarkingScheme);
router.post("/updatemarkingscheme/:id", updateMarkingScheme);
router.post("/deletemarkingscheme/:id", deleteMarkingScheme);

// router.post('/hello', (req, res)=>{
//     const anw = validate(req.body);
//     console.log(anw);
//     res.json(anw)
// })

export default router;
