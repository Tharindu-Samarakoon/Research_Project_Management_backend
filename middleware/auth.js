import StudentDetails from "../models/studentDetails.js";
import jwt from 'jsonwebtoken';


export const getStudentToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        console.log('Rejected');
        return res.status(401).send('Access Denied');
    }

    try {
        const verfied = jwt.verify(token, process.env.JWT_SECRET);
        req.student = verfied;
        next();
    } catch (error) {
        console.log('Rejected');
        res.status(400).send('Invalid Token');
    }
}