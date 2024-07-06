import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Task extends Model {}

Task.init({ 
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "task", // nom de la table
  timestamps: false, // desactiver les 'champs created_at' & 'updated_at'
});
