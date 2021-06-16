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
        public: Boolean,
        precioExtra: Float,

        codigoName: { 
            type: String,
            unique: true
        },
        // precioDescuento: String,

        classifications: [
            {
                typeClassification: String,
                amountClassification: Number,
                statusAmount: Boolean,
                _idClassification: String,
                types: [
                    {   
                        _idType: String,
                        name: String,
                        price: String,
                    }
                ]

            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = model('product', productSchema);