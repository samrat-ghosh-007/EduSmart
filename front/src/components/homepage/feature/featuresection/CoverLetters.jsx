import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DocumentTextIcon, 
  CloudArrowUpIcon, 
  BuildingOfficeIcon,
  BriefcaseIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ArrowPathIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://edusmart-aq07.onrender.com";

export default function CoverLetters() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    jobDescription: ""
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const inputRef = useRef();

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  // Animation variants - use motion props correctly
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
    setGeneratedPdf(null);
  };

  // Validate file
  const validateFile = (file) => {
    if (!file) return "No file selected";
    if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") {
      return "Only PDF files are allowed.";
    }
    if (file.size > MAX_SIZE) {
      return `File is too large. Max 5 MB. (Current: ${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
    return null;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    setError("");
    setGeneratedPdf(null);
    
    if (!file) {
      setResume(null);
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setResume(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setResume(file);
    setSuccess("Resume uploaded successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  // Drag and drop handlers
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
    processFile(droppedFile);
  };

  // Generate cover letter
 // Generate cover letter
const generateCoverLetter = async () => {
  // Validate form
  if (!formData.company.trim()) {
    setError("Please enter company name");
    return;
  }
  if (!formData.role.trim()) {
    setError("Please enter role/position");
    return;
  }
  if (!formData.jobDescription.trim()) {
    setError("Please enter job description");
    return;
  }
  if (!resume) {
    setError("Please upload your resume");
    return;
  }

  setLoading(true);
  setError("");
  setProgress(0);
  setGeneratedPdf(null);

  try {
    const data = new FormData();
    data.append("company", formData.company.trim());
    data.append("role", formData.role.trim());
    data.append("jobDescription", formData.jobDescription.trim());
    data.append("resume", resume);

    console.log("Sending request to:", `${BACKEND_URL}/api/generate-cover-letter`);

    // 
    const res = await axios.post(`${BACKEND_URL}/api/generate-cover-letter`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (evt) => {
        if (evt.total) {
          setProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      },
      timeout: 60000,
    });

    console.log("Full response:", res);
    console.log("Response data:", res.data);

    // Check if response is successful
    if (res.data && res.data.success === true) {
      
      // Extract PDF URL from response
      let pdfUrl = null;
      
      if (res.data.downloadLink) {
        if (typeof res.data.downloadLink === 'string') {
          pdfUrl = res.data.downloadLink;
        } else if (res.data.downloadLink.secure_url) {
          pdfUrl = res.data.downloadLink.secure_url;
        } else if (res.data.downloadLink.url) {
          pdfUrl = res.data.downloadLink.url;
        }
      }
      
      if (pdfUrl) {
        console.log("PDF URL received:", pdfUrl);
        setGeneratedPdf(pdfUrl);
        setSuccess("Cover letter generated successfully!");
      } else {
        throw new Error("PDF URL not found in response");
      }
      
    } else {
      throw new Error(res.data?.message || "Failed to generate cover letter");
    }
    
    setTimeout(() => setSuccess(""), 3000);
    
  } catch (err) {
    console.error("Generation error details:", err);
    
    // Handle different types of errors
    if (err.response) {
      // Server responded with error
      console.error("Error response:", err.response.data);
      
      if (err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(`Server error: ${err.response.status}`);
      }
    } else if (err.code === 'ECONNABORTED') {
      setError("Request timeout. Please try again.");
    } else if (err.message === "Network Error") {
      setError("Cannot connect to server. Please check if backend is running.");
    } else {
      setError(err.message || "Failed to generate cover letter");
    }
  } finally {
    setLoading(false);
    setProgress(0);
  }
};

  // Download PDF
  const downloadPdf = () => {
    if (generatedPdf) {
      const link = document.createElement('a');
      link.href = generatedPdf;
      link.download = `Cover_Letter_${formData.company}_${formData.role}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Preview PDF
  const previewPdf = () => {
    if (generatedPdf) {
      window.open(generatedPdf, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header - Fixed motion props */}
      <motion.nav 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Cover Letter Generator
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
        {/* Title Section - Fixed motion props */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Generate Professional</span>
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Cover Letters with AI
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create personalized, ATS-friendly cover letters in seconds. Just fill in the details and upload your resume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Details</h2>
              
              {/* Company Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BuildingOfficeIcon className="h-5 w-5 inline mr-2 text-indigo-500" />
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Google, Microsoft, Tesla"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Role/Position */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BriefcaseIcon className="h-5 w-5 inline mr-2 text-indigo-500" />
                  Role/Position
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Frontend Developer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DocumentTextIcon className="h-5 w-5 inline mr-2 text-indigo-500" />
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Paste the job description here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                  disabled={loading}
                />
              </div>

              {/* Resume Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CloudArrowUpIcon className="h-5 w-5 inline mr-2 text-indigo-500" />
                  Upload Resume (PDF)
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50"
                      : resume
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  
                  <AnimatePresence mode="wait">
                    {resume ? (
                      <motion.div
                        key="file"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <DocumentCheckIcon className="h-12 w-12 text-green-500" />
                        <p className="mt-2 text-sm font-medium text-gray-900">{resume.name}</p>
                        <p className="text-xs text-gray-500">
                          {(resume.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setResume(null);
                            if (inputRef.current) inputRef.current.value = "";
                          }}
                          className="mt-2 text-xs text-red-600 hover:text-red-800"
                          disabled={loading}
                        >
                          Remove
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF only (max 5MB)</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCoverLetter}
                disabled={loading || !formData.company || !formData.role || !formData.jobDescription || !resume}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                  loading || !formData.company || !formData.role || !formData.jobDescription || !resume
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    <span>Generating... {progress ? `${progress}%` : ""}</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <SparklesIcon className="h-5 w-5" />
                    <span>Generate Cover Letter</span>
                  </span>
                )}
              </button>

              {/* Progress Bar */}
              {progress > 0 && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-sm text-green-600 flex items-center">
                      <DocumentCheckIcon className="h-5 w-5 mr-2" />
                      {success}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message  */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="text-sm text-red-600 flex items-start">
                      <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        {typeof error === 'string' ? error : error}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* PDF Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Cover Letter</h2>
              
              {generatedPdf ? (
                <div className="space-y-4">
                  {/* PDF Preview */}
                  <div className="bg-gray-50 rounded-xl p-4 h-[500px] overflow-hidden">
                    <iframe
                      src={generatedPdf}
                      className="w-full h-full rounded-lg border border-gray-200"
                      title="Cover Letter Preview"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={previewPdf}
                      className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <EyeIcon className="h-5 w-5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={downloadPdf}
                      className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    Cover letter for {formData.role} at {formData.company}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[500px] flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl"
                >
                  <DocumentTextIcon className="h-24 w-24 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cover letter will appear here</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Fill in the details and generate a professional cover letter
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Section - Fixed motion props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: SparklesIcon,
              title: "AI-Powered",
              description: "Advanced AI generates personalized cover letters tailored to each job"
            },
            {
              icon: DocumentCheckIcon,
              title: "ATS-Friendly",
              description: "Optimized format that passes through Applicant Tracking Systems"
            },
            {
              icon: CloudArrowUpIcon,
              title: "Instant Download",
              description: "Generate and download your cover letter as PDF instantly"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}