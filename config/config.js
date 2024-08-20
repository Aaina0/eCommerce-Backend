import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const apiUrl = process.env.API_URL;
const AccessSecretToken = process.env.ACCESS_TOKEN_SECRET;
const RefreshSecretToken = process.env.REFRESH_TOKEN_SECRET;
const nodeEnv = process.env.NODE_ENV || "development";

// console.log("Mongo URI:", mongoUri);
// console.log("API URL:", apiUrl);
// console.log("Access Secret Token:", AccessSecretToken);
// console.log("Refresh Secret Token:", RefreshSecretToken);
// console.log("Node Environment:", nodeEnv);

if (!mongoUri || !apiUrl) {
  throw new Error("Missing necessary environment variables");
}

export {
  mongoUri,
  PORT,
  apiUrl,
  AccessSecretToken,
  RefreshSecretToken,
  nodeEnv,
};
