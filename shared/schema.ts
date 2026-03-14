import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const waitlist = pgTable("waitlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  recruiterCode: text("recruiter_code"),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).pick({
  email: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
  recruiterCode: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type WaitlistEntry = typeof waitlist.$inferSelect;

export interface SlotCounter {
  founderSlots: number;
  betaSlots: number;
}

export const slotCounterSchema = z.object({
  founderSlots: z.number().min(0).max(300),
  betaSlots: z.number().min(0).max(100),
});

export type SlotCounterUpdate = z.infer<typeof slotCounterSchema>;
