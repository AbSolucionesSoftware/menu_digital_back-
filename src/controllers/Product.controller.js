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
						company: req.params.idCompany
					}
				},
				{ $group: { _id: '$category' } }
			],
			async function(err, categorias) {
				arrayCategorias = [];
				console.log(categorias);
				console.log(categorias.length);
				for (i = 0; i < categorias.length; i++) {
					if (categorias[i]._id !== null) {
						if (categorias[i]._id) {
						const subCategoriasBase =await Producto.aggregate(
								[
									{
										$match: {
											$or: [ { categoria: categorias[i]._id }, { eliminado: { $exists: false } }, { eliminado: false } ]
										}
									},
									{
										$group: { _id: '$subCategoria' }
									}
								],
								async function(err, subCategoriasBase) {
									return subCategoriasBase;
								}
							);
							arrayCategorias.push({
								categoria: categorias[i]._id,
								subcCategoria: subCategoriasBase
							});
						}
					}
				}
				res.status(200).json(arrayCategorias);
			}
		);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

productCtrl.filtroBusqueda = async (req, res) => {
    try {
        const {filter} = req.query;
        await Producto.aggregate(
			[
				{
					$match: {
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

module.exports = productCtrl;