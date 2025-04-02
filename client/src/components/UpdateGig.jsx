import React from "react";
import axios from "axios";
import { base_url } from "../App";
import { useParams, useNavigate } from "react-router-dom";

function UpdateGig() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [deadline , setDeadline] = React.useState("")
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const token = localStorage.getItem("unikart-auth");

  React.useEffect(() => {
    async function getGig() {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log(params.id)
        const response = await axios.get(`${base_url}/user/mygigs/${params.id}` , config);
        if (response.status === 200) {
          setName(response.data.name || "");
          setDescription(response.data.description || "");
          setBudget(response.data.budget || "");
          setDeadline(response.data.deadline || "");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch the Gig");
      } finally {
        setLoading(false);
      }
    }
    getGig();
  }, [params.id, token]);

  const submitGig = async (event) => {
    event.preventDefault();
    const body = { name, description, budget };
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`${base_url}/user/mygigs/${params.id}`, body , config );
      if (response.status === 200) {
        alert("Updated Sucessfully")
        navigate("/home/mygigs")
      }
    } catch (err) {
        console.log(err.response.data)
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-zinc-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-[#000000] text-center mb-8">
            Update Gig
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={submitGig} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Gig Name"
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
            />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Budget"
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
            />
            <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline"
            className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#000000] text-white py-3 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200 font-medium"
                onClick={submitGig}
              >
                Update Gig
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateGig;
