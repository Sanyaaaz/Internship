import { useEffect, useState } from "react";
import api from "../../../services/api";
import { getToken, getUser } from "../../../services/authService";

export default function MyInternships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          console.error('No authentication token found');
          return;
        }
        
        const res = await api.get("/internships", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter internships to only show those posted by the current user
        const userData = getUser();
        if (userData && userData.id) {
          const userInternships = res.data.filter(internship => 
            internship.postedBy === userData.id || 
            (internship.postedBy && internship.postedBy._id === userData.id)
          );
          setInternships(userInternships);
        } else {
          setInternships([]);
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Posted Internships</h2>
      {internships.map((i) => (
        <div key={i._id} className="border p-3 mb-3 rounded">
          <h3 className="font-semibold">{i.title}</h3>
          <p>{i.description}</p>
          <p><b>Stipend:</b> {i.stipend}</p>
          <p><b>Duration:</b> {i.duration}</p>
          <p><b>Requirements:</b> {i.requirements.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
