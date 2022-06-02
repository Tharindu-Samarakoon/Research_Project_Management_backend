import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    leader: String,
    topic: String,
    supervisor: String,
    coSupervisor: String,
    topicStatus: String
});

const group = mongoose.model('group', groupSchema);

export default group;