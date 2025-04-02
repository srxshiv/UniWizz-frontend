import React, { useEffect } from "react";
import useListings from "../utils/useListings";
import { useRecoilValue } from "recoil";
import { listingState } from "../store/listingState";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "./WelcomeSection";

function Home() {
  const listingsObject = useRecoilValue(listingState);
  const navigate = useNavigate();

  const [page, setPage] = React.useState("1");
  const [limit, setLimit] = React.useState("15");
  const [category, setCategory] = React.useState("All");

  const listings = listingsObject.listings;
  const listingPages = listingsObject.pages;

  useListings(page, limit, category);

  React.useEffect(() => {
    setTimeout(() => {
      const section = document.getElementById("mainhome");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, [category]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  if (listingsObject.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-grey-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full">
        <div >
        <WelcomeSection listings={listings} />
        </div>
        <div className="flex flex-col md:flex-row max-w-8xl">
          {/* Sidebar */}
          <div className="w-full md:w-64 mt-12 p-4 top-16 h-auto md:h-screen pl-8 pt-8 flex flex-col md:block bg-white shadow-md md:shadow-none">
            <div className="mb-4 flex flex-wrap md:block">
              <label className="text-sm w-full">Category: </label>
              <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 flex-wrap">
                {["All", "Electronics", "Books", "Stationary", "Furniture", "Service", "Food", "Misc"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      type="radio"
                      id={item}
                      name="category"
                      value={item}
                      checked={category === item}
                      onChange={handleCategoryChange}
                      className="mr-2 accent-pink-500"
                    />
                    <label htmlFor={item} className="text-sm">{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4 flex md:block">
              <label className="text-sm w-full">Listings: </label>
              <select
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full border bg-transparent px-2 py-1 focus:outline-none focus:ring-0 transition-all duration-300"
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="75">75</option>
              </select>
            </div>
            <div className="mt-4 flex justify-center md:hidden">
              <div className="flex space-x-2">
                {Array.from({ length: listingPages }, (_, index) => (
                  <span
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`cursor-pointer px-2 ${page === `${index + 1}` ? "underline" : ""}`}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>


          {/* Main content */}
          <section id="mainhome" className="flex-1 min-h-screen bg-transparent px-4 py-20 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="hidden md:flex mb-6 text-black text-base">
              {Array.from({ length: listingPages }, (_, index) => (
                <span
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`cursor-pointer px-2 ${page === `${index + 1}` ? "underline" : ""}`}
                >
                  {index + 1}
                </span>
              ))}
            </div>

            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl text-black mb-8">Available Listings</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((listing, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
                  >
                    <img
                      src={listing.images || "/default-image.png"}
                      alt={listing.name}
                      className="w-full h-80 object-contain"
                    />
                    <div className="p-6">
                      <h3 className="text-base text-black mb-2">{listing.name}</h3>
                      <p className="text-gray-700 mb-4 line-clamp-2 text-sm">{listing.description}</p>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">College</span>
                          <span className="text-black">{listing.sellerId?.college || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Seller</span>
                          <span className="text-black">{listing.sellerId?.username || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Category</span>
                          <span className="text-black">{listing.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl text-black">₹{listing.price}</span>
                        <button
                          onClick={() => navigate(`/home/${listing._id}`)}
                          className="bg-black text-white px-4 py-2 hover:bg-gray-500 transition-colors duration-300"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
