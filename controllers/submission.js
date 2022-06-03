import Submission from "../models/submission.js"

export const addSubmission = async (req, res) => {
    try {
        
        const {submissionType, name, description, deadline, template, markingScheme } = req.body;
        const newSubmission = new Submission({submissionType, name, description, deadline, template, markingScheme });
        const submission = await newSubmission.save();
        res.status(201).json(submission);

    } catch (error) {
        res.status(409).json(error);
    }
}

export const getSubmission = async (req, res) => {

    try {
        const submissions = await Submission.find();
        res.status(201).json(submissions);
    } catch (error) {
        res.status(404).json(error);
    }
}