import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";

function MyGigs() {
  const navigate = useNavigate();
  const [gigs, setGigs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const token = localStorage.getItem("unikart-auth");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${base_url}/user/mygigs/${id}`, config);
      if (response.status === 200) {
        setGigs((prevGigs)=> prevGigs.filter((gig)=> gig._id !== id))
      } else if (response.status === 404) {
        alert("Gig Not Found");
      }
    } catch (error) {
      alert("Some error occurred");
      console.log(error);
    }
  };

  React.useEffect(() => {
    async function getUserGigs() {
      const token = localStorage.getItem("unikart-auth");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        if (!token) return setError("Please login again");
        const response = await axios.get(`${base_url}/user/mygigs`, config);
        if (response.status === 200) {
          setGigs(response.data);
          setLoading(false);
        } else if (response.status === 404) {
          setError("No Gigs found, create one now!");
          setLoading(false);
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    getUserGigs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-zinc-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#000000]">Your Listings</h1>
          <button
            onClick={() => navigate("/home/create-gig")}
            className="bg-[#000000] text-white px-6 py-3 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200 font-medium"
          >
            Create New Gig
          </button>
        </div>

        {error ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-zinc-600">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-[#2D2D2D]"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#000000] mb-2">
                    {gig.name}
                  </h3>
                  <p className="text-zinc-600 mb-4 line-clamp-2">
                    {gig.description}
                  </p><p className="text-zinc-600 mb-4 line-clamp-2">
                   budget :  {gig.budget}
                  </p>
                  <button
                    onClick={() => navigate(`/update-gig/${gig._id}`)}
                    className="w-full bg-[#000000] text-white py-2 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200 mb-3"
                  >
                    Edit Gig
                  </button>
                  <button
                    onClick={() => handleDelete(gig._id)}
                    className="w-full bg-[#F93827] text-white py-2 rounded-lg hover:bg-[#FF9D23] transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGigs;

