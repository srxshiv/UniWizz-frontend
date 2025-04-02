import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function submitLogin(event) {
    setLoading(true);
    event.preventDefault();
    const body = { email, password };

    try {
      const response = await axios.post(`${base_url}/user/login`, body);
      if (response.status === 200) {
        localStorage.setItem("unikart-auth", response.data.token);
        navigate("/home");
      } else if (response.status === 411) {
        alert("Wrong credentials");
      } else if (response.status === 403) {
        alert("You are not verified");
      } else if (response.status === 404) {
        alert("User not found");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Some error occurred");
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
            Login
          </h2>
          <form onSubmit={submitLogin} className="space-y-6">
            <div>
              <TextField
              variant="standard"
                type="text"
                value={email}
                onChange={handleEmail}
                label="Email address / Username"
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
            </div>
            <div>
              <TextField
              variant="standard"
                type="password"
                value={password}
                onChange={handlePassword}
                label="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-thin"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/forgot-password")}
              className="w-full text-black py-3 rounded-lg hover:underline transition-all duration-200"
            >
              Forgot Password?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
