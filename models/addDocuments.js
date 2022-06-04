import mongoose from "mongoose";

const templatesAndDocuments = mongoose.Schema({
    id:String,
    docType:String,
    name:String,
});

const group = mongoose.model("templates", templatesAndDocuments);

export default group;