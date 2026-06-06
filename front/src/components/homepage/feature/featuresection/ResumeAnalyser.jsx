import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DocumentTextIcon, 
  CloudArrowUpIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  LightBulbIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://edusmart-aq07.onrender.com/";

export default function ResumeAnalyser() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const validateFile = (file) => {
    if (!file) return "No file selected";
    if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") {
      return "Only PDF files are allowed.";
    }
    if (file.size > MAX_SIZE) {
      return "File is too large. Max 5 MB.";
    }
    return null;
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    handleFileSelection(f);
  };

  const handleFileSelection = (f) => {
    setError("");
    setResult(null);
    
    if (!f) {
      setFile(null);
      return;
    }

    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setFile(f);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const uploadResume = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(0);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(`${BACKEND_URL}/api/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (evt) => {
          if (evt.total) {
            setProgress(Math.round((evt.loaded * 100) / evt.total));
          }
        },
        timeout: 120000, // 2 minutes
        // Add withCredentials if needed
        withCredentials: false,
      });

      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      
      // Handle CORS error specifically
      if (err.message === "Network Error") {
        setError("Cannot connect to server. Please check if the backend is running and CORS is configured.");
      } else {
        const serverMsg = err?.response?.data || err?.response?.statusText;
        if (serverMsg) {
          setError(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Analysis failed");
        }
      }
    } finally {
      setLoading(false);
      setProgress(0);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-yellow-50";
    return "bg-red-50";
  };

  // Animation variants to avoid boolean attributes
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.2 }
  };

  const slideInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.3 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItem = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.nav 
        {...fadeInUp}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Resume Analyzer
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Professional Edition</span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          {...fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Optimize Your Resume with</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Insights
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant ATS scoring, skill gap analysis, and professional suggestions to land your dream job.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            {...slideInLeft}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Resume</h2>
              
              {/* File Drop Zone */}
              <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div
                      key="file"
                      variants={scaleIn}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex flex-col items-center"
                    >
                      <DocumentTextIcon className="h-16 w-16 text-green-500" />
                      <p className="mt-2 text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (inputRef.current) inputRef.current.value = "";
                        }}
                        className="mt-2 text-xs text-red-600 hover:text-red-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      variants={scaleIn}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <CloudArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto" />
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF only (max 5MB)</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Analyze Button */}
              <motion.button
                onClick={uploadResume}
                disabled={loading || !file}
                className={`mt-6 w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                  loading || !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                }`}
                whileHover={!loading && file ? { scale: 1.02 } : {}}
                whileTap={!loading && file ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    <span>Analyzing... {progress ? `${progress}%` : ""}</span>
                  </span>
                ) : (
                  "Analyze Resume"
                )}
              </motion.button>

              {/* Progress Bar */}
              {progress > 0 && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-sm text-red-600 flex items-center">
                      <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CORS Help Message */}
              {error && error.includes("CORS") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <p className="text-sm text-yellow-700">
                    <strong>Backend CORS fix needed:</strong> Make sure your backend has CORS enabled for https://edusmart-aq07.onrender.com/
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            {...slideInRight}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
              
              {result ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* ATS Score */}
                    <motion.div 
                      className="bg-gray-50 rounded-xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <ChartBarIcon className="h-6 w-6 text-gray-600" />
                          <h3 className="text-lg font-semibold text-gray-900">ATS Score</h3>
                        </div>
                        <span className={`text-3xl font-bold ${getScoreColor(result.atsScore)}`}>
                          {result.atsScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.atsScore}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-3 rounded-full ${
                            result.atsScore >= 80
                              ? "bg-green-500"
                              : result.atsScore >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                      </div>
                    </motion.div>

                    {/* Strengths */}
                    <motion.div 
                      className={`rounded-xl p-6 ${getScoreBgColor(result.atsScore)}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
                      </div>
                      <motion.ul 
                        className="space-y-2"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                      >
                        {result.strengths?.length ? (
                          result.strengths.map((s, i) => (
                            <motion.li
                              key={i}
                              variants={listItem}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{s}</span>
                            </motion.li>
                          ))
                        ) : (
                          <li className="text-gray-500">No strengths detected</li>
                        )}
                      </motion.ul>
                    </motion.div>

                    {/* Missing Skills */}
                    <motion.div 
                      className="bg-orange-50 rounded-xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <XCircleIcon className="h-6 w-6 text-orange-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Missing Skills</h3>
                      </div>
                      <motion.ul 
                        className="space-y-2"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                      >
                        {result.missingSkills?.length ? (
                          result.missingSkills.map((s, i) => (
                            <motion.li
                              key={i}
                              variants={listItem}
                              className="flex items-start space-x-2"
                            >
                              <XCircleIcon className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{s}</span>
                            </motion.li>
                          ))
                        ) : (
                          <li className="text-gray-500">No missing skills detected</li>
                        )}
                      </motion.ul>
                    </motion.div>

                    {/* Suggestions */}
                    <motion.div 
                      className="bg-blue-50 rounded-xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <LightBulbIcon className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Suggestions</h3>
                      </div>
                      <motion.ul 
                        className="space-y-2"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                      >
                        {result.suggestions?.length ? (
                          result.suggestions.map((s, i) => (
                            <motion.li
                              key={i}
                              variants={listItem}
                              className="flex items-start space-x-2"
                            >
                              <LightBulbIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{s}</span>
                            </motion.li>
                          ))
                        ) : (
                          <li className="text-gray-500">No suggestions available</li>
                        )}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 flex flex-col items-center justify-center text-center"
                >
                  <DocumentTextIcon className="h-24 w-24 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Upload your resume to see the analysis</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Get insights about your ATS score, strengths, and areas for improvement
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: ChartBarIcon,
              title: "ATS Optimization",
              description: "Get your resume past Applicant Tracking Systems with our AI analysis"
            },
            {
              icon: SparklesIcon,
              title: "Skill Gap Analysis",
              description: "Identify missing skills and get recommendations to improve"
            },
            {
              icon: LightBulbIcon,
              title: "Professional Insights",
              description: "Receive actionable suggestions from industry experts"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}