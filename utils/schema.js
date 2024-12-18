// schema.js
const { pgTable, serial, varchar, text } = require("drizzle-orm/pg-core");

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(), // Make sure to define a primary key if needed
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }).notNull(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});
