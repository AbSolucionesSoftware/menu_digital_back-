const { Schema, model } = require('mongoose');

const classification = new Schema(
    {
        idCompany: {
            type: Schema.ObjectId,
            ref: 'company'
        },
        type: String,
        types: [
            {
                name: String,
                precio: String,
                color: String
            }
        ]

    },
    {
        timestamps: true,
    }
);


module.exports = model("classification",classification);
