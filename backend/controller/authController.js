import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      return res.status(404).json({
        success: false,
        message: "Cannot find user with this email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExists.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const payload = {
      email: isUserExists.email,
      user_id: isUserExists._id,
      role: isUserExists.role,
      country: isUserExists.country,
      image: isUserExists.image,
      name: isUserExists.username
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", // Allow cross-origin cookies in production
    };
    

    const userDetails = {
      name: isUserExists.username,
      email: isUserExists.email,
      role: isUserExists.role,
      country: isUserExists.country,
      image: isUserExists.image
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login Successful",
      userDetails,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      return res.status(404).json({
        success: false,
        message: "Cannot find admin with this email",
      });
    }

    if (isUserExists.role !== "Admin" && isUserExists.role !== "Super Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Not an admin",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExists.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const payload = {
      email: isUserExists.email,
      user_id: isUserExists._id,
      role: isUserExists.role,
      country: isUserExists.country,
      image: isUserExists.image,
      name: isUserExists.username

    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    const adminDetails = {
      name: isUserExists.username,
      email: isUserExists.email,
      role: isUserExists.role,
      country: isUserExists.country,
      image: isUserExists.image
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Admin Login Successful",
      adminDetails,
    });
  } catch (error) {
    console.error("Admin Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Admin login failed. Please try again.",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both password do not match",
      });
    }

    const isAlreadyExitingUser = await User.findOne({ email });
    if (isAlreadyExitingUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userProfile = {
      username: name,
      email: email,
      password: hashedPassword,
      role: role,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
    };

    const newUser = new User(userProfile);
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to register. Kindly try again.",
      error: error.message,
    });
  }
};

export const verifyUser = async(req, res)=>{
  try {
    res.status(200).json({
      success: true,
      userDetails: req.user,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
