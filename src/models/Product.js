var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        category: String,
        subCategory: String,
        name: String,
        imagenProductKey: String,
        imagenProductUrl: String,
        price: Float,
        description: String,
        company: {
            type: Schema.ObjectId,
            ref: 'company'
        },
        extrasActive: Boolean,
        extras: String,
        precioExtra: Float,
    },
    {
        timestamps: true
    }
)

module.exports = model('product', productSchema);