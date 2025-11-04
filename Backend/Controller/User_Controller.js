import { User } from "../Model/User_Model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/DataUri.js";
import { deleteMedia, uploadMedia } from "../utils/Cloudinary.js";

// Signup
export const Signup = async (req, res) => {
    try {
        // Destructuring
        const { fullName, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        // If any value empty return false message
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(500).json({
                message: "All fields are required",
                success: false,
            })
        }

        // Uploading profile photo to cloudinary
        let profilePhotoUrl;
        if (file) {
            const cloudResponse = await uploadMedia(file.path);

            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(400).json({
                    message: "Failed to upload file",
                    success: false
                });
            }

            // Saving secure_url
            profilePhotoUrl = cloudResponse.secure_url;
        }

        // Finding user 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            })
        }

        // Hashing pasword to store
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl,
            }
        })

        return res.status(200).json({
            message: "Account Successfully Created",
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

// Login
export const Login = async (req, res) => {
    try {
        // Destructuring
        const { email, password } = req.body;

        // If any value empty return false message
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are reuired",
                success: false,
            })
        }
        // Finding user 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not exists",
                success: false,
            })
        }

        // Password comparing
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        // Object needed to give in jwt
        const tokenData = {
            userId: user._id
        }
        // Generating token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        // Creating new Object to give frontend 
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // Giving response and storing token in cookie
        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 }
        ).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

// Logout
export const Logout = async (req, res) => {
    try {
        // Just removing strored token
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User Successfully Logout",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // If already resume exists then delete it
        if (file && user?.profile?.resume) {
            const publicId = user.profile.resume.split("/").pop().split(".")[0];
            await deleteMedia(publicId);
        }

        // Upload new resume
        if (file) {
            const cloudResponse = await uploadMedia(file.path);

            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(400).json({
                    message: "Failed to upload file",
                    success: false
                });
            }

            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeName = file.originalname;
        }

        // Update other details & save it
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        await user.save();

        // Creating new Object to give frontend to store in redux
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: `Profile Updated Successfully`,
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// Add/Update Resume
export const AddUpdateResume = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // If already resume exists then delete it
        if (file && user?.profile?.resume) {
            const publicId = user.profile.resume.split("/").pop().split(".")[0];
            await deleteMedia(publicId);
        }

        // Upload new resume
        if (file) {
            const cloudResponse = await uploadMedia(file.path);

            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(400).json({
                    message: "Failed to upload file",
                    success: false
                });
            }

            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeName = file.originalname;
        }

        await user.save();

        // Creating new Object to give frontend to store in redux
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: `Profile Updated Successfully`,
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
