const pedidoCtrl = {};
const modelPedido = require('../models/Pedido');
var Mongoose = require('mongoose');
// var ObjectId = Mongoose.Types.ObjectId;


pedidoCtrl.createPedido = async (req,res) => {
    try {
        const newPedido = new modelPedido(req.body);

        newPedido.idCompany = req.params.idCompany;
        newPedido.pedido = req.body.pedido;

        await newPedido.save((err, response) => {
            if (err) {
                res.status(500).json({ message: 'Ups, also paso en la base', err });
            } else {
                if (!response) {
                    res.status(404).json({ message: 'Ese pedido no existe' });
                } else {
                    res.status(200).json({ message: 'Pedido agregado', pedido: response });
                }
            }
        });

    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

pedidoCtrl.getPedidos = async (req,res) => {
    try {
        // const { page = 1, limit = 10 } = req.query;
		// const options = {
		// 	page,
		// 	limit: parseInt(limit)
		// };

        const pedidosCompany = await modelPedido.find({idCompany: req.params.idCompany});
        // await modelPedido.paginate(pedidosCompany, options, (err, postStored) => {
		// 	if (err) {
        //         res.status(500).json({ message: "Error en el servidor primeras lineas",err });
        //     } else {
        //         if (!postStored) {
        //             res.status(400).json({ message: "Error al mostrar pedidos" })
        //         } else {
        //             // const pedidosCompany =  modelPedido.find({idCompany: req.params.idCompany});
        //             res.status(200).json(postStored);
        //         }

        //     }
		// });
        res.status(200).json(pedidosCompany);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

pedidoCtrl.updateEstado = async (req,res) => {
    try {
        const { estadoPedido } = req.body;
        await modelPedido.findByIdAndUpdate(req.params.idPedido, {estadoPedido: estadoPedido});
        res.status(200).json({message: "Pedido Actualizado."});
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

module.exports = pedidoCtrl;