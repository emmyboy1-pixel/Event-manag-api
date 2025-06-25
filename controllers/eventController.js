import { Event, User } from "../models/index.js";

export const createEvent = async (req, res) => {
  const { name, date, time, location, description } = req.body;

  try {
    const newEvent = await Event.create({
      name,
      date,
      time,
      location,
      description,
      organizerId: req.userId,
    });

    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ include: User });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch events", error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: User });
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch event", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { name, date, time, location, description } = req.body;

  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizerId !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await event.update({ name, date, time, location, description });
    res.json({ message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizerId !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

export const searchEvents = async (req, res) => {
  const { date, location } = req.query;

  try {
    const events = await Event.findAll({
      where: {
        ...(date && { date }),
        ...(location && { location }),
      },
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
}