var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, model } = mongoose;

const pedidoShema = new Schema(
    {
        nombreCliente: String,
        tipoEnvio: String,
        calleNumero: String,
        colonia: String,
        telefono: String,
        estadoPedido: String,
        sucursal: String,
        cupon: String,
        idCompany: {
            type: Schema.ObjectId,
            ref: 'company'
        },
        pedido: [
            {
                nombre: String,
                precio: Float,
                notas: String,
                cantidad: String,
                clases: [{
                    nombre: String,
                    totalClasificacion: Float,
                    types:[{
                        name: String,
                        price: String
                    }]
                }]
            }
        ],
        totalPedido: Float
    },{
        timestamps: true
    }
    )
    
    // pedidoShema.plugin(mongoosePaginate);
    module.exports = model('pedido', pedidoShema);