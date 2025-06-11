import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";




export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const pass = String(password);
    const hashedPassword = bcryptjs.hashSync(pass, 10);

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 10 * 60 * 1000,  // 10 minutes
    });
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    if (user) {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          ...user._doc,
          password: undefined
        },

      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
export const login = async (req, res) => {};


// logout
export const logout = async (req, res) => {};
