import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js", // Update to correct path if the schema is in the utils folder
  dbCredentials: {
    url: "postgresql://interviewdb_owner:VUrQ03YsDGEM@ep-shrill-glade-a50r10t9.us-east-2.aws.neon.tech/interviewdb?sslmode=require",
  },
});
