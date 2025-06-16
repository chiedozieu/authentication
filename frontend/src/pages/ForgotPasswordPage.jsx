import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-800 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-green-400  to-emerald-600 bg-clip-text text-transparent ">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-8">
            <p className="text-gray-400 mb-6 text-center">
              Please enter your email address
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`w-full py-4 mt-6 bg-gradient-to-r from-green-400 to-emerald-600  text-white font-semibold rounded-lg ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-700 cursor-pointer"
              }`}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={24} />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="size-8 text-white" />
            </motion.div>

            <p className="text-gray-400 mb-6">
              If an account exists for {email}, you will receive an email with a
              link to reset your password.
            </p>
            <div className="px-8 py-4 bg-gray-900/50 flex justify-center rounded">
              <Link
                to="/login"
                className="hover:underline text-sm text-green-400 flex items-center"
              >
                <ArrowLeft className="size-4 mr-2" /> Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
