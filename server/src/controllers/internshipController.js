import Internship from "../models/Internship.js";

// POST Internship (Industry posts)
export const createInternship = async (req, res) => {
  try {
    const { 
      title, 
      company, 
      location, 
      stipend, 
      duration, 
      applyLink, 
      description, 
      requirements 
    } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    // For testing without authentication, use a default user ID
    // In production, you'll want to use req.user.id from the auth middleware
    const postedBy = req.user ? req.user.id : null;

if (!postedBy) {
  return res.status(403).json({ message: "Not authorized to post internship" });
}
    const internship = new Internship({
      title,
      company,
      location,
      stipend,
      duration,
      applyLink,
      description,
      requirements: requirements.split(",").map(r => r.trim()),
      postedBy
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET All Internships (For Students to view later)
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate("postedBy", "name email");
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET Industry's Own Internships
export const getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ postedBy: req.user.id });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};