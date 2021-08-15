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
        politicas: Boolean,
        slug: {
            type: String,
            unique: true
        },
        logoImagenKey: String,
        logoImagenUrl: String,
        priceEnvio: String,

        calleNumeroPrin: String,
        cpPrin: String,
        coloniaPrin: String,
        ciudadPrin: String,
        estado: String,
        
        sucursalesActive: Boolean, 
        sucursales: [
            {
                costoEnvio:  String,
                nombreSucursal: String,
                calleNumeroSucursal: String,
                coloniaSucursal: String,
                telefonoSucursal:String,
                ciudadSucursal: String,
                cpSucursal: String
            },
        ],
        redesSociales:{
            facebook: String,
            instagram: String,
            twiter: String
        },
        horariosActive: Boolean,
        horario:[{
            dia: String,
            key: Number,
            horarioInicial: String,
            horarioFinal: String,
            close: Boolean
        }],
    },
    {
        timestamps: true
    }
)

module.exports = model('company',companySchema);