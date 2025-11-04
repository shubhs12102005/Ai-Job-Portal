import { Company } from '../Model/Company_Model.js';
import { deleteMedia, uploadMedia } from '../utils/Cloudinary.js';
import getDataUri from "../utils/DataUri.js";

// First Recruiter will register a company
export const registerCompany = async (req, res) => {
    try {
        // Destructuring
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        // Finding by name
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };

        // Create a new Company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get all companies who created by recruiter
export const getCompanies = async (req, res) => {
    try {
        // Taking userId from req
        const userId = req.id;

        // Finding by userId
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company fetched successfully.",
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// get particular company
export const getCompanyById = async (req, res) => {
    try {
        // Taking companyId from params
        const companyId = req.params.id;

        // Finding company by companyId
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company fetched successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// update company
export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, description, website, location } = req.body;
        const file = req.file;


        const oldCompany = await Company.findById(companyId);
        if (!oldCompany) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        // If logo already exists then delete it
        if (file && oldCompany.logo) {
            const publicId = oldCompany.logo.split("/").pop().split(".")[0];
            await deleteMedia(publicId);
        }

        // Upload new logo
        let logoUrl;
        if (file) {
            const cloudResponse = await uploadMedia(file.path);
            logoUrl = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location };
        if (logoUrl) updateData.logo = logoUrl;

        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// Delete company
export const deleteCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Delete the job by ID
        const deletedCompany = await Company.findByIdAndDelete(companyId);

        if (!deletedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
