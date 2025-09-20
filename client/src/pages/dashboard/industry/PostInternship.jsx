import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { getToken } from "../../../services/authService";

export default function PostInternship() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    stipend: "",
    duration: "",
    applyLink: "",
    requirements: ""
  });
  
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get token using the auth service
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!authenticated) {
      setError("You must be logged in to post an internship");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const response = await api.post("/internships", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess(true);
      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        stipend: "",
        duration: "",
        applyLink: "",
        requirements: ""
      });
    } catch (err) {
      console.error("Error posting internship:", err);
      setError(err.response?.data?.message || "Error posting internship");
    } finally {
      setLoading(false);
    }
  };
  
  const viewMyInternships = () => {
    navigate("/dashboard/my-internships");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Post Internship</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Success!</p>
          <p>Your internship has been posted successfully.</p>
          <div className="mt-3">
            <button 
              onClick={viewMyInternships} 
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              View My Internships
            </button>
            <button 
              onClick={() => setSuccess(false)} 
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Post Another
            </button>
          </div>
        </div>
      )}
      
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required/>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full border p-2 rounded" required/>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required/>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required/>
          <input name="stipend" value={form.stipend} onChange={handleChange} placeholder="Stipend" className="w-full border p-2 rounded"/>
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full border p-2 rounded"/>
          <input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="Apply Link" className="w-full border p-2 rounded" required/>
          <input name="requirements" value={form.requirements} onChange={handleChange} placeholder="Requirements (comma separated)" className="w-full border p-2 rounded"/>
          
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded w-full" 
            disabled={!authenticated || loading}
          >
            {loading ? "Posting..." : "Post Internship"}
          </button>
          
          {!authenticated && <p className="text-red-500 text-sm">You must be logged in to post an internship</p>}
        </form>
      )}
    </div>
  );
}
