import User from "./userModel.js";
import Event from "./EventModel.js";
import Registration from "./registrationModel.js";

// A User (organizer) can create many Events
User.hasMany(Event, { foreignKey: "organizerId", as: "organizedEvents" });
Event.belongsTo(User, { foreignKey: "organizerId", as: "organizer" });

// A User can register for many Events (and vice versa)
User.belongsToMany(Event, {
  through: Registration,
  foreignKey: "userId",
  as: "registeredEvents",
});
Event.belongsToMany(User, {
  through: Registration,
  foreignKey: "eventId",
  as: "attendees",
});

export { User, Event, Registration };