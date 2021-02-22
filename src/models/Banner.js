const { Schema, model } = require('mongoose');

const companySchema = new Schema(
    {
        imagenBannerKey: String,
        imagenBannerUrl: String,
        company: {
            type: Schema.ObjectId,
            ref: 'cliente'
        }
    },
    {
        timestamps: true
    }
)

model.exports = model('banner', companySchema);