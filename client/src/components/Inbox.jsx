import React from "react";
import axios from "axios";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const [people, setPeople] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [loading , setLoading] = React.useState(true);
  const token = localStorage.getItem("unikart-auth");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  async function getConvos() {
    try {
      const response = await axios.get(`${base_url}/user/inbox`, config);
      setPeople(response.data.convos);
      setUserId(response.data.id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }

  React.useEffect(() => {
    getConvos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-grey-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#FAFAFA] overflow-y-auto">
      <h1 className="text-3xl font-light text-[#393E46] mb-6">Inbox</h1>
      {people.length === 0 ? (
        <p className="text-[#393E46] text-center">No conversations found.</p>
      ) : (
        <div className="space-y-4">
          {people.map((person, index) => (
            <button
              key={index}
              className="flex items-center p-4 border-b border-[#EEEEEE] text-[#393E46] hover:bg-[#EEEEEE] transition-colors duration-150"
              onClick={() => {
                const id = userId + person._id;
                navigate(`/home/${id}/chat`, {
                  state: { buyerId: userId, sellerId: person._id },
                });
              }}
            >
              <div className="w-16 h-16 bg-[#000000] text-white flex items-center justify-center font-light text-xl">
                {person.fname[0]?.toUpperCase() || "U"}
              </div>
              <div className="ml-4">
                <p className="text-lg font-light">{person.fname}</p>
                <p className="text-sm text-[#393E46]">Tap to view conversation</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inbox
