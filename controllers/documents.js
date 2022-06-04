import express from "express";
import document from "../models/addDocuments.js";
import mongoose from "mongoose";

const router=express.Router();

//retrieve documents
export const getDocuments=async (req,res)=>{
    try {
        const documents =await document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

//retrieve single document
export const getDocument=async(req,res)=>{
    const {id} = req.params;
    try {
        const selectedDocument=await document.findById(id);
        res.status(200).json(selectedDocument);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

//add document
export const addDocument=async(req,res)=>{
    const {docType,name}=req.body;
    const newDocument=new document({docType,name});
    try {
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};

//update document
export const updateDocument=async(req,res)=>{
    const{id}=req.params;
    const{docType,name}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No item with given ID`);
    }
    const updateDocument={docType,name};
    await document.findByIdAndUpdate(id,updateDocument,{new:true});
    res.json(updateDocument);
};

//delete document
export const deleteDocument=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).sendO(`No document with given ID`)
    }
    await document.findByIdAndDelete(id);
    res.json({message:'post delete successfully'});
}

export default router;