import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import com1logo from './assest/com1logo.png';

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.fullName) {
      setFullName(storedUserData.fullName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setFullName("");
    setIsLoggedIn(false);
    navigate("/");
  };

  const triggerSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;
    // Prefer current dashboard route if on viewer dashboard
    const target = location.pathname.includes("viewerdashboard") ? "/viewerdashboard" : "/dashboard";
    navigate(`${target}?search=${encodeURIComponent(q)}`);
  };

  return (
    <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-gray-100">
      {isLoggedIn && (
        <>
          {/* Left: Brand */}
          <Link to="/" aria-label="Go to home" className="flex items-center">
            <img src={com1logo} alt="Zidio Logo" className="h-9 w-9 rounded cursor-pointer" />
          </Link>

          {/* Center: Nav (auto space, doesn’t affect edge alignment) */}
          <nav className="hidden md:flex items-center gap-6 mx-auto">
            <Link to="/dashboard" className="text-sm font-medium text-gray-200 hover:text-white">Dashboard</Link>
            <Link to="/report" className="text-sm font-medium text-gray-200 hover:text-white">Reports</Link>
            <Link to="/meetings" className="text-sm font-medium text-gray-200 hover:text-white">Meetings</Link>
            <Link to="/Communication1" className="text-sm font-medium text-gray-200 hover:text-white">Chat</Link>
          </nav>

          {/* Right: Search + User */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    triggerSearch();
                  }
                }}
                className="pl-9 pr-3 py-1.5 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
              <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>

            <div className="relative">
              <FaUserCircle
                className="text-3xl cursor-pointer text-gray-300 hover:text-white"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              />
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <div className="px-4 py-2 text-sm text-gray-600">Hi, {fullName}!</div>
                  <button className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50" onClick={() => navigate("/settings")}>
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Navbar;
