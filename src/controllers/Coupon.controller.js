const couponCtrl = {};
const couponModel = require('../models/Cupones');
const modelProduct = require('../models/Product')
var Mongoose = require('mongoose');
const { fechaCaducidad, formatoFecha, fechaActual } = require('../middleware/reuser')

couponCtrl.createCoupon = async (req,res) => {
    try {
        const newCoupon = new couponModel(req.body);

        newCoupon.idCompany = req.params.idCompany;
        newCoupon.activeCoupon = true;
        newCoupon.couponLimitado = false;
        // newCoupon.coupon = req.body.coupon;

        await newCoupon.save((err, response) => {
            if (err) {
                res.status(500).json({ message: 'Ups, also paso en la base', err });
            } else {
                if (!response) {
                    res.status(404).json({ message: 'Ese cupon no existe' });
                } else {
                    res.status(200).json({ message: 'Cupon agregado', coupon: response });
                }
            }
        });
        
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
} //LISTO 

couponCtrl.getCoupons = async (req,res) => {
    try {
        const couponsCompany = await couponModel.find({idCompany: req.params.idCompany});

        for (let i = 0; i < couponsCompany.length; i++) {
            const productos = await modelProduct.find({idCoupon: couponsCompany[i]._id});
            await couponModel.findByIdAndUpdate(couponsCompany[i]._id, {productosId: productos});
        } 
        res.status(200).json(couponsCompany);

    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
} //LISTO 

couponCtrl.deleteCoupon = async (req,res) => {
    try {
        await couponModel.findByIdAndDelete(req.params.idCoupon);
        res.status(200).json({message: "Cupon eliminado correctamente"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}//LISTO

couponCtrl.editCoupon = async (req,res) => {
    try {
        await couponModel.findByIdAndUpdate(req.params.idCoupon, req.body);
        res.status(200).json({message: "Cupon Editado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
        
    }
} //LISTO

couponCtrl.activeCoupon = async (req,res) => {
    try {
        const { activeCoupon } = req.body;
        await couponModel.findByIdAndUpdate(req.params.idCoupon, {activeCoupon: activeCoupon});
        res.status(200).json({message: "Cupon Actualizado."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
} //LISTO

couponCtrl.verificarCuponCompra = async (req,res) => {
    try {
        const couponsCompany = await couponModel.find({idCompany: req.params.idCompany});

        couponsCompany.forEach(codigo => {
            if (codigo.couponName === req.params.nameCoupon ) {
                const expirationDate = (fechaCaducidad(codigo.expirationDate));

                var caducidad = new Date(expirationDate); //31 de diciembre de 2015
                var actual = new Date(fechaActual());

                if (codigo.activeCoupon === false) {
                    res.status(200).json({ message: 'Lo s   entimos este código ya expiro', valor: false });
                }else{
                    if (caducidad < actual) {
                        couponModel.findByIdAndUpdate(codigo._id, {activeCoupon: false});
                        res.status(200).json({ message: 'Lo sentimos este código ya expiro', valor: false });
                    }else{
                        res.status(200).json({ cupon: codigo, message: 'Codigo valido', valor: true });
                    }
                }
            }else{
               
            }
        })

    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
} //LISTO 

//RUTAS DE CUPOPNES LIMITADOS
couponCtrl. createCouponEspecial = async (req,res) => {
    try {
        const newCoupon = new couponModel(req.body);
        newCoupon.idCompany = req.params.idCompany;
        newCoupon.activeCoupon = true;
        newCoupon.couponLimitado = true;

        await newCoupon.save();

        const productos = req.body.productos;

        const editarProducto = {couponName: newCoupon.couponName, idCoupon: newCoupon._id};

        for (let i = 0; i < productos.length; i++) {
            await modelProduct.findByIdAndUpdate(productos[i]._id, editarProducto);
            
            // const productoElegido = await modelProduct.findById(productos[i]._id);
            // if (!productoElegido.couponName || productoElegido.couponName === "") {
            //     res.status(200).json({ message: 'Cupon agregado' });
            // }else{
            //     res.status(200).json({ message: 'Uno de tus productos ya tiene promoción' });
            //     return null;
            // }
        };
        res.status(200).json({ message: 'Cupon agregado' });

    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
} //LISTA NUEVO CUPON Y CONDICIONANDO LOS PRODUCTOS 

couponCtrl.getCouponEspecial = async (req,res) => {
    try {
        const productoElegido = await modelProduct.findById(req.params.idProducto).populate('idCoupon');

        const expirationDate = (fechaCaducidad(productoElegido.idCoupon.expirationDate));

        var caducidad = new Date(expirationDate); //31 de diciembre de 2015
        var actual = new Date(fechaActual());

        if (productoElegido.couponName && productoElegido.couponName === req.params.nameCoupon) {
            if (productoElegido.idCoupon.activeCoupon === false) {
                res.status(200).json({ message: 'Lo sentimos este código ya expiro', valor: false });
            }else{
                if (caducidad < actual) {
                    await couponModel.findByIdAndUpdate(productoElegido.idCoupon._id, {activeCoupon: false});
                    res.status(200).json({ message: 'Lo sentimos este código ya expiro', valor: false });
                }else{
                    res.status(200).json({ cuponDiscount: productoElegido.idCoupon.discountCoupon, codigo: productoElegido.idCoupon.couponName, message: 'Codigo valido', valor: true });
                }
            }
        }else{
            res.status(200).json({ message: 'Este producto no tiene este código activo', valor: false  });
        }
        
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
} //LISTO SOLO REVISAR QUE TODO GOOD

couponCtrl.deleteCouponEspecial = async (req,res) => {
    try {
        const consulta = {company: req.params.idCompany, idCoupon: req.params.idCoupon}
        const productCompany = await modelProduct.find(consulta);
        for (let i = 0; i < productCompany.length; i++) {
            await productCompany[i].updateOne({$unset: {"couponName":"", "idCoupon":""}})
        }
        await couponModel.findByIdAndDelete(req.params.idCoupon);
        res.status(200).json({message: "Cupon eliminado correctamente"});

    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}//LISTO TERMINADO

couponCtrl.editCouponEspecial = async (req,res) => {
    try {

        // const cuponElegido = await couponModel.findById(req.params.idCoupon);
        // await cuponElegido.updateOne({ $set: { productosId: [] }});

        const consulta = {company: req.params.idCompany, idCoupon: req.params.idCoupon}
        const productCompany = await modelProduct.find(consulta);
        for (let i = 0; i < productCompany.length; i++) {
            await productCompany[i].updateOne({$unset: {"couponName":"", "idCoupon":""}})
        }

        
        const productos = req.body.productos;
        // console.log(req.body.productos)
        const editarProducto = {couponName: req.body.couponName, idCoupon: req.params.idCoupon};
        for (let i = 0; i < productos.length; i++) {
            await modelProduct.findByIdAndUpdate(productos[i]._id, editarProducto);
        }
        await couponModel.findByIdAndUpdate(req.params.idCoupon, req.body);

        // for (let i = 0; i < productCompany.length; i++) {
        //     const idProducto = productCompany[i]._id;
        //      modelProduct.findByIdAndUpdate(idProducto, {couponName: req.body.couponName});
        // }

        
        res.status(200).json({message: "Cupon Editado"});

        // const consulta = {company: req.params.idCompany, idCoupon: req.params.idCoupon}
        // const productCompany = await modelProduct.find(consulta);

        // for (let i = 0; i < productCompany.length; i++) {
        //     const idProducto = productCompany[i]._id;
        //     await modelProduct.findByIdAndUpdate(idProducto, {couponName: req.body.couponName});
        // }
        // await couponModel.findByIdAndUpdate(req.params.idCoupon, req.body);

    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);  
    }
} //Listo



module.exports = couponCtrl;
