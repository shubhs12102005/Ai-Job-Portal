import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./Model/Job_Model.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URL;

const jobs = [
  {
    title: "Data Analyst",
    description:
      "Google seeks a Data Analyst to collect, interpret, and transform data into actionable insights that influence key business strategies across multiple departments.",
    requirements: [
      "Bachelor’s degree in Statistics, Computer Science, or related field.",
      "2+ years of professional experience in data analytics or business intelligence.",
      "Strong proficiency with SQL for data extraction and manipulation.",
      "Experience with visualization tools such as Tableau, Power BI, or Looker.",
      "Hands-on experience in data cleaning, normalization, and transformation.",
      "Understanding of data warehousing concepts and ETL pipelines.",
      "Proficiency in Python or R for statistical analysis and automation.",
      "Strong problem-solving skills and data-driven decision-making mindset.",
      "Knowledge of Google Cloud BigQuery or similar platforms.",
      "Excellent communication skills to present findings to stakeholders."
    ],
    responsibilities: [
      "Analyze complex datasets to identify trends and patterns that impact business performance.",
      "Develop and maintain dashboards and reports for cross-functional teams.",
      "Collaborate with data engineers and product managers to define data needs.",
      "Perform root cause analysis and provide recommendations for process improvement.",
      "Automate recurring data workflows and streamline analytics operations.",
      "Ensure data accuracy, completeness, and consistency across systems.",
      "Participate in the design of data models and KPIs for reporting.",
      "Support predictive modeling efforts by providing clean, well-structured datasets.",
      "Communicate insights clearly to both technical and non-technical audiences.",
      "Stay updated on emerging tools and techniques in data analytics."
    ],
    skills: [
      "SQL", "Python", "Tableau", "Excel", "Power BI",
      "BigQuery", "R", "Data Cleaning", "Visualization", "Statistical Analysis"
    ],
    salary: "₹15–25 LPA",
    experienceLevel: "2–4 years",
    location: "Bengaluru, India",
    jobType: "Full-Time",
    position: 32,
    company: "68c6adcfc95b3c579645006c",
    created_by: "68a604f6723d416a092977f4",
    applications: []
  },
  {
    title: "Software Engineer",
    description:
      "Apple is seeking a passionate Software Engineer to design, build, and optimize next-generation products for millions of users worldwide.",
    requirements: [
      "Bachelor’s or Master’s in Computer Science or equivalent practical experience.",
      "Strong understanding of data structures and algorithms.",
      "Experience with Node.js, Express, and REST API development.",
      "Proficiency in JavaScript (ES6+), React, or Angular.",
      "Knowledge of version control systems like Git and GitHub.",
      "Experience with relational and NoSQL databases (MongoDB preferred).",
      "Familiarity with CI/CD pipelines and testing frameworks.",
      "Ability to write clean, maintainable, and efficient code.",
      "Strong debugging and optimization skills.",
      "Excellent teamwork and problem-solving capabilities."
    ],
    responsibilities: [
      "Design and implement scalable backend services and RESTful APIs.",
      "Develop rich, responsive frontend interfaces using React.",
      "Work closely with designers, PMs, and QA to deliver robust features.",
      "Write automated tests to ensure high-quality code.",
      "Participate in code reviews and provide constructive feedback.",
      "Continuously improve performance, scalability, and reliability.",
      "Monitor and resolve production issues with minimal downtime.",
      "Document technical specifications and architecture decisions.",
      "Collaborate on integrating APIs with third-party services.",
      "Stay up to date with emerging technologies and best practices."
    ],
    skills: [
      "JavaScript", "React", "Node.js", "Express", "MongoDB",
      "Git", "CI/CD", "REST APIs", "Agile Development"
    ],
    salary: "₹20–30 LPA",
    experienceLevel: "3–5 years",
    location: "Mumbai, India",
    jobType: "Full-time, Hybrid",
    position: 24,
    company: "68c2f0bac0445500f775d861",
    created_by: "68a604f6723d416a092977f4",
    applications: []
  },
  {
    title: "Frontend Developer",
    description:
      "X Corp. is hiring a Frontend Developer to create intuitive, high-performance web interfaces that deliver exceptional user experiences.",
    requirements: [
      "Bachelor’s in Computer Science or equivalent experience.",
      "Proficiency in HTML5, CSS3, and JavaScript (ES6+).",
      "Hands-on experience with React.js or Next.js frameworks.",
      "Strong understanding of responsive design and cross-browser compatibility.",
      "Experience working with REST APIs and state management libraries.",
      "Knowledge of UI optimization and performance best practices.",
      "Experience with Git and agile software development.",
      "Understanding of accessibility and web standards.",
      "Basic knowledge of backend technologies like Node.js.",
      "Ability to translate design mockups into functional UI."
    ],
    responsibilities: [
      "Develop and maintain responsive user interfaces using React and Tailwind CSS.",
      "Collaborate with designers to implement pixel-perfect components.",
      "Integrate frontend with backend APIs securely and efficiently.",
      "Optimize application performance for speed and scalability.",
      "Implement reusable components and maintain UI consistency.",
      "Debug and fix UI-related issues and user-reported bugs.",
      "Ensure best practices in accessibility, SEO, and code quality.",
      "Participate in sprint planning and code reviews.",
      "Work closely with QA teams for testing and deployment.",
      "Keep up with evolving frontend trends and technologies."
    ],
    skills: [
      "React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3",
      "Redux", "JavaScript", "Git", "REST APIs"
    ],
    salary: "₹12–20 LPA",
    experienceLevel: "1–3 years",
    location: "Bangalore, India (Remote/Hybrid)",
    jobType: "Full-time, Hybrid",
    position: 12,
    company: "68d0243531b28eaab831706d",
    created_by: "68c6af320c7a700357b93f05",
    applications: []
  },
  {
    title: "Full Stack Developer",
    description: "Infosys is seeking talented Full Stack Developers to develop dynamic and high-performing enterprise-grade web applications.",
    requirements: [
      "Degree in Computer Science, Engineering, or equivalent practical experience.",
      "Proficiency in MERN stack (MongoDB, Express.js, React, Node.js).",
      "Hands-on experience with REST APIs and GraphQL.",
      "Strong understanding of MVC architecture and microservices.",
      "Experience with containerization using Docker.",
      "Knowledge of AWS, Azure, or Google Cloud services.",
      "Familiarity with Git workflows, CI/CD, and automated testing.",
      "Experience working with Agile methodologies.",
      "Strong debugging and problem-solving skills.",
      "Excellent communication and teamwork skills."
    ],
    responsibilities: [
      "Develop both client and server-side components using MERN stack.",
      "Design scalable database structures and optimize performance.",
      "Collaborate with UI/UX designers to implement modern interfaces.",
      "Integrate APIs, third-party services, and microservices.",
      "Implement authentication, authorization, and data security measures.",
      "Write unit and integration tests to ensure code quality.",
      "Participate in sprint planning and review sessions.",
      "Ensure seamless deployment and post-release monitoring."
    ],
    skills: ["MongoDB", "Express", "React", "Node.js", "Docker", "AWS", "CI/CD", "GitHub", "GraphQL", "Jest"],
    salary: "₹18–30 LPA",
    experienceLevel: "2–5 years",
    location: "Bangalore, India",
    jobType: "Full-Time",
    position: 12,
    company: "69063dd3bbac08ef6ddbcdf1", // Infosys
    created_by: "68a604f6723d416a092977f4"
  },
  {
    title: "Machine Learning Engineer",
    description: "Google is hiring Machine Learning Engineers to build cutting-edge models that power intelligence across its ecosystem of products.",
    requirements: [
      "Bachelor’s or Master’s in Computer Science, AI, or related field.",
      "Strong proficiency in Python and ML libraries (TensorFlow, PyTorch).",
      "Experience with data preprocessing and feature engineering.",
      "Understanding of deep learning, NLP, and computer vision.",
      "Knowledge of data pipelines and MLOps tools.",
      "Experience deploying models on AWS, GCP, or Azure.",
      "Proficiency in version control (Git) and model tracking tools.",
      "Strong math and statistics foundation.",
      "Ability to work on large-scale datasets efficiently."
    ],
    responsibilities: [
      "Design, train, and deploy scalable ML and deep learning models.",
      "Collaborate with data scientists and engineers for model optimization.",
      "Monitor model performance and perform regular retraining.",
      "Implement A/B testing and evaluate model accuracy.",
      "Document and present results to cross-functional stakeholders.",
      "Integrate models into production-ready environments.",
      "Participate in peer reviews and contribute to research initiatives."
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "AWS", "GCP", "Docker", "MLflow", "Data Science"],
    salary: "₹25–45 LPA",
    experienceLevel: "3–6 years",
    location: "Delhi, India",
    jobType: "Full-Time",
    position: 7,
    company: "68c6adcfc95b3c579645006c", // Google
    created_by: "68a604f6723d416a092977f4"
  },
  {
    title: "UI/UX Designer",
    description: "Tata Consultancy Services is seeking a creative UI/UX Designer to craft visually stunning and user-centered digital experiences.",
    requirements: [
      "Degree in Design, HCI, or equivalent practical experience.",
      "Proficiency with Figma, Adobe XD, or Sketch.",
      "Strong understanding of design principles, color theory, and typography.",
      "Experience creating design systems and responsive layouts.",
      "Ability to conduct usability testing and user research.",
      "Familiarity with front-end development for design feasibility.",
      "Excellent communication and presentation skills."
    ],
    responsibilities: [
      "Design intuitive and visually appealing user interfaces.",
      "Collaborate with developers to ensure design consistency.",
      "Create wireframes, mockups, and interactive prototypes.",
      "Conduct user interviews and collect usability feedback.",
      "Contribute to design system maintenance and evolution."
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research", "Accessibility", "UI Design"],
    salary: "₹10–20 LPA",
    experienceLevel: "1–4 years",
    location: "Mumbai, India",
    jobType: "Full-Time",
    position: 9,
    company: "6906400fa5e9d405f6f3f2d5", // TCS
    created_by: "6904f50ca5412a56fd8f5856"
  },
];

async function seedJobs() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Job.insertMany(jobs);
    console.log(`🚀 Inserted ${jobs.length} jobs successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting jobs:", error);
    mongoose.connection.close();
  }
}

seedJobs();
