const { Schema, model } = require('mongoose');

const bannerAdminSchema = new Schema(
    {
        imgBannerAdminKey: String,
        imgBannerAdminUrl: String,
        frente: Boolean,
        company: {
            type: Schema.ObjectId,
            ref: 'company'
        },
        empresaAsociada: String
    },
    {
        timestamps: true
    }
)

module.exports = model('bannerAdmin', bannerAdminSchema);