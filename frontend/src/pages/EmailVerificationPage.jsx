import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, isLoading, error } = useAuthStore()


  const handleChange = (index, value) => {
    const newCode = [...code];

    // handle pasted code
    if (value.length > 1) {
      const pasteCode = value.slice(0, 6).split("");
      for (let i = 0; i < pasteCode.length; i++) {
        newCode[i] = pasteCode[i] || "";
      }
      setCode(newCode);

      // handle the other inputs if pasted code in not complete
      const lastFilledInputIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledInputIndex < 5 ? lastFilledInputIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // focus next input
      if(value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
   try {
    await verifyEmail(verificationCode)
    navigate("/")
    toast.success("Email verified successfully")
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.message || "Error verifying email")
   }
  };

  // auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    } 
  }, [code])
  
  return (
    <div className="max-w-md w-full bg-gray-800 opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 opacity-50  backdrop-blur-xl rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-transparent bg-gradient-to-r from-green-300  to-emerald-500 bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Enter the six digit verification code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6" >
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-white bg-gray-700 border-2 border-gray-700 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit === "")}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200 ease-in-out cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </motion.button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
