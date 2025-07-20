import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const uploads = pgTable("uploads", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUploadSchema = createInsertSchema(uploads).pick({
  filename: true,
  originalName: true,
  mimetype: true,
  size: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUpload = z.infer<typeof insertUploadSchema>;
export type Upload = typeof uploads.$inferSelect;
