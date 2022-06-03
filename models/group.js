import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    leader: String,
    topic: String,
    supervisor: String,
    coSupervisor: String,
    topicStatus: String,
    submissions: [
        {
            for: String, //Submission ID
            uploaded: String, //File
            uploadDate: Date //Uploaded Date
        }
    ]
});

const group = mongoose.model('group', groupSchema);

export default group;