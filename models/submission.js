import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
    submissionType: String,
    name: String,
    description: String,
    deadline: Date,
    template: String,
    markingScheme: String
});

const Submission = mongoose.model('submissions', submissionSchema);

export default Submission;