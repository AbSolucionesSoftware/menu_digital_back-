var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 4);
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, model } = mongoose;

const cuponesShema = new Schema(
    {
        idCompany: {
            type: Schema.ObjectId,
            ref: 'company'
        },
        couponName: { 
            type: String,
            unique: true
        },
        couponLimitado: Boolean,
        discountCoupon: String,
        expirationDate: String,
        activeCoupon: Boolean,
        limitCompra: String
    },{
        timestamps: true
    }
)
    
    // pedidoShema.plugin(mongoosePaginate);

module.exports = model('cupones', cuponesShema);