import "dotenv/config";
import postgres from 'postgres';

// Log the DATABASE_URL to ensure it's being loaded correctly


// Create a connection to the database using postgres
const sql = postgres(process.env.DATABASE_URL, {
  // Optional: Additional configuration options, such as SSL settings, query logging, etc.
  // ssl: { rejectUnauthorized: false }, // Example for SSL settings
});

// Export the connection instance
export default sql;