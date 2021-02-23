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
        type: Boolean
    },
    {
        timestamps: true
    }
)

module.exports = model('company',companySchema);