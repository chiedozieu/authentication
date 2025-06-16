import { motion } from "framer-motion";
import React from "react";
import { useAuthStore } from "../store/authStore";
import { formatJoinDate } from "../utils/dates/FormatDate";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full h-screen">
      <Link
        to="/"
        className=" flex justify-end p-4 text-white font-semibold mb-32"
      >
        Home
      </Link>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400  to-emerald-600 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <div className="space-y-6">
          <motion.div
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-400 mb-3 ">
              Profile Information
            </h3>
            <p className="text-gray-400">Name: {user?.name}</p>
            <p className="text-gray-400">Email: {user?.email}</p>
          </motion.div>
          <motion.div
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-400 mb-3 ">
              Account Activity
            </h3>
            <p className="text-gray-400">
              Date Joined: {formatJoinDate(user?.createdAt)}
            </p>
            <p className="text-gray-400">
              Last Login: {formatJoinDate(user?.lastLogin)}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
