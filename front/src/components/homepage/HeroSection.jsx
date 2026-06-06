import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  SparklesIcon,
  DocumentCheckIcon,
  MicrophoneIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 md:px-6 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-2xl">
            Build Your Dream Career with AI
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl lg:mx-0 leading-relaxed">
            Create resumes, analyze them, generate cover letters, and prepare for interviews—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
            <Link
              to="/features"
              className="bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              Get Started <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link 
              to="/features" 
              className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-white hover:text-indigo-600 transition-all"
            >
              Explore Features
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 md:gap-8 mt-8 md:mt-12 justify-center lg:justify-start">
            <div>
              <div className="text-2xl md:text-3xl font-bold">50K+</div>
              <div className="text-xs md:text-base text-indigo-100">Active Users</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">95%</div>
              <div className="text-xs md:text-base text-indigo-100">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">100K+</div>
              <div className="text-xs md:text-base text-indigo-100">Resumes Built</div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - All the mockups and animations */}
        <HeroMockups />
      </div>
      
      {/* Floating gradient animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
}

function HeroMockups() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative block mt-8 lg:mt-0 scale-90 md:scale-100"
    >
      <div className="relative flex justify-center">
        {/* Main Dashboard */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px]"
        >
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/30 shadow-2xl">
            {/* Profile Card */}
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl md:rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl md:rounded-2xl shadow-lg"></div>
                <div>
                  <div className="h-3 md:h-4 bg-gradient-to-r from-gray-300 to-gray-100 rounded w-20 md:w-24 mb-1"></div>
                  <div className="h-2 md:h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded w-16 md:w-20"></div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
              <div className="bg-white/70 backdrop-blur-sm p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl shadow-lg border border-white/50">
                <div className="text-[10px] md:text-xs text-gray-500 font-medium mb-0.5 md:mb-1">ATS Score</div>
                <div className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">92%</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl shadow-lg border border-white/50">
                <div className="text-[10px] md:text-xs text-gray-500 font-medium mb-0.5 md:mb-1">Jobs Matched</div>
                <div className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">127</div>
              </div>
            </div>

            {/* Job Matches List */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between p-2 md:p-3 bg-white/60 backdrop-blur-sm rounded-lg md:rounded-xl hover:bg-white/80 transition-all">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg md:rounded-xl shadow-md"></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[10px] md:text-xs lg:text-sm truncate bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Software Engineer - Google
                    </div>
                    <div className="text-[8px] md:text-xs text-gray-500">85% match</div>
                  </div>
                </div>
                <div className="w-12 md:w-16 lg:w-20 h-4 md:h-5 lg:h-6 bg-indigo-200 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-2 md:p-3 bg-white/60 backdrop-blur-sm rounded-lg md:rounded-xl hover:bg-white/80 transition-all">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg md:rounded-xl shadow-md"></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[10px] md:text-xs lg:text-sm truncate bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Frontend Developer - Meta
                    </div>
                    <div className="text-[8px] md:text-xs text-gray-500">78% match</div>
                  </div>
                </div>
                <div className="w-12 md:w-16 lg:w-20 h-4 md:h-5 lg:h-6 bg-indigo-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating ATS Card */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-4 md:-top-8 -left-2 md:-left-16 z-20"
        >
          <div className="bg-gradient-to-br from-emerald-400 to-green-500 text-white p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl shadow-2xl w-40 md:w-48 lg:w-56 border border-white/30">
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2 lg:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center">
                <DocumentCheckIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </div>
              <div>
                <div className="font-bold text-xs md:text-sm lg:text-base">ATS Score</div>
                <div className="text-[10px] md:text-xs lg:text-sm opacity-90">Perfect optimization</div>
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-1 md:h-1.5 lg:h-2">
              <div className="w-11/12 h-1 md:h-1.5 lg:h-2 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </motion.div>

        {/* Floating AI Suggestions Card */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-8 md:-bottom-12 -right-2 md:-right-8 z-20"
        >
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl shadow-2xl w-40 md:w-48 lg:w-56 border border-white/30">
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2 lg:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </div>
              <div>
                <div className="font-bold text-xs md:text-sm lg:text-base">AI Suggestions</div>
                <div className="text-[10px] md:text-xs lg:text-sm opacity-90">15 improvements found</div>
              </div>
            </div>
            <div className="text-[10px] md:text-xs lg:text-sm font-medium">Resume strength: 94/100</div>
          </div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-2 md:-bottom-6 left-2 md:left-12 z-30"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl shadow-2xl border-2 md:border-4 border-white/50">
            <BriefcaseIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
          </div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-16 md:top-24 -right-2 md:-right-12 z-30"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl shadow-2xl border-2 md:border-4 border-white/50">
            <MicrophoneIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
          </div>
        </motion.div>

        {/* Dynamic Background Shapes */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-purple-300/50 via-pink-300/30 to-indigo-300/50 rounded-full blur-3xl opacity-30 md:opacity-60 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 md:w-80 h-56 md:h-80 bg-gradient-to-r from-indigo-400/40 to-blue-400/40 rounded-full blur-3xl opacity-30 md:opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;
