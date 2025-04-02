import React from "react";
import { base_url } from "../App";
import axios from "axios";
import { usernameValidation } from "../utils/zodvalidation";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [username, setUsername] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("unikart-auth");

  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };

  React.useEffect(() => {
    async function getUser() {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${base_url}/user/me`, config);
        if (response.status === 200) {
          setUsername(response.data.username || "");
          setEmail(response.data.email || "");
          setFname(response.data.fname || "");
          setLname(response.data.lname || "");
          setContact(response.data.contact || "");
          setCollege(response.data.college || "");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch the listing");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [token]);

  function isValidContact(contact) {
    return contact.length === 10;
  }

  async function submitUpdate(event) {
    event.preventDefault();
    if (!usernameValidation.safeParse(username).success) {
      setUsername("");
      return alert("Username should be between 4-30 characters");
    }
    if (newPassword !== confirmNewPassword) {
      alert("new password and confirm new password do not match");
      setConfirmNewPassword("");
      setNewPassword("");
      return;
    }
    if (!isValidContact(contact)) {
      alert("Please enter a valid Phone no. of 10 digits");
      return;
    }

    const body = {
      username,
      fname,
      lname,
      contact,
      password,
      newPassword
    };

    try {
      setLoading(true);
      const response = await axios.put(
        `${base_url}/user/updateprofile`,
        body,
        config
      );
      if (response.status === 200) {
        console.log(response.data.message);
        alert("Account updated successfully");
        setUsername(response.data.user.username);
        setFname(response.data.user.fname);
        setLname(response.data.user.lname);
        setEmail(response.data.user.email);
        setContact(response.data.user.contact);
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setCollege(response.data.user.college);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        alert("Username already exists.");
      }
      if (error.response && error.response.status === 401) {
        alert("Wrong password entered.");
      } else {
        alert(error.response?.data?.message || "Unexpected Error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this Account?")){
    const response = await axios.delete(`${base_url}/user/delete` ,config);
    if (response.status == 200) {
      alert(response.data.message);
      localStorage.removeItem('unikart-auth')
      navigate("/");
    } else {
      alert("user deletion failed");
      console.log(response.data);
    }
   }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-grey-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Update Account
          </h2>
          <form onSubmit={submitUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
            </div>
            <input
              disabled
              type="email"
              value={email}
              placeholder="Email @muj.manipal.edu"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact Number"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <input
              disabled
              value={college}
              placeholder="college"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Update Account
            </button>
          </form>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 mt-4 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
