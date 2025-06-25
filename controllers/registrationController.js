import { Registration, Event } from "../models/index.js";

export const registerForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existing = await Registration.findOne({
      where: { userId: req.userId, eventId },
    });

    if (existing)
      return res.status(400).json({ message: "Already registered for this event" });

    await Registration.create({ userId: req.userId, eventId });
    res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const cancelRegistration = async (req, res) => {
  const { eventId } = req.params;

  try {
    const registration = await Registration.findOne({
      where: { userId: req.userId, eventId },
    });

    if (!registration)
      return res.status(404).json({ message: "Not registered for this event" });

    await registration.destroy();
    res.json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Cancellation failed", error: error.message });
  }
};