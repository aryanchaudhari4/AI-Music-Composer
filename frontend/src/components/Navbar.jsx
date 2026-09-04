import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
        🎵 AI Music Composer
      </h1>
      <div className="flex space-x-8 text-lg">
        <Link to="/" className="hover:text-pink-400 transition">Home</Link>
        <Link to="/login" className="hover:text-pink-400 transition">Login</Link>
        <Link to="/dashboard" className="hover:text-pink-400 transition">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
