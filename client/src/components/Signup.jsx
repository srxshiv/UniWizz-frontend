import React from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";
import axios from "axios";
import { passwordValidation, usernameValidation } from "../utils/zodvalidation";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/loginState";
import TextField from '@mui/material/TextField';


function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(false);

  const setLogin = useSetRecoilState(loginState);

  async function submitSignup(event) {
    event.preventDefault();
    if(!email.endsWith("@muj.manipal.edu")) {
      setEmail("");
      return alert("Please enter a valid MUJ email address ending with @muj.manipal.edu");
    }

    if (!usernameValidation.safeParse(username).success) {
      setUsername("");
      return alert("Username should be between 4-30 characters");
    }
    if (!passwordValidation.safeParse(password).success) {
      setPassword("");
      return alert("Password should be between 6-16 characters");
    }
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return alert("Passwords do not match");
    }

    const body = { username, fname, lname, email, contact, password, college, anonymous };
    setLoading(true);

    try {
      const response = await axios.post(`${base_url}/user/signup`, body);
      if (response.status === 200) {
        localStorage.setItem("verification-email", email);
        localStorage.setItem("fname", fname);
        navigate("/verification");
        setLogin((prevState) => ({ ...prevState, _id: response.data._id }));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Unexpected Error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Effect */}
        <div className="bg-white/30 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/40">
          <h2 className="text-3xl font-thin text-black text-center mb-6">
            Create Account
          </h2>
          <form onSubmit={submitSignup} className="space-y-4">
              <TextField
                variant ="standard"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
              <div className="flex gap-4">
              <TextField
              variant="standard"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                label = "First Name"
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
              <TextField
              variant="standard"
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                label="Last Name"
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
              </div>
            <TextField
            variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email @muj.manipal.edu"
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <TextField
             variant="standard"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              label="Contact Number"
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            >
              <option value="">Select College</option>
              <option value="Manipal University Jaipur">
                Manipal University Jaipur
              </option>
            </select>
            <TextField
            variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <TextField
            variant="standard"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 accent-pink-500 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Want to be anonymous?</span>
            </label>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-thin"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full text-black py-3 rounded-lg hover:underline transition-all duration-200"
            >
              Already have an account? Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
