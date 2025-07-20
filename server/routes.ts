import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertUploadSchema } from "@shared/schema";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload endpoint for bakkie image and logo
  app.post("/api/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      };

      const validatedData = insertUploadSchema.parse(uploadData);
      const upload = await storage.createUpload(validatedData);

      res.json({
        id: upload.id,
        filename: upload.filename,
        originalName: upload.originalName,
        url: `/api/uploads/${upload.filename}`
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Serve uploaded files
  app.get("/api/uploads/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const upload = await storage.getUploadByFilename(filename);
      
      if (!upload) {
        return res.status(404).json({ message: "File not found" });
      }

      const filePath = path.join(uploadsDir, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found on disk" });
      }

      res.setHeader('Content-Type', upload.mimetype);
      res.sendFile(filePath);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
