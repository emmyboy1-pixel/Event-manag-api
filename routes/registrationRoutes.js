import express from "express";
import {
  registerForEvent,
  cancelRegistration
} from "../controllers/registrationController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected: Register/cancel
router.post("/events/:eventId/register", authMiddleware, registerForEvent);
router.delete("/events/:eventId/cancel", authMiddleware, cancelRegistration);

export default router;