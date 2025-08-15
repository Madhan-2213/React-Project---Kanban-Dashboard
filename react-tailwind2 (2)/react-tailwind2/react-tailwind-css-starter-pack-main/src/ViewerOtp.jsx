import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

const ViewerOtp = ({ setIsVerified }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Generate OTP function
  const generateOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    setGeneratedOtp(otpCode);
    setOtpSent(true);
  };

  // Copy OTP to clipboard
  const copyOtp = () => {
    if (generatedOtp) {
      navigator.clipboard.writeText(generatedOtp.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Validate OTP and proceed to dashboard
  const handleOTPSubmit = () => {
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.trim() === generatedOtp?.toString()) {
      localStorage.setItem("isVerified", "true");
      setIsVerified(true);
      navigate("/viewerdashboard"); // ✅ Navigates to dashboard on successful OTP verification
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">OTP Verification</h2>

        {!otpSent ? (
          <>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}
            <button 
              onClick={generateOtp} 
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Get OTP
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 text-center">OTP sent to: <strong>{mobile}</strong></p>

            <div className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded-lg mt-4">
              <p className="font-semibold">{generatedOtp}</p>
              <FaCopy className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={copyOtp} title="Copy OTP" />
            </div>
            {copied && <p className="text-green-500 text-sm text-center mt-1">Copied!</p>}

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button 
              onClick={handleOTPSubmit} 
              className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewerOtp;
