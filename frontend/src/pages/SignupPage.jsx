import { motion } from "framer-motion";
import Input from "../components/Input";
import { Key, Loader, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import PasswordMeter from "../components/PasswordMeter";
import { useAuthStore } from "../store/authStore.js"
import toast from "react-hot-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const { signup, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password)
      navigate("/verify-email")
    } catch (error) {
      toast.error(error.response.data.message || "Error signing up")
      console.log(error)
    };
  };

  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-transparent bg-gradient-to-r from-green-400  to-emerald-500 bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Key}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordMeter password={password} />
          <motion.button
            className={`w-full mt-5 py-3 px-4 bg-gradient-to-r from-green-500  to-emerald-600 text-white font-semibold rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:from-green-500 hover:to-emerald-700 hover:scale-x-105 "}`}
            // whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <Loader className="animate-spin mx-auto"  size={24}/> : "Sign up"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">Already have an account? {" "} <Link to={"/login"} className="text-green-400 hover:underline">Login</Link> </p>
      </div>
     
    </motion.div>
  );
};

export default SignupPage;
