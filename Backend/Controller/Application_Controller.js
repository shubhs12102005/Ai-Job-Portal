import { Application } from "../Model/Application_Model.js";
import { Job } from "../Model/Job_Model.js";

// Students can apply for a job
export const applyJob = async (req, res) => {
    try {
        // Get userId & JobId to apply for a job
        const userId = req.id;
        const jobId = req.params.id;        

        // Make sure anyone can not be empty
        if (!userId || !jobId) {
            return res.status(400).json({
                message: "User ID or Job ID is missing.",
                success: false
            });
        }

        // Check for applicant already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Find job by Id 
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        // Store new application in the Job model
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Student can check all the applied jobs
export const getAppliedJobs = async (req, res) => {
    try {
        // Get userId to fetch a application
        const userId = req.id;

        // Get all applications that user has applied
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!applications) {
            return res.status(400).json({
                message: "You have not applied for any Job.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Got all applied user jobs.",
            applications,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Recruiter will see how many students have applied 
export const getApplicants = async (req, res) => {
    try {
        // Get jobId to fetch all applications for that job
        const jobId = req.params.id;

        // Get all applicants who has applied 
        const jobs = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!jobs) {
            return res.status(400).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Got all applied jobs.",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Recruiter can Accept/Reject the application
export const updateStatus = async (req, res) => {
    try {
        // Get Status & applicationId
        const { status } = req.body;
        const ApplicationId = req.params.id;

        // Find that application
        const application = await Application.findOne({ _id: ApplicationId });
        if (!application) {
            return res.status(400).json({
                message: "Application not found.",
                success: false
            });
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}