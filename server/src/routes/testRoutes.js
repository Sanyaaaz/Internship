import express from "express";
const router = express.Router();

router.post("/test", (req, res) => {
  console.log("Test route hit!", req.body);
  res.status(200).json({ message: "Test POST works", data: req.body });
});

export default router;
