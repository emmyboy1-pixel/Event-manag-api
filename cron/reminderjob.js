import cron from "node-cron";
import { Op } from "sequelize";
import { Event, User, Registration } from "../models/index.js";
import { sendEmail } from "../utils/emailservice.js";

const sendEventReminders = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const events = await Event.findAll({
      where: {
        date: {
          [Op.eq]: tomorrow.toISOString().split("T")[0],
        },
      },
      include: [
        {
          model: User,
          as: "attendees", // from Event.belongsToMany
          through: { attributes: [] }, // don't include junction table
        },
      ],
    });

    for (const event of events) {
      for (const attendee of event.attendees) {
        await sendEmail(
          attendee.email,
          `Reminder: ${event.name} is happening tomorrow`,
          `Hi ${attendee.name},\n\nThis is a reminder that the event "${event.name}" is happening tomorrow at ${event.time} in ${event.location}.\n\nSee you there!`
        );
      }
    }

    console.log("✅ Reminder emails sent for upcoming events.");
  } catch (error) {
    console.error("❌ Failed to send reminders:", error.message);
  }
};

// Run this every day at 8 AM
export const startReminderJob = () => {
  cron.schedule("0 8 * * *", sendEventReminders);
};