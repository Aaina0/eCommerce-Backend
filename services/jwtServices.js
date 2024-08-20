import jwt from "jsonwebtoken";
import Token from "../model/token.model.js";
import { AccessSecretToken, RefreshSecretToken } from "../config/config.js";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, AccessSecretToken, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, RefreshSecretToken, {
    expiresIn: "7d",
  });
};

const decodeAccessToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, AccessSecretToken);
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
};

const decodeRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, RefreshSecretToken);
  } catch (error) {
    console.error("Error decoding refresh token:", error);
    return null;
  }
};

const storeTokenInDb = async (refreshToken, userId) => {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const existingToken = await Token.findOne({ user: userId });

    if (existingToken) {
      // Update the existing token
      existingToken.refreshToken = refreshToken;
      existingToken.expiresAt = expiresAt;
      await existingToken.save();
      return existingToken;
    } else {
      // Create a new token
      const newToken = new Token({
        refreshToken,
        user: userId,
        expiresAt,
      });
      await newToken.save();
      return newToken;
    }
  } catch (error) {
    console.error("Error while storing token in database:", error);
    return null;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  decodeAccessToken,
  decodeRefreshToken,
  storeTokenInDb,
};
