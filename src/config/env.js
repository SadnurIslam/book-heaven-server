const dotenv = require("dotenv");

dotenv.config();

const parseIntSafe = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const mongoUri = process.env.MONGODB_URI;
const dbHost = process.env.DB_HOST;
const dbAppName = process.env.DB_APP_NAME || "Cluster0";

let dbUser;
let dbPassword;
if (!mongoUri) {
  dbUser = requireEnv("DB_USER");
  dbPassword = requireEnv("DB_PASSWORD");
  if (!dbHost) {
    throw new Error("Missing required environment variable: DB_HOST");
  }
}

const env = {
  port: parseIntSafe(process.env.PORT, 3000),
  mongoUri,
  dbUser,
  dbPassword,
  dbHost,
  dbAppName,
  dbName: process.env.DB_NAME || "booksDB",
  nodeEnv: process.env.NODE_ENV || "development",
};

module.exports = env;
