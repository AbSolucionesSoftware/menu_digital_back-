const typeCtrl = {};
const Type = require("../models/typeClassification");

typeCtrl.createType = async (req,res) => {
    try {
        const typeModel = new Type(req.body);
        await typeModel.save();
        res.status(200).json({message: "Tipo agregado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

typeCtrl.getType = async (req,res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

typeCtrl.updateType = async (req,res) => {
    try {
        await Type.findByIdAndUpdate(req.params.idType, req.body);
        res.status(200).json({message: "Editado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

typeCtrl.deleteType = async (req,res) => {
    try {
        await Type.findByIdAndDelete(req.params.idType);
        res.status(200).json({message: "Eliminado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

module.exports = typeCtrl;