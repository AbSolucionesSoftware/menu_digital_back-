var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 4);
const { Schema, model } = mongoose;

const cuponesShema = new Schema(
    {
        idCompany: {
            type: Schema.ObjectId,
            ref: 'company'
        },
        couponName: String,
        couponLimitado: Boolean, //Para saber que tipo de boton es
        discountCoupon: String,
        expirationDate: String,
        activeCoupon: Boolean,
        productosId: [],
        limitCompra: String //Para acomodar si quiere bajar precio en vez de porciento
    },{
        timestamps: true
    }
)
    

    // pedidoShema.plugin(mongoosePaginate);

module.exports = model('cupones', cuponesShema);