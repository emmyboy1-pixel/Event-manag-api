import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvents
} from "../controllers/eventController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllEvents);
router.get("/search", searchEvents); // ?date=2025-06-30&location=lagos
router.get("/:id", getEventById);

// Protected (organizer)
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;