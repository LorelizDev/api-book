import { DataTypes } from "sequelize";
import conection_db from "../database/conectionDB.js";

const bookModel = conection_db.define(
  'Book',
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

  },
  {
    // Other model options go here
    timestamps: false,
  },
);

// `sequelize.define` also returns the model
console.log(bookModel === conection_db.models.Book); // true
export default bookModel;