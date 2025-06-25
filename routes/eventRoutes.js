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
router.get("/search", searchEvents); 
router.get("/:id", getEventById);

// Protected (organizer) can only be accessed by authenticated users who are organizers
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;