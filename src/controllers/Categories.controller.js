const categoriesCtrl = {};
const CategoriesModel = require("../models/Categories");
const productModel = require("../models/Product");


categoriesCtrl.createCategories = async (req,res) => {
    try {
        const { category } = req.body;
        const categories = new CategoriesModel({ idCompany: req.params.idCompany, category: category });
        categories.save(async (err, response) => {
            if(err){
                res.status(500).json({ message: 'Ups, algo paso al agregar.', err });
            } else {
                if(!response){
                    res.status(404).json({ message: 'Error al agregar.' });
                }else{
                    res.status(200).json({ message: 'Agregado correctamente.', data: response });
                }
            }
        });
        // res.status(200).json({message: ""});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.getCategories = async (req,res) => {
    try {
        const categories = await CategoriesModel.find({idCompany: req.params.idCompany});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.updateCategorie = async (req,res) => {
    try {
        const { category } = req.body;
        // const categories = await CategoriesModel.find({idCompany: req.params.idCompany});
        await CategoriesModel.findByIdAndUpdate(req.params.idCategory,{category});
        res.status(200).json({message: "Categoria editada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.deleteCategorie = async (req,res) => {
    try {
        const categories = await CategoriesModel.findById(req.params.idCategory);
        if(categories.subCategories.length > 0){
            res.status(500).json({message: "Esta categoria aun tiene sub categorias, no se puede eliminar."})
        }else{
            await CategoriesModel.findByIdAndDelete(req.params.idCategory);
            res.status(200).json({message: "Eliminado correctamente."});
        }
        // res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.agregateSubCategorie = async (req,res) => {
    try {
        const {subCategory} = req.body;
        await CategoriesModel.updateOne(
            {
                _id: req.params.idCategory
            },
            {
                $addToSet: {
					subCategories: {
						subCategory: subCategory,
					}
				}
            }
        );
        res.status(200).json({message: "Sub categoria agregada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.updateSubCategorie = async (req,res) => {
    try {
        const { subCategory } = req.body;
        await CategoriesModel.updateOne(
            {
                'subCategories._id': req.params.idSubCategory
            },
            {
                $set: { 
                    'subCategories.$': 
                        { 
                            subCategory: subCategory,
                        } 
                }
            }
        );
        res.status(200).json({message: "Sub categoria agregada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.deleteSubCategorie = async (req,res) => {
    try {
        /* const { subCategory } = req.body;
        await CategoriesModel.updateOne(
            {
                'subCategories._id': req.params.idSubCategory
            },
            {
                $set: { 
                    'subCategories.$': 
                        { 
                            subCategories: subCategory,
                        } 
                }
            }
        ); */
        res.status(200).json({message: "Sub categoria agregada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}



module.exports = categoriesCtrl;