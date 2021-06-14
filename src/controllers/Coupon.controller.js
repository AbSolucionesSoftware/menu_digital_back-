const couponCtrl = {};
const couponModel = require('../models/Cupones');
var Mongoose = require('mongoose');


couponCtrl.createCoupon = async (req,res) => {
    try {
        const newCoupon = new couponModel(req.body);

        newCoupon.idCompany = req.params.idCompany;
        newCoupon.activeCoupon = false;
        newCoupon.coupon = req.body.coupon;

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

module.exports = couponCtrl;
