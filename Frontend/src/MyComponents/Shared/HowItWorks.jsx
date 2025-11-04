import React from "react";
import { Search, Briefcase, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-[#10b981]" />,
      title: "Search a job",
      desc:
        "Browse through thousands of job opportunities that match your skills and preferences.",
    },
    {
      id: 2,
      icon: <Briefcase className="w-8 h-8 text-[#10b981]" />,
      title: "Apply for job",
      desc:
        "Easily apply to jobs with your profile and get noticed by top employers quickly.",
    },
    {
      id: 3,
      icon: <CheckCircle className="w-8 h-8 text-[#10b981]" />,
      title: "Get your job",
      desc:
        "Receive interview calls, get selected, and start your dream career hassle-free.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-[#0f172a] to-[#021f1f] text-[#d1fae5]">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* Subtitle */}
        <p className="text-sm uppercase tracking-widest text-[#6ee7b7] font-semibold mb-4">
          Apply Process
        </p>

        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6">{`How it works`}</h2>

        {/* Description */}
        <p className="max-w-3xl mx-auto mb-16 text-base md:text-lg text-[#a7f3d0]">
          Finding your dream job has never been this easy. Just follow these three simple steps and land the perfect opportunity that matches your skills and passion.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-[rgba(16,185,129,0.1)] rounded-xl p-10 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer hover:bg-[rgba(16,185,129,0.3)] shadow-lg"
              aria-label={`Step ${step.id}: ${step.title}`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[rgba(16,185,129,0.2)] flex items-center justify-center shadow-md">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>

              {/* Description */}
              <p className="text-[#a7f3d0] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
