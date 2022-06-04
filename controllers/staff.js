import StaffDetails from "../models/staffDetails.js";
import bcrypt from "bcrypt";

export const getStaff = async (req, res) => {
  try {
    const staffDetails = await StaffDetails.find();

    console.log(staffDetails);

    res.status(200).json(staffDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const addStaff = async (req, res) => {
  try {
    const user = await StaffDetails.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .json({ message: "A user with the email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const {
      firstName,
      lastName,
      profilePicture,
      position,
      email,
      password,
      department,
      research_interest,
      userType,
    } = { ...req.body, password: hashPassword };
    const newStaff = new StaffDetails({
      firstName,
      lastName,
      profilePicture,
      position,
      email,
      password,
      department,
      research_interest,
      userType,
    });

    await newStaff.save();

    res.status(201).json(newStaff);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const staffAuthentication = async (req, res) => {
  try {
    const user = await StaffDetails.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    console.log(user);
    const token = user.generateAuthToken();
    res
      .status(200)
      .json({
        data: { token: token, userType: user.userType },
        messaged: "Logged In Successfully",
      });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getStaffToken = () => {};
