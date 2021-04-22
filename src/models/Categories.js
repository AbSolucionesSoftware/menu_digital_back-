const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    idCompany: {
      type: Schema.ObjectId,
      ref: 'company'
    },
    category: String,
    subCategories: [
      {
        subCategory: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("categorie", categorySchema);
