import React from "react";
import axios from "axios";
import { base_url } from "../../App";
import { useParams, useNavigate , useSearchParams} from "react-router-dom";

function UpdateListing() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("Misc");
  const [negotiable, setNegotiable] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const [searchParams] = useSearchParams();

  const public_id = searchParams.get('public_id')

  const token = localStorage.getItem("unikart-auth");
  
  React.useEffect(() => {
    async function getListing() {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          `${base_url}/user/listings/${params.id}`,
          config
        );
        if (response.status === 200) {
          setName(response.data.name || "");
          setDescription(response.data.description || "");
          setPrice(response.data.price || "");
          setCategory(response.data.category || "Misc");
          setNegotiable(response.data.negotiable || false);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch the listing");
      } finally {
        setLoading(false);
      }
    }
    getListing();
  }, [params.id, token]);

  const handleDelete = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      await axios.delete(`${base_url}/seller/listings/${params.id}?listingId=${params.id}&public_id=${public_id}`, config);
  
      // Navigate to the seller's home page after successful deletion
      navigate("/seller/home");
    } catch (error) {
      console.error("Error deleting listing:", error);
      setError("Failed to delete listing");
    }
  };

  const submitListing = async (event) => {
    event.preventDefault();
    const body = { name, description, price, category, negotiable };
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(
        `${base_url}/seller/listings/${params.id}`,
        body,
        config
      );
      if (response.status === 200) {
        navigate("/seller/home");
      }
    } catch (err) {
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
            Update Listing
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={submitListing} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Listing Name"
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#2D2D2D] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-all duration-200"
            >
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Food">Food</option>
              <option value="Service">Service</option>
              <option value="Stationary">Stationary</option>
              <option value="Furniture">Furniture</option>
              <option value="Misc">Misc</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
                className="w-4 h-4 text-[#FF9D23] border-[#2D2D2D] rounded focus:ring-[#FF9D23]"
              />
              <span className="text-[#000000]">Price is negotiable</span>
            </label>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#000000] text-white py-3 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200 font-medium"
              >
                Update Listing
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateListing;
