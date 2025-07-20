import { users, uploads, type User, type InsertUser, type Upload, type InsertUpload } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createUpload(upload: InsertUpload): Promise<Upload>;
  getUpload(id: number): Promise<Upload | undefined>;
  getUploadByFilename(filename: string): Promise<Upload | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private uploads: Map<number, Upload>;
  private userCurrentId: number;
  private uploadCurrentId: number;

  constructor() {
    this.users = new Map();
    this.uploads = new Map();
    this.userCurrentId = 1;
    this.uploadCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createUpload(insertUpload: InsertUpload): Promise<Upload> {
    const id = this.uploadCurrentId++;
    const upload: Upload = { 
      ...insertUpload, 
      id,
      uploadedAt: new Date()
    };
    this.uploads.set(id, upload);
    return upload;
  }

  async getUpload(id: number): Promise<Upload | undefined> {
    return this.uploads.get(id);
  }

  async getUploadByFilename(filename: string): Promise<Upload | undefined> {
    return Array.from(this.uploads.values()).find(
      (upload) => upload.filename === filename,
    );
  }
}

export const storage = new MemStorage();
