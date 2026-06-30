const express = require("express");
const router = express.Router();

const Issue = require("../models/Issue");
const genAI = require("../services/gemini");

const multer = require("multer");
const path = require("path");
// ==========================
// GET ALL ISSUES
// ==========================
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// CREATE ISSUE WITH GEMINI AI
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
  try {
    const {
      title,
      description,
      issueType,
      location,
      latitude,
      longitude,
    } = req.body;
console.log("BODY:", req.body);
console.log("FILE:", req.file);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

    const prompt = `
You are an AI Civic Issue Analyzer.

Analyze this civic complaint.

Possible categories:
- Pothole
- Road Damage
- Garbage
- Water Leakage
- Drainage Issue
- Street Light Failure
- Infrastructure Damage

Classify the issue correctly based on title and description.

Issue Title:
${title}

Description:
${description}

Return ONLY valid JSON.

{
  "issueType":"",
  "severity":"",
  "priority":"",
  "suggestedAction":""
}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let ai;

    try {
      ai = JSON.parse(cleaned);
    } catch {
      ai = {
        issueType,
        severity: "Medium",
        priority: "Medium",
        suggestedAction: "Forward to Municipality",
      };
    }

const issue = new Issue({
  title,
  description,

  issueType:
    ai.issueType || issueType,

  severity:
    ai.severity || "Medium",

  priority:
    ai.priority || "Medium",

  suggestedAction:
    ai.suggestedAction ||
    "Forward to Municipality",

  image: req.file
    ? req.file.filename
    : "",

  location,

  latitude:
    Number(latitude),

  longitude:
    Number(longitude),

  status: "Pending",
});
    await issue.save();

    res.status(201).json(issue);
 } catch (error) {
  console.error("FULL GEMINI ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
});

// ==========================
// UPDATE ISSUE
// ==========================
router.put("/:id/status", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(issue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// DELETE ISSUE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);

    res.json({
      message: "Issue Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;