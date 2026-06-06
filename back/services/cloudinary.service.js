// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.uploadPDF = async (filePath) => {
//   const result = await cloudinary.uploader.upload(filePath, {
//     resource_type: "raw", 
//     folder: "resumes",
//   });

  
//   fs.unlinkSync(filePath);

//   return result;
// };

// exports.deletePDF = async (publicId) => {
//   await cloudinary.uploader.destroy(publicId, {
//     resource_type: "raw",
//   });
// };

// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.uploadPDF = async (filePath) => {

//   const result = await cloudinary.uploader.upload(filePath, {
//   resource_type: "raw",
//   folder: "resumes",
//   use_filename: true,
//   unique_filename: false
// });


//   // delete local file after upload
//   fs.unlinkSync(filePath);

//   return result;
// };


const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadPDF = (pdfBuffer, folderName = "cover_letters") => {
  return new Promise((resolve, reject) => {
    // 1. Create a dynamic upload stream from Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // CRITICAL: Tells Cloudinary this is a non-image file type (PDF)
        folder: folderName,
        access_mode: "public"
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload stream error:", error);
          return reject(error);
        }
        resolve(result); // This contains secure_url, url, etc.
      }
    );

    // 2. Convert your Uint8Array/Buffer into a readable node stream and pipe it to Cloudinary
    streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
  });
};
