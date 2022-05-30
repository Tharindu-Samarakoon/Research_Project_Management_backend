import mongoose from "mongoose";
import group from "../models/group.js";
import group from "../models/group.js";

export const addGroup = async (req, res) => {
    const {leader, topic, supervisor, coSupervisor} = req.body;
    const topicStatus = 'none';

    try {
        const newGroup = new group({leader, topic, supervisor, coSupervisor, topicStatus});
        await newGroup.save();
        res.status(201).json({data:newGroup._id});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const submitTopic = async (req, res) => {
    const groupID = req.params;
    const {supervisor, topic} = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(groupID)) {
            return res.status(404).send('No group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(groupID, {topic: topic, supervisor: supervisor, topicStatus: 'submitted'}, {new: true});
    
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const acceptTopic = async (req, res) => {
    const groupID = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(groupID)) {
            return res.status(404).send('No Group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(groupID, {topicStatus: 'accepted'});
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const addCoSupervisor = async (req, res) => {
    const groupID = req.params;
    const {coSupervisor} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(groupID)) {
            return res.status(404).send('No Group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(groupID, {coSupervisor: coSupervisor, topicStatus: 'coSupervisor'});
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const acceptTopicCoSupervisor = async (req, res) => {
    const groupID = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(groupID)) {
            return res.status(404).send('No Group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(groupID, {topicStatus: 'finished'});
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


//=================================================================================
// Topic status :
//     'none' - when group is created
//     'submited' - when topic is submitted to supervisor
//     'accepted' - when topic is accepted by supervisor
//     'denied' - when topic is denied by supervisor
//     'coSupervisor' - when request is sent to coSupervisor
//     'coDenied' - when coSupervisor denied request
//     'finished' - when both supervisors are added and topic is registered.
//=================================================================================
