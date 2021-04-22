const { Schema, model } = require("mongoose");

const type = new Schema(
  {
    typeClassification: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("typeClassification", type);