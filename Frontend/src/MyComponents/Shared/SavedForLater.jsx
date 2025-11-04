import React, { useEffect, useState } from "react";
import axios from "axios";
import Job from "./Job";
import Navbar from "../Main/Navbar";

const SavedForLater = () => {
    // State to save all jobs from backend
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        // Function to fetch saved jobs of user
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/job/get-allSavedJobs", {
                    withCredentials: true,
                });
                if (res?.data?.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSavedJobs();
    }, []);

    // Handler to remove job from savedJobs after unsave
    const handleUnsave = (jobId) => {
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-10">
                <h1 className="text-3xl font-bold text-center text-white mb-10">Saved for Later</h1>

                {savedJobs && savedJobs.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center place-items-center ">
                        {savedJobs.map((job) => (
                            <Job key={job._id} job={job} unSave={true} onUnsave={handleUnsave} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-20">
                        <p className="text-lg">You haven’t saved any jobs yet.</p>
                        <p className="text-sm mt-2">
                            Browse and bookmark jobs to revisit them later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedForLater;
