const productCtrl = {};
const upliadImagen = require('../middleware/awsFile');
const modelProduct = require('../models/Product');

productCtrl.uploadImagen = async (req, res, next) => {
    await upliadImagen.upload(req, res, function (err) {
      if (err) {
        res.json({ message: err });
      }
      return next();
    });
};

productCtrl.createProduct = async (req,res) => {
    try {
        /* const { category, subCategory, name, price, description } = req.body; */
        const newProduct = new modelProduct(req.body);
        if(req.file){
            newProduct.imagenProductKey = req.file.key;
            newProduct.imagenProductUrl = req.file.location;
            newProduct.company = req.params.idCompany;
            await newProduct.save();
            res.status(200).json({message: "Producto agregado"})
        }else{
            res.status(505).json({message: "Imagen necesaria."})
        }
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}


productCtrl.editProduct = async (req,res) => {
    try {
        /* const { category, subCategory, name, price, description } = req.body; */
        const newProduct = req.body;
        const productBase = await modelProduct.findById(req.params.idProducto);
        if(req.file){
            if(productBase.imagenProductKey){
                upliadImagen.eliminarImagen(productBase.imagenProductKey);
            }
            newProduct.imagenProductKey = req.file.key;
            newProduct.imagenProductUrl = req.file.location;
        }else{
            newProduct.imagenProductKey = productBase.imagenProductKey;
            newProduct.imagenProductUrl = productBase.imagenProductKey;
        }
        await modelProduct.findByIdAndUpdate(req.params.idProducto,newProduct);
        res.status(200).json({message: "Producto actualizado."})
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.deleteProduct = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.getProductCompany = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

module.exports = productCtrl;