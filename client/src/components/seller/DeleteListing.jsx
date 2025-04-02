import axios from "axios";
import React from "react";
import { base_url } from "../../App";

function DeleteListing(props) {
    const { id } = props;
    const token = localStorage.getItem("unikart-auth");
    const [error, setError] = React.useState(null);

    const deleteListing = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete this listing?");
        if (!userConfirmed) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const response = await axios.delete(`${base_url}/seller/listings/${id}`, config);
            alert(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete the listing.");
        }
    };

    return (
        <div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
                onClick={deleteListing}
                className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Delete Listing
            </button>
        </div>
    );
}

export default DeleteListing;
