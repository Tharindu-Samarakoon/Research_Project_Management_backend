import StudentDetails from "../models/studentDetails.js";
import bcrypt from 'bcrypt';

export const getStudent = async (req, res) => {
        try{
            const studentDetails = await StudentDetails.find();

            console.log(studentDetails);

            res.status(200).json(studentDetails);

        }catch (error) {
            res.status(404).json({ message: error.message});
            console.log(error);
        }
}

export const addStudent = async (req, res) => {

    try {
        const user = await StudentDetails.findOne({email: req.body.email});

        if(user) {
            return res.status(409).json({message: 'A user with the email already exists'});
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash( req.body.password, salt);
        const {firstName, lastName, dateOfBirth, email, password, profilePicture} = {...req.body, password: hashPassword};
        const newStudent = new StudentDetails({firstName, lastName, dateOfBirth, email, password, profilePicture});
        
        await newStudent.save();

        res.status(201).json(newStudent);

    } catch (error) {

        res.status(409).json({ message: error.message });

    }

}

export const studentAuthentication = async (req, res) => {
    try {
        const user = await StudentDetails.findOne({email: req.body.email});

        if(!user){
            return res.status(401).json({message:'Invalid Email or Password'});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!validPassword){
            return res.status(401).json({message:'Invalid Email or Password'});
        }
        console.log(user);
        const token = user.generateAuthToken();
        res.status(200).json({data:token, messaged:'Logged In Successfully'});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

export const getStudentToken = () => {

}

