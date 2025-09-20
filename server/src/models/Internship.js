import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  stipend: { type: String },
  duration: { type: String },
  applyLink: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.model("Internship", internshipSchema);
