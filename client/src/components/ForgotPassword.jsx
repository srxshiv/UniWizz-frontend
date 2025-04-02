import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const body = { email, password, otp };

  const handleSendOtp = async () => {
    setCooldown(60);
    try {
      const response = await axios.post(`${base_url}/user/resend-verification/`, body);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Unexpected error occurred");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${base_url}/user/forgot-password`, body);
      alert(response.data.message);
      if (response.status === 200) navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
          <h2 className="text-3xl font-bold text-black text-center mb-8">Reset Password</h2>
          <div className="space-y-6">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              placeholder="Email / Username"
            />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              placeholder="Enter OTP"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
              placeholder="Enter New Password"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium disabled:bg-gray-400"
            >
              Submit
            </button>
            <button
              disabled={cooldown > 0}
              onClick={handleSendOtp}
              className={`w-full py-3 rounded-lg transition-colors duration-200 font-medium ${
                cooldown > 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#F93827] text-white hover:bg-red-600"
              }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Send Verification Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
