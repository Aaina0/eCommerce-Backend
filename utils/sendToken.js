import { nodeEnv } from "../config/config.js";
import {
  generateAccessToken,
  generateRefreshToken,
  storeTokenInDb,
} from "../services/jwtServices.js";

const sendToken = async (user, res, message, statusCode) => {
  try {
    if (!user._id) throw new Error("User not Found");

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token in the database
    await storeTokenInDb(refreshToken, user._id);

    // Set cookies with tokens
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: 5 * 60 * 60 * 1000, // 5 hours
      sameSite: "Strict", // or 'Lax', based on your needs
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "Strict", // or 'Lax', based on your needs
    });

    // Send response
    res.status(statusCode).json({
      success: true,
      message: message,
    });
  } catch (error) {
    console.error("Error in sendToken function:", error); // More detailed logging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default sendToken;
