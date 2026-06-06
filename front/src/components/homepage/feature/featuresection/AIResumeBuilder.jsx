// src/components/homepage/feature/featuresection/AIResumeBuilder.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  SparklesIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PlusIcon,
  TrashIcon,
  CodeBracketIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const BACKEND_URL = "https://edusmart-aq07.onrender.com";

const AIResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [resumeData, setResumeData] = useState({
    fullName: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    summary: '',
    skills: [],
    experience: [
      {
        role: '',
        company: '',
        duration: '',
        responsibilities: ['']
      }
    ],
    projects: [
      {
        title: '',
        description: ['']
      }
    ],
    education: [
      {
        degree: '',
        institution: '',
        year: ''
      }
    ]
  });

  const [customSkill, setCustomSkill] = useState('');

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const templates = [
    { id: 'modern', name: 'Modern Pro', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true, color: 'from-blue-400 to-emerald-400' },
    { id: 'minimal', name: 'Minimalist', image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: false, color: 'from-gray-400 to-slate-400' },
    { id: 'creative', name: 'Creative', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: false, color: 'from-purple-400 to-pink-400' },
    { id: 'executive', name: 'Executive', image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true, color: 'from-amber-400 to-orange-400' },
  ];

  const handleInputChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Experience handlers
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index][field] = value;
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          role: '',
          company: '',
          duration: '',
          responsibilities: ['']
        }
      ]
    }));
  };

  const removeExperience = (index) => {
    if (resumeData.experience.length > 1) {
      const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
      setResumeData(prev => ({ ...prev, experience: updatedExperience }));
    }
  };

  const addResponsibility = (expIndex) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].responsibilities.push('');
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const updateResponsibility = (expIndex, respIndex, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].responsibilities[respIndex] = value;
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const updatedExperience = [...resumeData.experience];
    if (updatedExperience[expIndex].responsibilities.length > 1) {
      updatedExperience[expIndex].responsibilities = updatedExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex);
      setResumeData(prev => ({ ...prev, experience: updatedExperience }));
    }
  };

  // Projects handlers
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index][field] = value;
    setResumeData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: '',
          description: ['']
        }
      ]
    }));
  };

  const removeProject = (index) => {
    if (resumeData.projects.length > 1) {
      const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
      setResumeData(prev => ({ ...prev, projects: updatedProjects }));
    }
  };

  const addProjectDescription = (projIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projIndex].description.push('');
    setResumeData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const updateProjectDescription = (projIndex, descIndex, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projIndex].description[descIndex] = value;
    setResumeData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const removeProjectDescription = (projIndex, descIndex) => {
    const updatedProjects = [...resumeData.projects];
    if (updatedProjects[projIndex].description.length > 1) {
      updatedProjects[projIndex].description = updatedProjects[projIndex].description.filter((_, i) => i !== descIndex);
      setResumeData(prev => ({ ...prev, projects: updatedProjects }));
    }
  };

  // Education handlers
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index][field] = value;
    setResumeData(prev => ({ ...prev, education: updatedEducation }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          institution: '',
          year: ''
        }
      ]
    }));
  };

  const removeEducation = (index) => {
    if (resumeData.education.length > 1) {
      const updatedEducation = resumeData.education.filter((_, i) => i !== index);
      setResumeData(prev => ({ ...prev, education: updatedEducation }));
    }
  };

  // Skills handlers
  const addSkill = () => {
    if (customSkill.trim() && !resumeData.skills.includes(customSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()]
      }));
      setCustomSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Clean data before sending to backend
  const cleanData = () => {
    return {
      fullName: resumeData.fullName.trim(),
      email: resumeData.email.trim(),
      phone: resumeData.phone?.trim() || '',
      linkedin: resumeData.linkedin?.trim() || '',
      github: resumeData.github?.trim() || '',
      summary: resumeData.summary.trim(),
      // Filter out empty skills
      skills: resumeData.skills.filter(skill => skill && skill.trim() !== ''),
      
      // Clean experience data - only include if has role or company
      experience: resumeData.experience
        .filter(exp => exp.role?.trim() || exp.company?.trim())
        .map(exp => ({
          role: exp.role?.trim() || '',
          company: exp.company?.trim() || '',
          duration: exp.duration?.trim() || '',
          responsibilities: exp.responsibilities.filter(r => r && r.trim() !== '')
        })),
      
      // Clean projects data - only include if has title
      projects: resumeData.projects
        .filter(proj => proj.title?.trim())
        .map(proj => ({
          title: proj.title?.trim() || '',
          description: proj.description.filter(d => d && d.trim() !== '')
        })),
      
      // Clean education data - only include if has degree or institution
      education: resumeData.education
        .filter(edu => edu.degree?.trim() || edu.institution?.trim())
        .map(edu => ({
          degree: edu.degree?.trim() || '',
          institution: edu.institution?.trim() || '',
          year: edu.year?.trim() || ''
        }))
    };
  };

  // API call to generate resume
  const handleGenerateResume = async () => {
    // Validate required fields
    if (!resumeData.fullName || !resumeData.email || !resumeData.summary) {
      setError('Please fill in all required fields (Name, Email, and Summary)');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      // Clean the data before sending
      const cleanResumeData = cleanData();
      
      console.log('Sending data to backend:', cleanResumeData);

      // Make API call to your backend
      const response = await axios.post(`${BACKEND_URL}/api/resume/generate`, cleanResumeData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 90000, // 90 seconds
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        // Get the download URL from response
        const downloadUrl = response.data.downloadUrl;
        const fileName = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
        
        // Show success popup
        setSuccess('✅ Resume generated successfully! Download started.');
        
        try {
          // Try method 1: Create hidden link
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          // Fallback to method 2: Open in new tab
          console.log('Using fallback download method');
          window.open(downloadUrl, '_blank');
        }
        
        // Show success message
        setGeneratedResume({ 
          success: true, 
          message: 'Resume generated successfully!' 
        });
      } else {
        throw new Error(response.data.message || 'Failed to generate resume');
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
        setGeneratedResume(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error generating resume:', error);
      
      if (error.code === 'ECONNABORTED') {
        setError('Request timeout. The server is taking too long to respond. Please try again.');
      } else if (error.response) {
        console.log('Error data:', error.response.data);
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('Cannot connect to the server. Please make sure the backend is running on port 5000.');
      } else {
        setError('Error: ' + error.message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Debug function to test API
  const debugAPI = async () => {
    try {
      const testData = {
        fullName: "Test User",
        email: "test@email.com",
        summary: "Test summary",
        skills: ["JavaScript"],
        experience: [],
        projects: [],
        education: []
      };
      
      console.log('Sending test data:', testData);
      
      const response = await axios.post(`${BACKEND_URL}/api/resume/generate`, testData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
      });
      
      console.log('Test response:', response.data);
      
      if (response.data.success) {
        alert(`✅ Test successful! Download URL: ${response.data.downloadUrl}`);
        window.open(response.data.downloadUrl, '_blank');
      } else {
        alert(`❌ Test failed: ${response.data.message}`);
      }
      
    } catch (error) {
      console.error('Test error details:', error);
      
      if (error.code === 'ECONNABORTED') {
        alert('❌ Test timeout! The server is taking too long to respond.');
      } else if (error.response) {
        console.log('Error status:', error.response.status);
        console.log('Error data:', error.response.data);
        
        let errorMessage = 'Unknown error';
        if (error.response.data) {
          if (typeof error.response.data === 'object') {
            errorMessage = JSON.stringify(error.response.data);
          } else {
            errorMessage = error.response.data;
          }
        }
        
        alert(`❌ Test failed! Status: ${error.response.status}\nError: ${errorMessage}`);
      } else {
        alert('❌ Test failed! Check console for details.');
      }
    }
  };

  // Load sample data
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />
          
          {/* Loader Card */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-gray-800/90 border border-gray-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              {/* Animated circles */}
              <div className="relative mb-6">
                {/* Outer ring */}
                <div className="w-24 h-24 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin" />
                
                {/* Inner pulsing circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Loading text */}
              <h3 className="text-xl font-semibold text-white mb-2">
                Generating Your Resume
              </h3>
              
              {/* Progress steps */}
              <div className="space-y-3 w-full">
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm">Analyzing your information...</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
                  <span className="text-sm">Formatting your resume...</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}} />
                  <span className="text-sm">Applying AI enhancements...</span>
                </div>
              </div>
              
              {/* Estimated time */}
              <p className="text-sm text-gray-500 mt-4">
                This may take up to 60 seconds
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm border border-blue-500/30 shadow-lg mb-6">
            
            
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build Your Professional
            <span className="block bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Resume in Minutes
            </span>
          </h1>
        </motion.div>

        {/* Success Popup Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 shadow-xl max-w-md"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-emerald-400">
                    {success}
                  </p>
                </div>
                <button
                  onClick={() => setSuccess('')}
                  className="ml-4 flex-shrink-0 text-emerald-400 hover:text-emerald-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 flex items-center justify-between"
            >
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-300">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success/Error Messages (Legacy) */}
        {generatedResume && !success && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-center">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            {generatedResume.message}
          </div>
        )}

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
        >
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-400" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name *"
                  value={resumeData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email Address *"
                  value={resumeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  value={resumeData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
                <input 
                  type="url" 
                  placeholder="LinkedIn URL"
                  value={resumeData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
                <input 
                  type="url" 
                  placeholder="GitHub URL"
                  value={resumeData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 md:col-span-2"
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Professional Summary *</h3>
              <textarea 
                placeholder="Write a brief summary of your professional background..."
                value={resumeData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 h-32"
                required
              />
            </div>

            {/* Skills */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 flex items-center group"
                  >
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Add skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500"
                />
                <button 
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-400" />
                  Work Experience
                </h3>
                <button 
                  onClick={addExperience}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Experience
                </button>
              </div>
              
              {resumeData.experience.map((exp, expIndex) => (
                <div key={expIndex} className="mb-6 p-6 bg-white/5 rounded-xl relative">
                  {resumeData.experience.length > 1 && (
                    <button 
                      onClick={() => removeExperience(expIndex)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(expIndex, 'role', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Duration (e.g., Jan 2025 - Present)"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(expIndex, 'duration', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white md:col-span-2"
                    />
                  </div>
                  
                  <h4 className="text-white text-sm mb-2">Responsibilities</h4>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex items-center space-x-2 mb-2">
                      <input 
                        type="text" 
                        placeholder={`Responsibility ${respIndex + 1}`}
                        value={resp}
                        onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      />
                      {exp.responsibilities.length > 1 && (
                        <button 
                          onClick={() => removeResponsibility(expIndex, respIndex)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={() => addResponsibility(expIndex)}
                    className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Responsibility
                  </button>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <CodeBracketIcon className="w-5 h-5 mr-2 text-blue-400" />
                  Projects
                </h3>
                <button 
                  onClick={addProject}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Project
                </button>
              </div>
              
              {resumeData.projects.map((project, projIndex) => (
                <div key={projIndex} className="mb-6 p-6 bg-white/5 rounded-xl relative">
                  {resumeData.projects.length > 1 && (
                    <button 
                      onClick={() => removeProject(projIndex)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                  
                  <input 
                    type="text" 
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(projIndex, 'title', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white mb-4"
                  />
                  
                  <h4 className="text-white text-sm mb-2">Description</h4>
                  {project.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center space-x-2 mb-2">
                      <input 
                        type="text" 
                        placeholder={`Description point ${descIndex + 1}`}
                        value={desc}
                        onChange={(e) => updateProjectDescription(projIndex, descIndex, e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      />
                      {project.description.length > 1 && (
                        <button 
                          onClick={() => removeProjectDescription(projIndex, descIndex)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={() => addProjectDescription(projIndex)}
                    className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Description Point
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-400" />
                  Education
                </h3>
                <button 
                  onClick={addEducation}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Education
                </button>
              </div>
              
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-6 bg-white/5 rounded-xl relative">
                  {resumeData.education.length > 1 && (
                    <button 
                      onClick={() => removeEducation(index)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
              <button 
                onClick={handleGenerateResume}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isGenerating ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;