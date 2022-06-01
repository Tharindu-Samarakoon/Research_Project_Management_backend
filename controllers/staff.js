import exporess from 'express';
import mongoose from 'mongoose';
import StaffDetails from '../models/staffDetails.js';
import bcrypt from 'bcrypt';



export const getStaffs = async (req, res) => {
        try{
            const staffDetails = await StaffDetails.find();

            console.log(staffDetails);

            res.status(200).json(staffDetails);

        }catch (error) {
            res.status(404).json({ message: error.message});
            console.log(error);
        }
}

export const getStaff = async (req, res) => {
    const {id} = req.params;
    try {
        const selectedStaff = await StaffDetails.findById(id);
        res.status(200).json(selectedStaff);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateStaff = async (req,res) =>{
    const {id} = req.params;
    const {firstName, lastName, profilePicture, email, password, department,role, research_interest,userType} = req.body;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No Staff member with the given ID`);
    }

const updatedStaff = {firstName, lastName, profilePicture, email, password, department,role, research_interest,userType, _id: id};
await StaffDetails.findByIdAndUpdate(id, updatedStaff, {new: true});
res.json(updatedStaff);

}


export const addStaff = async (req, res) => {

    try {
        const user = await StaffDetails.findOne({email: req.body.email});

        

        if(user) {
            return res.status(409).json({message: 'A user with the email already exists'});
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash( req.body.password, salt);
        const {firstName, lastName, profilePicture, role, email, password, department, research_interest,userType} = {...req.body, password: hashPassword};
        const newStaff = new StaffDetails({firstName, lastName, profilePicture, role, email, password, department, research_interest,userType});
        
        await newStaff.save();

        res.status(201).json(newStaff);

    } catch (error) {

        res.status(409).json({ message: error.message });

    }

}

export const staffAuthentication = async (req, res) => {
    try {
        const user = await StaffDetails.findOne({email: req.body.email});

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
        res.status(200).json({data:{token: token, userType: user.userType }, messaged:'Logged In Successfully'});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

export const getStaffToken = () => {

}


// Person. find({
//     'name.last': 'Ghost',
//     userType: { $in: ['Stuff', 'student'] }
//   })


// export const updateStaff = async (req,res) =>{

//   try{
//     const id = await id.find();
  



//   }catch(error) {
//       res.status(404).json({message: error.message});
//       console.log(error);
//   }

// }