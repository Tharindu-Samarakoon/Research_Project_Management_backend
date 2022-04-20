import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    registrationNumber: String,
    email: String,
    profilePicture: String,
});

const StudentDetails = mongoose.model('StudentDetails', studentSchema);

export default StudentDetails;