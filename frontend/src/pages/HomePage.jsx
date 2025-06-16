import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async ()=> {
    try {
      await logout()
      toast.success("Logout successful")
    } catch (error) {
      toast.error("Error logging out")
    }
  }


  return (
    <div className="h-screen w-full">
      <nav>
        {isAuthenticated  ? (
          <div className="flex justify-end  p-4 text-white font-semibold gap-2 cursor-pointer">
            <Link to={`/dashboard/${user?._id}`} className="hover:underline">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="hover:underline cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-end  p-4 text-white font-semibold gap-2">
           
            <Link to="/login" className="hover:underline cursor-pointer">
              Login
            </Link>
            <Link to="/signup" className="hover:underline cursor-pointer">
              Signup
            </Link>
          </div>
        )}
      </nav>
      <div className="flex items-center justify-center h-full text-2xl font-bold text-white">Home</div>
    </div>
  );
};

export default HomePage;
