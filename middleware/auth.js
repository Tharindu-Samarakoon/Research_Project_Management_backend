import StudentDetails from "../models/studentDetails";
import jwt from 'jsonwebtoken';


export const getStudentToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verfied = jwt.verify(token, process.env.JWT_SECRET);
        req.student = verfied;

        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}