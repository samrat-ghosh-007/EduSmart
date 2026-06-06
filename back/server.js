const cors=require('cors');
require("dotenv").config();
const express = require("express");
const generateRoute = require("./routes/generate.route");
const jobRoutes = require("./routes/job.route");
const resumeRoutes = require("./routes/resume.route");
const analyzeRoutes = require("./routes/analyze.route");
const coverRoute = require("./routes/cover.route");




const app = express();

const allowedOrigins = [
  'https://edusmart-aq07.onrender.com', // Your frontend URL
  'http://localhost:5173'              // Your local Vite development URL
];

app.use((req, res, next) => {
  // Dynamically reflect the origin if it's your frontend, or default to it
  const origin = req.headers.origin;
  if (origin && origin.includes('edusmart')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // IMMEDIATELY respond to the browser's security check (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(cors());

app.use(express.json());
app.use("/api/generate", generateRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api", coverRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
