import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import Joi from "joi";

const staffSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    profilePicture: String,
    email: String,
    password: String,
    department: String,
    position: String,
    research_interest: String,
    userType: String
});

staffSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
};

const StaffDetails = mongoose.model('StaffDetails', staffSchema);

export const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().pattern(/it\d\d\d\d\d\d\d\@my.sliit.lk/).required()
    });

    return schema.validate(data);
}

export default StaffDetails;

//firstName, lastName, profilePicture, email, password, Department, research_interest

// {
//     "firstName": "Ashan", 
//     "lastName":"Ekanayaka",
//      "profilePicture":"Mahinda",
//       "email":"it20265895@my.sliit.lk",
//        "password":"4bbnruf",
//         "department":"computer",
//          "research_interest":"PHP"
// }