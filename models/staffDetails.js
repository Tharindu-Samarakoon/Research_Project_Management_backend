import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import Joi from "joi";

const staffSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    Department: String,
    research_interest: String
});

staffSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
};

const StaffDetails = mongoose.model('StuffDetails', staffSchema);

export const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().pattern(/it\d\d\d\d\d\d\d\@my.sliit.lk/).required()
    });

    return schema.validate(data);
}

export default StaffDetails;