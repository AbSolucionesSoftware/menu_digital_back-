const { Schema, model } = require('mongoose');


const companySchema = new Schema(
    {
        nameCompany: String,
        nameUser: {
            type: String,
            unique: true
        },
        public: Boolean,
        owner: String,
        phone: String,
        password: String,
        type: Boolean,
        slug: {
            type: String,
            unique: true
        },
        logoImagenKey: String,
        logoImagenUrl: String,
        priceEnvio: String
    },
    {
        timestamps: true
    }
)

module.exports = model('company',companySchema);