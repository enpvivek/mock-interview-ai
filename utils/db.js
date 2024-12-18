// db.js
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"; // Import schema

// Establish the connection to your Neon database
const sql = neon(process.env.NEXT_PUBLIC_NEON_DB_URL);

// Initialize Drizzle with the schema and the database connection
export const db = drizzle({
  client: sql,
  schema: schema.MockInterview, // Pass the schema here
});
