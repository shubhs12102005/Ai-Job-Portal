import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[550px] md:min-h-[650px] overflow-hidden bg-gradient-to-b from-gray-900 via-[#0f172a] to-[#1e293b] text-white">
      {/* Background with smooth dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/HomeBanner5.jpg"
          alt="Professional job portal banner - diverse professionals networking"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-purple-900/40 to-transparent" />
      </div>

      {/* Main Content Section */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        
        {/* Headline */}
        <div className="mt-4 max-w-4xl mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Discover Your
            <span className="block text-white font-extrabold">Next Career Move</span>
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Join thousands of professionals on the path to success. Explore tailored job opportunities and match your ambition.
          </p>
        </div>

        {/* CTA Search Box */}
        <div className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 shadow-lg animate-slide-up">
          <Button
            type="button"
            onClick={() => navigate("/jobs")}
            className="w-full bg-gradient-to-r from-[#6A38C2] to-[#4F46E5] hover:from-[#5b30a6] hover:to-[#4338CA] text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-purple-800/40 transition-all duration-300"
          >
            Explore Jobs
          </Button>

          {/* Stats Section */}
          <div className="flex justify-around mt-6 pt-4 border-t border-gray-700 text-sm">
            <div className="text-center">
              <div className="font-bold text-violet-400 text-xl">50K+</div>
              <div className="text-gray-400">Jobs Available</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-violet-400 text-xl">10K+</div>
              <div className="text-gray-400">Companies</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-violet-400 text-xl">1M+</div>
              <div className="text-gray-400">Users Registered</div>
            </div>
          </div>
        </div>

        {/* Additional CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up">
          <Button
            variant="outline"
            onClick={() => navigate("/jobs")}
            className="border-2 border-violet-500 text-violet-300 hover:bg-violet-600 hover:text-white px-8 py-3 rounded-xl text-lg transition-all duration-300"
          >
            Browse All Jobs
          </Button>
         
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
