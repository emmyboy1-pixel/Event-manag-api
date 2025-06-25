import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/Dbconfig.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import { startReminderJob } from "./cron/reminderjob.js";

// Start scheduled reminder job
startReminderJob();

dotenv.config();
const app = express();
app.use(express.json());

// API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", registrationRoutes); 

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API");
});
// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});