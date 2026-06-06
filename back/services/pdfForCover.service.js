const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const { generateCoverLetterHTML } = require("../templates/cover.template");

exports.generatePDFBuffer = async (htmlContent) => {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;

  let launchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  };

  if (!isProduction) {
    // Local Windows path
    launchOptions.executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
  } else {
    // Production Render configuration using the full package
    const chromium = require('@sparticuz/chromium');
    
    launchOptions.executablePath = await chromium.executablePath();
    launchOptions.args = [...launchOptions.args, ...chromium.args];
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // If your controller expects a Buffer instead of a saved file path:
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();
  
  return pdfBuffer; 
};