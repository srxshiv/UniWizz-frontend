import React from "react";
import useGigs from "../utils/useGigs";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { gigsState } from "../store/gigsState";
import { loginState } from "../store/loginState";

function Gig() {
  const gigsObj = useRecoilValue(gigsState);
  const navigate = useNavigate();
  const [page, setPage] = React.useState("1");
  const buyer = useRecoilValue(loginState);
  const buyerId = buyer._id;
  const [limit, setLimit] = React.useState("15");

  useGigs(page, limit);

  const gigs = gigsObj.gigs;
  const gigsPages = gigsObj.pages;

  if (gigsObj.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-gray-700 text-xl">Loading...</div>
      </div>
    );
  }

  if (gigsObj.gigs.length === 0) {
    return (
      <div className="flex flex-col md:flex-row">
        <div className="w-64 p-4 sticky top-0 h-screen">
          <div className="mb-4">
            <label className="text-sm">Gigs: </label>
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-0 transition-all duration-300"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
              <option value="75">75</option>
            </select>
          </div>
        </div>

        <div className="flex-1 min-h-screen px-4 py-20 sm:px-0 lg:px-8 bg-transparent">
          <div className="animate-pulse text-black text-lg">No Gigs Available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-8xl">
<div className="w-64 p-4 md:sticky md:top-16 md:h-screen pl-4 md:pl-8 md:pt-8">

        <div className="mb-4">
          <label className="text-sm">Gigs: </label>
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full border-none bg-transparent px-2 py-1 focus:outline-none focus:ring-0 transition-all duration-300"
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
            <option value="75">75</option>
          </select>
        </div>
      </div>

      <section id="mainGigs" className="flex-1 min-h-screen bg-transparent px-4 py-20 sm:px-0 lg:px-8 overflow-y-auto">
        <div className="mb-6 text-gray-700 text-lg flex justify-center space-x-2">
          {Array.from({ length: gigsPages }, (_, index) => (
            <span
              key={index}
              onClick={() => setPage(index + 1)}
              className={`cursor-pointer ${page === `${index + 1}` ? "font-bold" : ""} hover:text-gray-900 transition-colors duration-200`}
            >
              {index + 1}
            </span>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-700 mb-8 text-center">Available Gigs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-4">
            {gigs.map((gig, index) => (
              <div key={index} className="bg-white shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-6 flex flex-col justify-between h-full">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">{gig.name}</h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">{gig.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>College:</span>
                      <span className="text-gray-700">{gig.userId.college || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>For:</span>
                      <span className="text-gray-700">{gig.userId?.username || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto mb-4">
                    <span className="text-xl font-bold text-gray-700">Budget : ₹{gig.budget}</span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => alert(gig.userId.contact)}
                      className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all w-full"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/home/${buyerId + gig.userId._id}/chat`, {
                          state: { buyerId, sellerId: gig.userId._id },
                        })
                      }
                      className="bg-white text-gray-700 border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all w-full"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gig;
