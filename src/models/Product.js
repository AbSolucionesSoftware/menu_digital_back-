const { Schema, model } = require('mongoose');


const productSchema = new Schema(
    {
        category: String,
        subCategory: String,
        name: String,
        imagen: String,
        price: String,
        description: String,
    },
    {
        timestamps: true
    }
)

model.exports = model('product', productSchema);