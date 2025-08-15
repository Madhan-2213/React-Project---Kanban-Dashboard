import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import { auth, googleProvider, githubProvider, signInWithPopup } from './firebase';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const handleOAuthSignup = async (provider) => {
    try {
      const prov = provider === 'google' ? googleProvider : githubProvider;
  const result = await signInWithPopup(auth, prov);
      const user = result.user;
      const name = user.displayName || 'User';
      const emailAddr = user.email || '';

      localStorage.setItem('users', JSON.stringify([...(JSON.parse(localStorage.getItem('users'))||[]), { name, email: emailAddr, password: '' }]));
      localStorage.setItem('userData', JSON.stringify({ fullName: name, username: name, email: emailAddr }));

  setPopupMessage(`✅ ${name}, your account has been created!`);
  setTimeout(() => navigate('/dashboard'), 1200);
    } catch (e) {
      console.error(e);
      setPopupMessage('❌ Signup with provider failed.');
      setTimeout(() => setPopupMessage(''), 2000);
    }
  };

  const handleSignup = () => {
    if (!name || !email || !password) {
      setPopupMessage("⚠️ Please fill all fields!");
      setTimeout(() => setPopupMessage(""), 2000);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isEmailTaken = existingUsers.some((user) => user.email === email);

    if (isEmailTaken) {
      setPopupMessage("⚠️ Email already registered! Please log in.");
    } else {
      const newUser = { name, email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

  setPopupMessage(`✅ ${name}, your account has been created!`);
  setTimeout(() => navigate("/login"), 1500);
      
      setName("");
      setEmail("");
      setPassword("");
    }

    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

      <div className="flex justify-center mb-4">
  <button className="flex items-center justify-center w-1/2 p-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleOAuthSignup('google')}>
          <FaGoogle className="mr-2" /> Google
        </button>
  <button className="flex items-center justify-center w-1/2 p-2 bg-gray-800 text-white rounded hover:bg-gray-900" onClick={() => handleOAuthSignup('github')}>
          <FaGithub className="mr-2" /> GitHub
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSignup}>Sign Up</button>

      {popupMessage && <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded">{popupMessage}</div>}
    </div>
  );
}
