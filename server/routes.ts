import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { slotCounterSchema, insertWaitlistSchema } from "@shared/schema";
import rateLimit from "express-rate-limit";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/slots", async (_req, res) => {
    try {
      const slots = await storage.getSlotCounter();
      res.json(slots);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch slot counter" });
    }
  });

  app.post("/api/slots", async (req, res) => {
    try {
      const validation = slotCounterSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ error: "Invalid slot data", details: validation.error });
      }

      const updatedSlots = await storage.updateSlotCounter(validation.data);
      res.json(updatedSlots);
    } catch (error) {
      res.status(500).json({ error: "Failed to update slot counter" });
    }
  });

  const waitlistLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 waitlist requests per `window` (here, per hour)
    message: "Too many requests from this IP, please try again after an hour",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  app.post("/api/waitlist", waitlistLimiter, async (req, res) => {
    try {
      const validation = insertWaitlistSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ error: "Invalid email", details: validation.error });
      }

      const entry = await storage.addToWaitlist(validation.data);
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
