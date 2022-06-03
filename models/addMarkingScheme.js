import mongoose from "mongoose";

const markingSchemeSchema = mongoose.Schema({
    id:String,
    assignmentName:String,
    fileName:String,

});

const group = mongoose.model("markingSchemes", markingSchemeSchema);

export default group;
