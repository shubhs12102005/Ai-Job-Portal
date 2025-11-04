import { Job } from '../Model/Job_Model.js';
import { User } from '../Model/User_Model.js';

// Only Recruiter will create a job
export const createJob = async (req, res) => {
    try {
        // Destructure
        const { title, description, requirements, responsibilities, skills, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check all fields are filled or not
        if (!title || !description || !requirements || !responsibilities || !skills || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };

        // Create a job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            responsibilities: responsibilities.split(","),
            skills: skills.split(","),
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(200).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

// Student can see all the posted jbs
export const getAllJobs = async (req, res) => {
    try {
        // Get keyword from query
        const keyword = req.query.keyword || "";

        // Creating query that finds job based on keyword
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        // Populate is used to get Relational table data in original form
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

// Get Particular job by Id
export const getJobById = async (req, res) => {
    try {
        // Get id from params
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant", // populate the applicant inside each application
                    select: "_id fullName email"
                }
            })
            .populate("company"); // populate company separately


        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

// Get all Recruiter jobs
export const getRecruiterJobs = async (req, res) => {
    try {
        // Get id from params
        const userId = req.id;
        const jobs = await Job.find({ created_by: userId }).populate({
            path: 'company',
            createdAt: -1
        });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

// Delete Job by Id
export const deleteJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Delete the job by ID
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Get Related Jobs
export const getRelatedJobs = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Get current job
        const currentJob = await Job.findById(jobId);
        if (!currentJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Find related jobs
        const relatedJobs = await Job.find({
            _id: { $ne: jobId },              // exclude current job
            $or: [
                { company: currentJob.company }, // same company
                { skills: { $in: currentJob.skills } }, // overlapping skills
                { title: { $regex: currentJob.title.split(" ")[0], $options: "i" } } // similar title keyword
            ]
        })
            .limit(5)                         // limit to 5 related jobs
            .populate("company");

        res.status(200).json({
            success: true,
            relatedJobs
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Save Job for later
export const saveForLaterJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Prevent duplicate saves
        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Job already saved"
            });
        }

        // Save job
        user.savedJobs.push(jobId);
        await user.save();

        return res.status(200).json({
            success: true,
            savedJobs: user.savedJobs,
            message: "Job saved successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Unsave Job
export const unSaveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId)
        await user.save();

        return res.status(200).json({
            success: true,
            savedJobs: user.savedJobs,
            message: "Job Unsaved successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Get User Saved Jobs
export const getUserSavedJob = async (req, res) => {
    try {
        const userId = req.id;

        // Find user and populate saved jobs + each job's company
        const user = await User.findById(userId)
            .populate({
                path: "savedJobs",
                populate: {
                    path: "company", // 👈 nested populate
                },
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Handle empty saved jobs
        if (!user.savedJobs || user.savedJobs.length === 0) {
            return res.status(200).json({
                success: true,
                savedJobs: [],
                message: "You have not saved any jobs",
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            savedJobs: user.savedJobs,
            message: "Saved jobs fetched successfully", // ✅ corrected message
        });

    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching saved jobs",
        });
    }
};

