import { type User, type InsertUser, type SlotCounter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSlotCounter(): Promise<SlotCounter>;
  updateSlotCounter(slots: Partial<SlotCounter>): Promise<SlotCounter>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private slotCounter: SlotCounter;

  constructor() {
    this.users = new Map();
    this.slotCounter = {
      founderSlots: 247,
      betaSlots: 83,
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSlotCounter(): Promise<SlotCounter> {
    return { ...this.slotCounter };
  }

  async updateSlotCounter(slots: Partial<SlotCounter>): Promise<SlotCounter> {
    this.slotCounter = { ...this.slotCounter, ...slots };
    return { ...this.slotCounter };
  }
}

export const storage = new MemStorage();
