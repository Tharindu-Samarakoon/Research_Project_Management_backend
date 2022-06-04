import mongoose from "mongoose";
import group from "../models/group.js";
import StudentDetails from "../models/studentDetails.js";
import { setGroup } from "./student.js";


export const addGroup = async (req, res) => {
    const {leader, topic, supervisor, coSupervisor} = req.body.group;
    const members = req.body.members; 
    // const {leader, topic, supervisor, coSupervisor, topicStatus} = req.body;
    const topicStatus = 'none';
    console.log(members);
    members.push(leader);
    try {
        const newGroup = new group({leader, topic, supervisor, coSupervisor, topicStatus});
        const ans = await newGroup.save();

        console.log(newGroup);
        
        await members.forEach(async (student) => {
            console.log(student);
            const studentNew = await StudentDetails.findOneAndUpdate({email: student}, {group: newGroup._id}, {new: true});
        })

        res.status(201).json(newGroup)
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

export const getGroupDetails = async (req, res) => {

    try {
        const {id} = req.params;
        const groupDetails = await group.findById(id);
        res.status(200).json(groupDetails);
    } catch (error) {
        res.status(409).json(error);
    }
}


export const getAllStudentsOfGroup = async (req, res) => {

    try {
        const groupID = req.params;
        console.log(groupID);
        const students = await StudentDetails.find({ group: groupID.id });
        // const groupDetails = await group.findOne(groupID);
        res.status(200).json({students});
    } catch (error) {
        res.status(409).json(error);
    }
}

export const submitTopic = async (req, res) => {
    const {id} = req.params;
    const {topic} = req.body;
    console.log(id);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(id, {topic: topic, topicStatus: 'topicSubmitted'}, {new: true});
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const requestSupervisor = async (req, res) => {
    const {id} = req.params;
    const {supervisor} = req.body;
    console.log(id + supervisor);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(id, {topicStatus: 'submitted', supervisor: supervisor}, {new: true});
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
    const {id} = req.params;
    const {coSupervisor} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No Group with the given ID');
        }
        const updatedGroup = await group.findByIdAndUpdate(id, {coSupervisor: coSupervisor, topicStatus: 'coSupervisor'});
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

export const verifyGroupList = async (req, res) => {
    const groupMembers = req.body;

    try {
        const member = [];
        const memberDetails = [];
        var st;
        var group;
    
        member.push(groupMembers.member1);
        member.push(groupMembers.member2);
        member.push(groupMembers.member3);
    
        await Promise.all(
            member.map(
                async (id) => {
                    console.log(id);
                    st = await StudentDetails.findOne({email: id});
                    if(st.group) {
                        group = 'yes';
                    }
                    memberDetails.push(st);
                }
            )
        )
        res.status(200).json(memberDetails);

    } catch (error) {
        res.status(409).json(error);
    }

}

export const testSample = (num1, num2) => {

    if(num1 < 0 || num2 < 0){
        return 'negative Numbers'
    }

    let ans = num1 + num2;

    return ans;
}


//=================================================================================
// Topic status :
//     'none' - when group is created
//     'submitted' - when topic is submitted to supervisor
//     'accepted' - when topic is accepted by supervisor
//     'denied' - when topic is denied by supervisor
//     'coSupervisor' - when request is sent to coSupervisor
//     'coDenied' - when coSupervisor denied request
//     'finished' - when both supervisors are added and topic is registered.
//=================================================================================
