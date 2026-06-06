const { extractText } = require("../services/pdf.service");
const { generateCoverLetter } = require("../services/coverLetter.service");
const { generatePDFBuffer } = require("../services/pdfForCover.service");
const { uploadPDF } = require("../services/cloudinary.service");
const { pdfService } = require("../services/pdf.service");



exports.generateCoverLetterController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const { company, role, jobDescription } = req.body;

    if (!company || !role || !jobDescription) {
      return res.status(400).json({ message: "All fields required" });
    }

    
    const resumeText = await extractText(req.file.buffer);

    
    const coverLetter = await generateCoverLetter({
      resumeText,
      company,
      role,
      jobDescription,
    });

    
    const pdfBuffer = await pdfService.generatePDFBuffer(htmlContent);

// 2. Await the stream upload promise response
const cloudinaryResult = await cloudinaryService.uploadPDF(pdfBuffer);

// 3. Return the payload matching your frontend keys
return res.status(200).json({
  success: true,
  message: "Cover letter generated successfully!",
  downloadLink: {
    secure_url: cloudinaryResult.secure_url
   }
  }) // Matches what your frontend checks for!
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
