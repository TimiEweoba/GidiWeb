import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { slotCounterSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}
