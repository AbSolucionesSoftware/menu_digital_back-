const productCtrl = {};
const upliadImagen = require('../middleware/awsFile');
const modelProduct = require('../models/Product');
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;

productCtrl.uploadImagen = async (req, res, next) => {
    upliadImagen.upload(req, res, function (err) {
      if (err) {
        res.json({ message: err });
      }
      return next();
    });
};

productCtrl.createProduct = async (req,res) => {
    try {
        /* const { category, subCategory, name, price, description } = req.body; */
        console.log(req.body);
        const newProduct = new modelProduct(req.body);
        if(req.file){
            newProduct.imagenProductKey = req.file.key;
            newProduct.imagenProductUrl = req.file.location;
        }else{
            newProduct.imagenProductKey = "";
            newProduct.imagenProductUrl = "";
        }
        newProduct.company = req.params.idCompany;
        await newProduct.save();
        res.status(200).json({message: "Producto agregado"})
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
            newProduct.imagenProductUrl = productBase.imagenProductUrl;
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
        const productBase = await modelProduct.findById(req.params.idProducto);
        if(productBase){
            if(productBase.imagenProductKey){
                upliadImagen.eliminarImagen(productBase.imagenProductKey);
            }
            await modelProduct.findByIdAndDelete(req.params.idProducto);
            res.status(200).json({message: "Producto eliminado."});
        }else{
            res.status(404).json({message: "Este producto no existe."});
        }
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.getProductCompany = async (req,res) => {
    try {
        const productosCompany = await modelProduct.find({company: req.params.idCompany});
        res.status(200).json(productosCompany);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.agruparCategoriasFiltro = async (req,res) => {
    try {
        
        await modelProduct.aggregate(
			[
				{
					$match: {
						company: new ObjectId(req.params.idCompany)
					}
				},
				{ $group: { _id: '$category' } }
			],async function(err, categorias) {
				arrayCategorias = []; 
				console.log(categorias.length);
				console.log(categorias);
				for (i = 0; i < categorias.length; i++) {
					if (categorias[i]._id !== null) {
						if (categorias[i]._id) {
						const subCategoriasBase = await modelProduct.aggregate(
								[
									{
										$match: {
											category: categorias[i]._id
										}
									},
                                    {
                                        $match: {
                                            company: new ObjectId(req.params.idCompany)
                                        }
                                    },
									{
										$group: { _id: '$subCategory' }
									}
								],
								async function(err, subCategoriasBase) {
									return subCategoriasBase;
								}
							);
							arrayCategorias.push({
								categoria: categorias[i]._id,
								subCategoria: subCategoriasBase
							});
						}
					}
				}
				res.status(200).json(arrayCategorias);
			})
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.filtroBusqueda = async (req, res) => {
    try {
        const { filter } = req.body;
        console.log(filter);
        console.log(req.params.idCompany);
        await modelProduct.aggregate(
			[
				{
					$match: {
                        $and: [  { company: new ObjectId(req.params.idCompany) } ],
						$or: [
							{ name: { $regex: '.*' + filter + '.*', $options: 'i' } },
							{ category: { $regex: '.*' + filter + '.*', $options: 'i' } },
							{ subCategory: { $regex: '.*' + filter + '.*', $options: 'i' } }
						]
                        
					}
				}
			],
			(err, postStored) => {
				if (err) {
					res.status(500).json({ message: 'Error en el servidor', err });
				} else {
					if (!postStored) {
						res.status(404).json({ message: 'Error al mostrar Productos' });
					} else {
						res.status(200).json(postStored);
					}
				}
			}
		);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.filterSubCategorie = async (req,res) => {
    try {
        const { subCategory, company } = req.body;
        console.log(req.body);
        console.log(company);
        const filterSub = await modelProduct.find({subCategory: subCategory, company: company});

        res.status(200).json(filterSub);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.getProductCompanyCategory = async (req,res) => {
    try {
        const { category, company } = req.body;
        const filterSub = await modelProduct.find({category: category, company: company});
        res.status(200).json(filterSub);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.aggregateClassification = async (req,res) => {
    try {
        const { typeClassification, amountClassification, statusAmount, types, _idClassification } = req.body;
        console.log(req.body);
        await modelProduct.updateOne(
            {
                _id: req.params.idProduct
            },
            {
                $addToSet: {
					classifications: {
                        _idClassification: _idClassification,
						typeClassification: typeClassification,
                        amountClassification: amountClassification,
                        statusAmount: statusAmount,
                        types: types
                        // color: color
					}
				}
            }
        );
        
        res.status(200).json({message: "agregado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.updateClassification = async (req,res) => {
    try {
        const { typeClassification, amountClassification, statusAmount, types, _idClassification     } = req.body;
        // console.log(req.body);
        console.log(req.params.idClassification);
        console.log(types);
        await modelProduct.updateOne(
            {
                'classifications._id': req.params.idClassification
            },
            {
                $set: {
					'classifications.$': {
                        _idClassification: _idClassification,
						typeClassification: typeClassification,
                        amountClassification: amountClassification,
                        statusAmount: statusAmount,
                        types: types
					}
				}
            }
        );
        res.status(200).json({message: "Editado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.deleteClassification = async (req,res) => {
    try {
        // const { typeClassification, amountClassification, statusAmount, types } = req.body;
        await modelProduct.updateOne(
            {
                _id: req.params.idProduct
            },
            {
                $pull: {
					classifications: {
						_id: req.params.idClassification
					}
				}
            }
        );
        res.status(200).json({message: "Editado"});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

module.exports = productCtrl;