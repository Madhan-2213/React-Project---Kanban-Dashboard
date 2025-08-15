import React, { useState, useEffect } from "react";

const Settings = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  confirmPassword: "",
    profilePic: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        username: storedUser.username || "",
        email: storedUser.email || "",
        oldPassword: "",
  newPassword: "",
  confirmPassword: "",
        profilePic: storedUser.profilePic || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.password !== user.oldPassword) {
      alert("Incorrect old password!");
      return;
    }

    if (user.newPassword && user.newPassword !== user.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const updatedUser = {
      ...storedUser,
      username: user.username,
      email: user.email,
      password: user.newPassword ? user.newPassword : storedUser.password,
      profilePic: user.profilePic || storedUser.profilePic,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile settings updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={user.oldPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {user.profilePic && (
            <img src={user.profilePic} alt="Profile" className="mt-3 w-20 h-20 rounded-full object-cover border border-gray-300" />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
