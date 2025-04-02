import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";
import { useRecoilValue } from "recoil";
import { loginState } from "../store/loginState";

function Verification() {
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState('');
    const email = localStorage.getItem('verification-email');
    const fname = localStorage.getItem('fname');
    const [loading, setLoading] = React.useState(false);
    const [cooldown , setCooldown] = React.useState(0)

    React.useEffect(() => {
        if (cooldown>0) {
            const timer = setTimeout(() => setCooldown((cooldown)=> cooldown-1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const login = useRecoilValue(loginState)
    const bodySent = {id: login._id , email : ""}

    const handleChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSubmit = async () => {
        if(!otp){
            alert("please enter otp")
            return;
        }

        setLoading(true);

        const body = {
            verificationCode: otp,
            email,
            fname
        };

        try {
            const response = await axios.post(`${base_url}/user/verification`, body);
            if (response.status === 200) {
                localStorage.setItem('unikart-auth', `${response.data.token}`);
                localStorage.removeItem('verification-email');
                localStorage.removeItem('fname');
                navigate('/home');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    async function handleResend(){
        setCooldown(60)
        try{
            const response = await axios.post(`${base_url}/user/resend-verification/` , bodySent)
            if (response.status===200){
                alert(response.data.message || "code resent sucessfully")
            }
        }catch(error){
            alert(error.response.data.message || "unexpted error occured")
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
                    <h2 className="text-3xl font-bold text-black text-center mb-8">
                        Verify Your Email
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Verification Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                                placeholder="Enter OTP"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium disabled:bg-gray-400"
                        >
                            Verify Email
                        </button>
                        <button
                            disabled = {cooldown>0}
                            onClick={handleResend}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium disabled:bg-gray-400"
                        >
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Code"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verification;
