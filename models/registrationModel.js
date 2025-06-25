import { DataTypes } from "sequelize";
import { sequelize } from "../config/Dbconfig.js";

const Registration = sequelize.define("Registration", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  eventId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Registration;