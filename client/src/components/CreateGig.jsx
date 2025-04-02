import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";

function CreateGig() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [error, setError] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const token = localStorage.getItem("unikart-auth");
  const navigate = useNavigate()

  const submitGig = async (e) => {
    e.preventDefault();
    if (!name || !description || !budget) {
      setError(" fields name, description, budget are required");
      return;
    }

    const body = { name, description, budget, deadline };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${base_url}/user/create-gig`,
        body,
        config
      );
      if (response.status === 200) {
        setName("");
        setDescription("");
        setBudget("");
        setDeadline("");
        setError("");
        alert("Gig created successfully");
        navigate('/home/mygigs')
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-[#000000] text-center mb-8">
          Create Gig
        </h2>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Gig Name"
            className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
          />
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline"
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
          <button
            onClick={submitGig}
            className="w-full bg-[#000000] text-white py-3 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200 font-medium"
          >
            Create Gig
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default CreateGig;
