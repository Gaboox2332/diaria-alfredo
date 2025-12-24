const { createClient } = require("@libsql/client");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("TURSO_DATABASE_URL is not defined in .env");
  // For safety in dev without .env, maybe fallback to local file if supported by client?
  // But LibSQL client local file support is via 'file:' protocol.
  // We will assume environment variables are set or will be set.
}

const db = createClient({
  url: url || "file:local.db", // Fallback for local dev if needed, or expected to fail if empty
  authToken: authToken,
});

module.exports = db;
