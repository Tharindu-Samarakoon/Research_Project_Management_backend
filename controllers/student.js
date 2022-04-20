import StudentDetails from "../models/studentDetails.js";

export const getStudnet = async (req, res) => {
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

    const student = req.body;
    const newStudent = new StudentDetails(student);

    try {

        await newStudent.save();

        res.status(201).json(newStudent);

    } catch (error) {

        res.status(409).json({ message: error.message });

    }

}