import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import Joi from "joi";

const studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    email: String,
    password: String,
    profilePicture: String,
    group: String,
    contactNumber: String
});

studentSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
};

const StudentDetails = mongoose.model('StudentDetails', studentSchema);

export const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().pattern(/it\d\d\d\d\d\d\d\@my.sliit.lk/).required()
    });

    return schema.validate(data);
}

export default StudentDetails;