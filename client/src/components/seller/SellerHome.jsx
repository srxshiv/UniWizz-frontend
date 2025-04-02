import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../App";

function SellerHome() {
  const navigate = useNavigate();

  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");


  React.useEffect(() => {
    async function getUserListings() {
      const token = localStorage.getItem("unikart-auth");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };                   
      try {
        if (!token) return setError("Please login again");
        const response = await axios.get(`${base_url}/seller/listings`, config);
        if (response.status === 200) {
          setListings(response.data);
          setLoading(false);
        }
        if (response.status === 404) {
          setError("No listings found, create one now!");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again.");
      }
    }
    getUserListings();
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
            onClick={() => navigate("/seller/create-listing")}
            className="bg-[#000000] text-white px-6 py-3 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200 font-medium"
          >
            Create New Listing
          </button>
        </div>

        {error ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-zinc-600">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
            listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-[#2D2D2D]"
              >
                <img
                  src={listing.images || "/default-image.png"}
                  alt={listing.name}
                  className="w-full h-96 object-scale-down"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#000000] mb-2">
                    {listing.name}
                  </h3>
                  <p className="text-zinc-600 mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <button
                    onClick={() =>{
                      return navigate(`/seller/update-listing/${listing._id}?public_id=${[listing.public_id]}`)
                    }
                    }
                    className="w-full bg-[#000000] text-white py-2 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200"
                  >
                    Edit Listing
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

export default SellerHome;
