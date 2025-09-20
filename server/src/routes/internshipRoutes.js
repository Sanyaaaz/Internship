import express from "express";
import Internship from "../models/Internship.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST internship (protected)
router.post("/", protect, async (req, res) => {
  const { title, company, location, stipend, duration, applyLink, description, requirements } = req.body;

  if (!title || !company || !location || !applyLink || !description)
    return res.status(400).json({ message: "Required fields missing" });

  try {
    const internship = new Internship({
      title,
      company,
      location,
      stipend: stipend || "Not specified",
      duration: duration || "Not specified",
      applyLink,
      description,
      requirements: requirements ? requirements.split(",").map(r => r.trim()) : [],
      postedBy: req.user._id
    });

    const saved = await internship.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all internships (public)
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find().populate("postedBy", "name email").sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
