import axios from "axios";
import React from "react";
import { base_url } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateListing() {

  const [loading , setLoading]= React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("Misc");
  const [negotiable, setNegotiable] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [error, setError] = React.useState("");
  const token = localStorage.getItem("unikart-auth");
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const submitListing = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!name || !description || !price) {
      setError("All fields except negotiable are required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("negotiable", negotiable);

    // Append selected images to the form data
    Array.from(selectedFiles).forEach((file) =>
      formData.append("images", file)
    );

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${base_url}/seller/create-listing`,
        formData,
        config
      );
      console.log(response.data)
      if (response.status === 200) {
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Misc");
        setNegotiable(false);
        setLoading(false)
        setSelectedFiles([]);
        setError("");
        navigate("/seller/home");
      }
    } catch (err) {
      console.log(err)
      setError(err || "Something went wrong");
    }
  };

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-grey-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          Create Listing
        </h2>
        {error && (
          <div className="mb-6 p-4 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
              Listing Images
            </label>
            <input
              type="file"
              id="images"
              placeholder="Listing Images"
              accept="image/*"
              onChange={handleFileChange}
              name="images"
              multiple
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Listing Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Listing Name"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            >
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Stationary">Stationary</option>
              <option value="Furniture">Furniture</option>
              <option value="Service">Service</option>
              <option value="Food">Food</option>
              <option value="Misc">Misc</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={negotiable}
              onChange={(e) => setNegotiable(e.target.checked)}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <span className="text-gray-700">Price is negotiable</span>
          </div>

          <button
            onClick={submitListing}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
