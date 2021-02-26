const { Schema, model } = require('mongoose');

const bannerSchema = new Schema(
    {
        imagenBannerKey: String,
        imagenBannerUrl: String,
        company: {
            type: Schema.ObjectId,
            ref: 'company'
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('banner', bannerSchema);