import express from "express";
import marking from "../models/addMarkingScheme.js";
import mongoose from "mongoose";
// import res from "express/lib/response";

const router = express.Router();

//retrieve marking schemes
export const getMarkingSchemes = async (req, res) => {
  try {
    const markingSchemes = await marking.find();
    res.status(200).json(markingSchemes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//retrieve marking scheme
export const getMarkingScheme = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedScheme = await marking.findById(id);
    res.status(200).json(selectedScheme);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//add marking scheme
export const addMarkingScheme = async (req, res) => {
  const { assignmentName, fileName } = req.body;
  const newMarkingScheme = new marking({ assignmentName, fileName });
  try {
    await newMarkingScheme.save();
    res.status(201).json(newMarkingScheme);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//update marking scheme
export const updateMarkingScheme = async (req, res) => {
  const { id } = req.params;
  const { assignmentName, fileName } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No item with the given ID`);
  }
  const updateMarkingScheme = { assignmentName, fileName };
  await marking.findByIdAndUpdate(id, updateMarkingScheme, { new: true });
  res.json(updateMarkingScheme);
};

export const deleteMarkingScheme = async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No marking scheme with given ID`);
    }
    await marking.findByIdAndRemove(id);
    res.json({message:'Post delete successfully'});
}

export default router;